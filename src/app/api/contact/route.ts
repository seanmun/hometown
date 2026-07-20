/* ============================================================
   HomeTown HotSpots — Contact API Route
   src/app/api/contact/route.ts

   Same pattern as the inquiry route: validate → honeypot
   check → notification email to CONTACT_EMAIL (reply-to set
   to the sender) → warm auto-reply.
   ============================================================ */

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";
import { site } from "@/data/site";

const FROM = `HomeTown HotSpots <hello@hometownhotspots.com>`;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
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

  const notificationHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#f7f3ea;padding:32px;border-radius:14px;">
      <h1 style="color:#2e3320;font-size:22px;margin:0 0 4px;">New Message 💌</h1>
      <p style="color:#5c614d;margin:0 0 20px;">${escapeHtml(d.name)} sent a message through the contact form.</p>
      <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">
        <tr><td style="padding:6px 12px 6px 0;color:#5c614d;white-space:nowrap;vertical-align:top;"><strong>Name</strong></td><td style="padding:6px 0;color:#22261a;">${escapeHtml(d.name)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#5c614d;white-space:nowrap;vertical-align:top;"><strong>Email</strong></td><td style="padding:6px 0;color:#22261a;">${escapeHtml(d.email)}</td></tr>
      </table>
      <h2 style="color:#2e3320;font-size:15px;margin:20px 0 6px;">Message</h2>
      <p style="font-family:Arial,sans-serif;font-size:14px;color:#22261a;white-space:pre-wrap;">${escapeHtml(d.message)}</p>
    </div>`;

  const autoReplyHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#f7f3ea;padding:32px;border-radius:14px;">
      <h1 style="color:#2e3320;font-size:22px;margin:0 0 16px;">We got your message! 🧭</h1>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#22261a;line-height:1.6;">
        Hi ${escapeHtml(d.name)},
      </p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#22261a;line-height:1.6;">
        Thanks for reaching out — we read every message ourselves and
        we'll get back to you soon.
      </p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#22261a;line-height:1.6;margin-top:24px;">
        — ${site.founders}<br/>
        <span style="color:#5c614d;">HomeTown HotSpots</span>
      </p>
    </div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const notification = await resend.emails.send({
      from: FROM,
      to: process.env.CONTACT_EMAIL!,
      replyTo: d.email,
      subject: `New message from ${d.name}`,
      html: notificationHtml,
    });
    if (notification.error) throw notification.error;

    const autoReply = await resend.emails.send({
      from: FROM,
      to: d.email,
      subject: "We got your message — HomeTown HotSpots",
      html: autoReplyHtml,
    });
    if (autoReply.error) throw autoReply.error;
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please email us directly." },
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
