/* ============================================================
   HomeTown HotSpots — Inquiry API Route
   src/app/api/inquiry/route.ts

   Receives the Work With Us form, validates it, then sends:
   1. A formatted notification email to Mikayla & Curtis
   2. A warm auto-reply to the business that inquired

   Required environment variables (Vercel → Settings → Env Vars):
   - RESEND_API_KEY   from resend.com dashboard
   - CONTACT_EMAIL    where inquiries land, e.g. hello@hometownhotspots.com

   The "from" address requires the domain to be verified in
   Resend (Domains → Add Domain → add the DNS records).
   ============================================================ */

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { inquirySchema } from "@/lib/validation";
import { site, inquiryDisclaimer } from "@/data/site";

const FROM = `HomeTown HotSpots <hello@hometownhotspots.com>`;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }
  const d = parsed.data;

  // Honeypot filled = bot. Pretend success, send nothing.
  if (d.website_url) {
    return NextResponse.json({ ok: true });
  }

  const row = (label: string, value?: string) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;color:#5c614d;white-space:nowrap;vertical-align:top;"><strong>${label}</strong></td><td style="padding:6px 0;color:#22261a;">${escapeHtml(value)}</td></tr>`
      : "";

  const notificationHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#f7f3ea;padding:32px;border-radius:14px;">
      <h1 style="color:#2e3320;font-size:22px;margin:0 0 4px;">New Business Inquiry 🎉</h1>
      <p style="color:#5c614d;margin:0 0 20px;">${escapeHtml(d.businessName)} wants to work with you.</p>
      <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">
        ${row("Business", d.businessName)}
        ${row("Contact", d.ownerName)}
        ${row("Email", d.email)}
        ${row("Phone", d.phone)}
        ${row("Instagram", d.instagram)}
        ${row("Website", d.website)}
        ${row("Category", d.category)}
        ${row("Collaboration", d.collaboration)}
        ${row("Reach them via", d.contactPreference)}
        ${row("Heard about us", d.referral)}
      </table>
      <h2 style="color:#2e3320;font-size:15px;margin:20px 0 6px;">About the business</h2>
      <p style="font-family:Arial,sans-serif;font-size:14px;color:#22261a;white-space:pre-wrap;">${escapeHtml(d.about)}</p>
      <h2 style="color:#2e3320;font-size:15px;margin:20px 0 6px;">What they hope to accomplish</h2>
      <p style="font-family:Arial,sans-serif;font-size:14px;color:#22261a;white-space:pre-wrap;">${escapeHtml(d.goals)}</p>
    </div>`;

  const autoReplyHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#f7f3ea;padding:32px;border-radius:14px;">
      <h1 style="color:#2e3320;font-size:22px;margin:0 0 16px;">We got your inquiry! 🧭</h1>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#22261a;line-height:1.6;">
        Hi ${escapeHtml(d.ownerName)},
      </p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#22261a;line-height:1.6;">
        Thanks so much for reaching out about ${escapeHtml(d.businessName)} —
        we're excited to learn more. We personally read every inquiry and
        we'll be in touch soon.
      </p>
      <p style="font-family:Arial,sans-serif;font-size:13px;color:#5c614d;line-height:1.6;">
        ${escapeHtml(inquiryDisclaimer)}
      </p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#22261a;line-height:1.6;margin-top:24px;">
        — ${site.founders}<br/>
        <span style="color:#5c614d;">HomeTown HotSpots</span>
      </p>
    </div>`;

  try {
    // Created here (not at module scope) so the site still builds
    // and fails gracefully when RESEND_API_KEY isn't set.
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Notification to the team
    // (Resend reports API failures via `error` rather than
    // throwing, so surface it explicitly.)
    const notification = await resend.emails.send({
      from: FROM,
      to: process.env.CONTACT_EMAIL!,
      replyTo: d.email,
      subject: `New inquiry: ${d.businessName}`,
      html: notificationHtml,
    });
    if (notification.error) throw notification.error;

    // 2. Auto-reply to the business
    const autoReply = await resend.emails.send({
      from: FROM,
      to: d.email,
      subject: "We got your inquiry — HomeTown HotSpots",
      html: autoReplyHtml,
    });
    if (autoReply.error) throw autoReply.error;
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your inquiry. Please email us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

/* Basic HTML escaping for user-supplied values */
function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}