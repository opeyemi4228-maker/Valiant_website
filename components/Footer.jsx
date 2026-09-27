import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { LinkedinIcon, WhatsappIcon, YoutubeIcon } from "@/components/ui";

const columns = [
  {
    title: "The Movement",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Meet the Founder", href: "/founder" },
      { label: "Declaration & Pledge", href: "/pledge" },
      { label: "Code of Ethics", href: "/ethics" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Join Us", href: "/join" },
      { label: "Membership & Culture", href: "/membership" },
      { label: "Programmes", href: "/programmes" },
      { label: "The Valiant App", href: "/app" },
      { label: "Choir Competition", href: "/programmes/choir" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
      { label: "Donate", href: "/donate" },
    ],
  },
];

const socials = [
  { label: "YouTube", href: site.links.youtube, Icon: YoutubeIcon },
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedinIcon },
  { label: "WhatsApp community", href: site.links.whatsapp, Icon: WhatsappIcon },
];

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-ink text-white">
      <div className="container-x relative pt-20 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src="/images/logo-white.png" alt={site.name} width={701} height={207} className="h-16 w-auto" />
            <p className="mt-6 max-w-sm leading-relaxed text-white/60">
              A grassroots leadership initiative raising disciplined, ethical and courageous leaders for
              service, democracy and Nigeria&apos;s progress.
            </p>
            <ul className="mt-8 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full bg-white/[0.06] text-white/80 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-ember hover:text-ink"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-ember">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-white/70 transition-colors hover:text-white">
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-white/70 transition-colors hover:text-white">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-ember">Reach us</p>
            <ul className="mt-5 space-y-4 text-white/75">
              <li>
                <a href={site.contact.phoneHref} className="flex items-start gap-3 hover:text-white">
                  <Phone className="mt-0.5 size-4 shrink-0 text-ember" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={site.contact.altPhoneHref} className="flex items-start gap-3 hover:text-white">
                  <Phone className="mt-0.5 size-4 shrink-0 text-ember" />
                  {site.contact.altPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex items-start gap-3 hover:text-white">
                  <Mail className="mt-0.5 size-4 shrink-0 text-ember" />
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-ember" />
                {site.contact.location}
              </li>
            </ul>
            <Link
              href="/join"
              className="group mt-8 inline-flex items-center gap-2 font-extrabold text-ember"
            >
              Become a member
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </div>

        <p
          aria-hidden
          className="display mt-20 select-none whitespace-nowrap text-center text-[8.58vw] leading-[0.8] 2xl:text-[7.77rem] text-white/[0.06]"
        >
          Courage to lead
        </p>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} The Valiant Movement. All rights reserved.</p>
          <p className="font-serif text-base italic text-white/60">Courage, Character, Service.</p>
        </div>
      </div>
    </footer>
  );
}
