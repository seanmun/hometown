/* ============================================================
   Site footer — brand line, nav links, socials, copyright.
   All text and links come from src/data/site.ts.
   ============================================================ */

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { nav, site } from "@/data/site";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons";
import Wordmark from "./Wordmark";

const socials = [
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: site.social.tiktok, Icon: TikTokIcon },
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
];

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11"
            />
            <Wordmark className="text-lg text-cream" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-cream/70">
            {site.footerLine}
          </p>
        </div>

        <nav aria-label="Footer" className="space-y-3">
          <p className="text-xs font-semibold tracking-widest text-cream/50 uppercase">
            Explore
          </p>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-cream/75 transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-widest text-cream/50 uppercase">
            Connect
          </p>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 text-sm text-cream/75 transition-colors hover:text-cream"
          >
            <Mail className="h-4 w-4" />
            {site.email}
          </a>
          <ul className="flex gap-3 pt-1">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-cream/50 hover:text-cream"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream/55 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
