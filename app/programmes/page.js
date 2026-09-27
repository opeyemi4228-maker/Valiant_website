import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Button, Kicker } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata = {
  title: "Programmes",
  description:
    "The Valiant DNA Experience, the Valiant Gathering and the Valiant Youth Choir Competition: where Valiants are formed.",
};

const pillars = [
  "Culture-building",
  "Leadership formation",
  "Civic education",
  "Strategic communication",
  "Technology for mandate protection",
  "Community replication",
  "Mentorship & peer accountability",
];

const outcomes = [
  "Mobilise their constituencies",
  "Lead with integrity",
  "Build strong polling-unit structures",
  "Defend democratic processes",
  "Multiply the Valiant ethos",
];

function Programme({ id, kicker, title, image, reverse, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className={reverse ? "lg:order-2" : undefined}>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-sand">
            <Image src={image} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Kicker tone="rust">{kicker}</Kicker>
          <h2 className="display mt-6 text-[clamp(2.07rem,4.07vw,3.7rem)]">{title}</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-stone">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        kicker="Programmes"
        title="Where Valiants"
        accent="are formed."
        intro="Values are not only learned, but lived, through training, gathering and service."
        image="/images/gallery/g05.jpg"
        imageAlt="A facilitator leading a Valiant DNA Experience session"
        imagePosition="30% 50%"
      />

      <div className="bg-cream">
        <Programme id="dna-experience" kicker="Leadership training" title="The Valiant DNA Experience" image="/images/gallery/g02.jpg">
          <p>
            An immersive, transformational leadership programme that equips participants with values, discipline and
            practical skills for community impact. It combines experiential learning, mentorship, simulations and
            grassroots assignments.
          </p>
          <div className="grid gap-8 pt-2 sm:grid-cols-2">
            <div>
              <p className="eyebrow text-ink">Programme pillars</p>
              <ul className="mt-4 space-y-2 text-base">
                {pillars.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ember" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-ink">Participants learn to</p>
              <ul className="mt-4 space-y-2 text-base">
                {outcomes.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ember" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Programme>
      </div>

      <div className="bg-sand">
        <Programme id="gathering" kicker="Flagship convening" title="The Valiant Gathering" image="/images/gallery/g24.jpg" reverse>
          <p>
            Raising a new generation. Leaders, members and friends of the Movement convene to learn, recommit to the
            Declaration and multiply the Valiant ethos in every community they return to.
          </p>
          <div className="pt-2">
            <Button href="/events" variant="ink">
              See events
            </Button>
          </div>
        </Programme>
      </div>

      <div className="bg-cream">
        <Programme id="choir" kicker="Youth & culture" title="Valiant Youth Choir Competition" image="/images/gallery/g16.jpg">
          <p>
            Church choirs of young people aged 20 and below compete with one of the official songs, including
            “I Will Be Valiant”, celebrating faith, discipline and excellence across Anambra State.
          </p>
          <div className="pt-2">
            <Button href="/programmes/choir">Register a choir</Button>
          </div>
        </Programme>
      </div>

      <CtaBand title="Be part of" accent="the next one." />
    </>
  );
}
