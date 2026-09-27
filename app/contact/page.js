import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { LinkedinIcon, WhatsappIcon, YoutubeIcon } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with the Valiant Movement. Call, email or send us a message.",
};

const channels = [
  { Icon: Phone, label: "Call us", value: site.contact.phone, href: site.contact.phoneHref },
  { Icon: Phone, label: "Membership line", value: site.contact.altPhone, href: site.contact.altPhoneHref },
  { Icon: Mail, label: "Email us", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { Icon: MapPin, label: "Location", value: site.contact.location },
];

const socials = [
  { label: "WhatsApp community", href: site.links.whatsapp, Icon: WhatsappIcon },
  { label: "YouTube", href: site.links.youtube, Icon: YoutubeIcon },
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedinIcon },
];

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact" title="Let's" accent="talk." intro="Send us a message and our team will get back to you as soon as we can."
        image="/images/gallery/g12.jpg"
        imageAlt="A Movement leader speaking to the press"
        imagePosition="45% 40%"
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-5">
            <ul className="divide-y divide-line border-y border-line">
              {channels.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-5 py-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-ember">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="eyebrow text-stone">{label}</p>
                    {href ? (
                      <a href={href} className="mt-1 block text-xl font-bold hover:text-rust">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-xl font-bold">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <ul className="mt-8 flex flex-wrap gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold ring-1 ring-line transition-colors hover:ring-ink/40"
                  >
                    <Icon className="size-4" /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
