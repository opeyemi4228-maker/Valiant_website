import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Dna from "@/components/home/Dna";
import { Button, Kicker } from "@/components/ui";
import { Reveal, RevealItem, Stagger } from "@/components/motion";
import {
  coreValues,
  courageTo,
  identity,
  mission,
  motto,
  objectives,
  philosophy,
  philosophyClose,
  preamble,
  toBeValiant,
  valiantUnderstands,
  vision,
} from "@/lib/about";

export const metadata = {
  title: "About Us",
  description:
    "The Valiant Movement is a values-driven citizen movement raising courageous, ethical and competent leaders for the restoration and advancement of Nigeria.",
};

const sections = [
  ["Preamble", "preamble"],
  ["Our identity", "identity"],
  ["Motto", "motto"],
  ["Vision & mission", "vision"],
  ["Core values", "values"],
  ["Objectives", "objectives"],
  ["Philosophy", "philosophy"],
  ["Valiant DNA", "dna"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Us"
        title="Courage, Character,"
        accent="Service."
        intro="A values-driven citizen movement raising courageous, ethical and competent leaders for the restoration and advancement of Nigeria."
        image="/images/gallery/g09.jpg"
        imageAlt="Members of the Awka North LGA chapter with the Valiant Movement banner"
        imagePosition="50% 40%"
      />

      {/* On this page */}
      <nav aria-label="On this page" className="border-b border-line bg-cream">
        <ul className="container-x flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]">
          {sections.map(([label, id]) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                className="block rounded-full px-4 py-2 text-sm font-semibold text-stone transition-colors hover:bg-sand hover:text-ink"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Preamble */}
      <section id="preamble" className="scroll-mt-24 bg-cream py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <Kicker tone="rust">Preamble</Kicker>
            <p className="mt-6 text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold leading-tight tracking-tight">
              {preamble.lead}
            </p>
            <div className="relative mt-10 hidden aspect-[7/6] overflow-hidden rounded-[2rem] lg:block">
              <Image
                src="/images/gallery/g07.jpg"
                alt="Members of the Idemili South LGA chapter with the Valiant Movement banner"
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-stone lg:col-span-7 lg:pt-12">
            {preamble.body.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
            <p className="border-l-4 border-ember pl-6 font-serif text-2xl italic leading-snug text-ink">{preamble.close}</p>
          </Reveal>
        </div>
      </section>

      {/* Identity */}
      <section id="identity" className="scroll-mt-24 bg-sand py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <Kicker tone="rust">Our identity</Kicker>
            <h2 className="display mt-6 text-[clamp(2.07rem,4.07vw,3.7rem)]">
              A Valiant is not <span className="text-rust">merely brave.</span>
            </h2>
            <p className="mt-6 font-semibold">{identity.name}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-stone">{identity.meaning[0]}</p>
            <p className="mt-8 eyebrow text-ink">A Valiant chooses</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {identity.choices.map(([yes, no]) => (
                <li key={yes} className="rounded-2xl bg-cream px-5 py-4 text-lg">
                  <span className="font-extrabold capitalize">{yes}</span>{" "}
                  <span className="text-stone">over {no}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg leading-relaxed text-stone">{identity.meaning[1]}</p>
            <p className="mt-8 border-t border-ink/10 pt-6 text-sm leading-relaxed text-stone">{identity.legal}</p>
          </Reveal>
        </div>
      </section>

      {/* Motto and tagline */}
      <section id="motto" className="grain relative scroll-mt-24 overflow-hidden bg-ink py-24 text-white sm:py-32">
        <div className="container-x">
          <Reveal>
            <Kicker>Our motto</Kicker>
            <h2 className="display mt-6 text-[clamp(2.22rem,5.18vw,4.81rem)]">
              Courage. Character. <span className="text-ember">Service.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-white/65">
              Three foundational pillars that define the expected conduct of every member.
            </p>
          </Reveal>
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-3" gap={0.1}>
            {motto.map((m) => (
              <RevealItem key={m.word} className="flex flex-col bg-ink p-8 sm:p-10">
                <h3 className="display text-4xl text-ember">{m.word}</h3>
                <p className="mt-5 leading-relaxed text-white/75">{m.body}</p>
                <p className="mt-auto pt-8 font-serif text-lg italic leading-snug text-white">“{m.belief}”</p>
              </RevealItem>
            ))}
          </Stagger>

          <div className="mt-24 grid gap-10 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow text-ember">Our tagline</p>
              <p className="display mt-5 text-[clamp(2.6rem,5.5vw,5rem)]">
                Courage <br />
                to lead.
              </p>
              <p className="mt-6 max-w-sm text-lg text-white/65">
                We call every citizen not merely to follow events, but to help shape them.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <p className="text-lg text-white/60">Leadership requires courage. The courage to</p>
              <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {courageTo.map((c) => (
                  <li key={c} className="py-3.5 text-2xl font-bold tracking-tight sm:text-[1.7rem]">
                    <span className="text-ember">›</span> {c}.
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision and mission */}
      <section id="vision" className="scroll-mt-24 bg-cream py-24 sm:py-32">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-ember p-8 text-ink sm:p-12">
            <p className="eyebrow text-maroon">Vision</p>
            <p className="mt-5 text-2xl font-bold leading-snug sm:text-[1.7rem]">{vision.statement}</p>
            <p className="mt-6 leading-relaxed text-ink/75">{vision.detail}</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] bg-white p-8 ring-1 ring-line sm:p-12">
            <p className="eyebrow text-rust">Mission</p>
            <p className="mt-5 text-2xl font-bold leading-snug sm:text-[1.7rem]">{mission.statement}</p>
            <p className="mt-6 leading-relaxed text-stone">{mission.detail}</p>
          </Reveal>
        </div>
        <div className="container-x mt-12">
          <Reveal>
            <p className="eyebrow text-rust">Mission in action</p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {mission.inAction.map((m) => (
                <li key={m} className="rounded-full bg-sand px-5 py-2.5 font-semibold">
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section id="values" className="scroll-mt-24 bg-sand py-24 sm:py-32">
        <div className="container-x">
          <Reveal>
            <Kicker tone="rust">Core values</Kicker>
            <h2 className="display mt-6 text-[clamp(2.22rem,5.18vw,4.81rem)]">
              Eight values. <span className="text-rust">One standard.</span>
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
            {coreValues.map(([name, body], i) => (
              <RevealItem key={name} className="group rounded-3xl bg-cream p-7 transition-colors duration-500 hover:bg-white">
                <span className="text-sm font-bold tabular-nums text-stone/60">0{i + 1}</span>
                <h3 className="display mt-8 text-3xl transition-colors group-hover:text-rust">{name}</h3>
                <p className="mt-3 leading-relaxed text-stone">{body}</p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Objectives */}
      <section id="objectives" className="scroll-mt-24 bg-cream py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Kicker tone="rust">Objectives</Kicker>
              <h2 className="display mt-6 text-[clamp(2.07rem,4.07vw,3.7rem)]">What we work toward.</h2>
              <p className="mt-6 text-lg leading-relaxed text-stone">
                Nine objectives guide every programme, chapter and initiative of the Movement.
              </p>
            </div>
          </Reveal>
          <ol className="border-t border-line lg:col-span-8">
            {objectives.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 0.03} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span className="display text-3xl text-ember">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl font-extrabold sm:text-2xl">{title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-stone">{body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Philosophy and what it means to be Valiant */}
      <section id="philosophy" className="scroll-mt-24 bg-maroon py-24 text-white sm:py-32">
        <div className="container-x">
          <Reveal>
            <Kicker>Core philosophy</Kicker>
          </Reveal>
          <ul className="mt-10 space-y-4">
            {philosophy.map((line, i) => (
              <Reveal as="li" key={line} delay={i * 0.06} className="display text-[clamp(1.6rem,3.6vw,3.1rem)]">
                <span className={i % 2 ? "text-ember" : undefined}>{line}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p className="mt-12 max-w-3xl text-lg leading-relaxed text-white/70">{philosophyClose}</p>
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden bg-ember py-24 text-ink sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-maroon">What it means to be Valiant</p>
            <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.6rem)]">To be Valiant is to choose.</h2>
            <ul className="mt-10 space-y-4 text-lg">
              {valiantUnderstands.map((v) => (
                <li key={v} className="flex gap-3">
                  <span className="mt-2.5 size-2 shrink-0 rounded-full bg-maroon" />
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
          <Stagger as="ul" className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-7" gap={0.05}>
            {toBeValiant.map(([yes, no]) => (
              <RevealItem as="li" key={yes} className="rounded-2xl bg-ink px-6 py-5 text-white">
                <span className="display text-2xl text-ember">{yes}</span>
                <span className="mt-1 block text-white/60">over {no}</span>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <div id="dna" className="scroll-mt-24">
        <Dna />
      </div>

      <section className="bg-cream pt-20 text-center sm:pt-28">
        <Reveal className="container-x">
          <p className="mx-auto max-w-2xl text-lg text-stone">
            Read the words every member lives by, and the standard every leader keeps.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/pledge" variant="ink">
              The Declaration &amp; Pledge
            </Button>
            <Button href="/ethics" variant="ghost-dark">
              Code of Ethics
            </Button>
          </div>
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}
