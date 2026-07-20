/* ============================================================
   Contact — short form, email link, social icons.
   Copy lives in src/data/pages.ts and site.ts.
   ============================================================ */

import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { contact } from "@/data/pages";
import Card from "@/components/Card";
import ContactForm from "@/components/forms/ContactForm";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: contact.title,
  description: contact.description,
};

const socials = [
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: site.social.tiktok, Icon: TikTokIcon },
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
];

export default function ContactPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-display-lg">{contact.heading}</h1>
        <p className="mt-4 text-body-lg text-ink-soft">{contact.sub}</p>
      </div>

      <Card className="mx-auto mt-10 max-w-xl p-6 sm:p-8">
        <ContactForm />
      </Card>

      <div className="mx-auto mt-14 flex max-w-xl flex-col items-center gap-8 text-center sm:flex-row sm:justify-center sm:gap-16">
        <div>
          <p className="text-xs font-semibold tracking-widest text-ink-soft uppercase">
            {contact.emailHeading}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {site.email}
          </a>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest text-ink-soft uppercase">
            {contact.followHeading}
          </p>
          <ul className="mt-2 flex justify-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sand text-ink-soft transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
