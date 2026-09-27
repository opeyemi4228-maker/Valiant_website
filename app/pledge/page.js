import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Declaration from "@/components/home/Declaration";
import { Kicker } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata = {
  title: "The Valiant Declaration, Pledge & Oath",
  description:
    "The Declaration, Pledge and Leadership Oath express the identity, aspirations and commitment of every member and leader of the Valiant Movement.",
};

const pledge = [
  "I pledge to stand for truth, courage, discipline, service, and justice.",
  "I shall uphold integrity in private and public life.",
  "I shall reject corruption, violence, hatred, and selfish leadership.",
  "I shall work for the advancement of my community, my nation, and humanity.",
  "I shall strive to become a leader of character, competence, and compassion.",
  "I shall defend what is right even when it is difficult.",
  "I shall live not only for myself, but for future generations.",
  "With courage and responsibility, I commit myself to the ideals of The Valiant Movement.",
  "So help me God.",
];

const oath = [
  "I solemnly affirm that I shall faithfully serve The Valiant Movement with integrity, discipline, courage, and responsibility.",
  "I shall place the interest of the Movement above personal gain.",
  "I shall uphold its values, protect its reputation, and serve its members with honour and humility.",
  "I shall discharge my duties diligently and faithfully.",
];

const usage = [
  ["The Declaration", "Recited at conventions, conferences, retreats, leadership programmes and chapter meetings."],
  ["The Pledge", "Administered during induction ceremonies and significant Movement occasions."],
  ["The Leadership Oath", "Administered upon assumption of a leadership position."],
];

export default function PledgePage() {
  return (
    <>
      <PageHero
        kicker="Our identity"
        title="Declaration,"
        accent="Pledge & Oath."
        intro="The Declaration, Pledge and Leadership Oath express the identity, aspirations and commitment of every member and leader of the Movement."
        image="/images/gallery/g10.jpg"
        imageAlt="A speaker at the podium beneath the words To be valiant is to R.I.S.E."
        imagePosition="38% 50%"
        parent={{ label: "About", href: "/about" }}
      />

      <Declaration />

      <section className="bg-cream py-24 sm:py-32">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-white p-8 ring-1 ring-line sm:p-12">
            <Kicker tone="rust">For every member</Kicker>
            <h2 className="display mt-6 text-[clamp(2rem,3.7vw,3.3rem)]">The Valiant Pledge</h2>
            <div className="mt-8 space-y-3 text-lg leading-relaxed">
              {pledge.map((line, i) => (
                <p key={line} className={i === pledge.length - 1 ? "font-serif italic text-rust" : undefined}>
                  {line}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col rounded-[2rem] bg-ink p-8 text-white sm:p-12">
            <Kicker>For every leader</Kicker>
            <h2 className="display mt-6 text-[clamp(2rem,3.7vw,3.3rem)]">The Leadership Oath</h2>
            <div className="mt-8 space-y-3 text-lg leading-relaxed text-white/85">
              {oath.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="mt-auto pt-10 font-serif text-xl italic text-ember">
              Leadership is a responsibility before it is a privilege.
            </p>
          </Reveal>
        </div>

        <div className="container-x mt-20">
          <Reveal>
            <p className="eyebrow text-rust">When they are spoken</p>
          </Reveal>
          <dl className="mt-6 grid gap-px overflow-hidden rounded-[2rem] bg-line md:grid-cols-3">
            {usage.map(([term, desc], i) => (
              <Reveal key={term} delay={i * 0.08} className="bg-cream p-8">
                <dt className="text-lg font-extrabold">{term}</dt>
                <dd className="mt-2 leading-relaxed text-stone">{desc}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand title="Make it" accent="your oath." />
    </>
  );
}
