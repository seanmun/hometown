/* ============================================================
   HomeTown HotSpots — Newsletter Subscribe API Route
   src/app/api/subscribe/route.ts

   Same validate → honeypot pattern as the other routes, but
   instead of sending mail it adds the person to the Resend
   Audience (the newsletter list).

   Required environment variables:
   - RESEND_API_KEY      from resend.com dashboard
   - RESEND_AUDIENCE_ID  Resend → Audiences → your audience → ID
   ============================================================ */

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { subscribeSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }
  const d = parsed.data;

  // Honeypot filled = bot. Pretend success, add nothing.
  if (d.website_url) {
    return NextResponse.json({ ok: true });
  }

  const [firstName, ...restOfName] = d.name.split(" ");

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.contacts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      email: d.email,
      firstName,
      lastName: restOfName.join(" ") || undefined,
      unsubscribed: false,
    });

    // Subscribing twice shouldn't read as a failure.
    if (
      result.error &&
      !`${result.error.message}`.toLowerCase().includes("already")
    ) {
      throw result.error;
    }
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
