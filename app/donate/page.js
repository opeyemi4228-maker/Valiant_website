import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Button, Kicker } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata = {
  title: "Donate",
  description:
    "Support the Valiant Movement. Your gift trains leaders, equips chapters and takes the Valiant message to every community.",
};

const uses = [
  ["Train leaders", "Fund places on the Valiant DNA Experience for grassroots leaders."],
  ["Equip chapters", "Give ward and LGA chapters what they need to meet, organise and serve."],
  ["Reach communities", "Take civic education and service projects to every community."],
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        kicker="Donate"
        title="Fuel the"
        accent="movement."
        intro="Membership dues and gifts sustain a movement owned by its people: accountable, transparent and grassroots-led."
        image="/images/gallery/g06.jpg"
        imageAlt="Members sharing materials at a Movement session"
        imagePosition="45% 50%"
      />

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Kicker tone="rust">Where your gift goes</Kicker>
            <ol className="mt-8 border-t border-line">
              {uses.map(([title, body], i) => (
                <li key={title} className="flex gap-6 border-b border-line py-7">
                  <span className="display text-3xl text-ember">0{i + 1}</span>
                  <div>
                    <h2 className="text-xl font-extrabold">{title}</h2>
                    <p className="mt-1 text-lg text-stone">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1} className="relative overflow-hidden rounded-[2.5rem] bg-ink p-8 text-white sm:p-12">
            <Image src="/images/gallery/g06.jpg" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover opacity-25" />
            <div className="relative">
              <h2 className="display text-[clamp(2.07rem,4.07vw,3.7rem)]">
                Give <span className="text-ember">securely.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-white/80">
                Donations are processed by Donorbox. You can give once or monthly, by card or bank transfer.
              </p>
              <div className="mt-8">
                <Button href={site.links.donate} external size="lg">
                  Donate now
                </Button>
              </div>
              <p className="mt-8 text-sm text-white/60">
                Prefer to give your time? <Link href="/join" className="font-bold text-ember hover:underline">Join as a member</Link> or{" "}
                <Link href="/contact" className="font-bold text-ember hover:underline">volunteer with us</Link>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
