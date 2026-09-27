import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { dna } from "@/lib/site";
import { Kicker } from "@/components/ui";
import { Reveal, RevealItem, Stagger } from "@/components/motion";

/** The Valiant DNA: seven strands, and the programme that teaches them. */
export default function Dna() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div aria-hidden className="absolute -right-40 top-20 size-[40rem] rounded-full bg-ember/10 blur-3xl" />
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <Kicker>Our ethos</Kicker>
            <h2 className="display mt-6 text-[clamp(2.22rem,5.92vw,5.55rem)]">
              The Valiant <span className="text-ember">DNA</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-lg text-lg leading-relaxed text-white/65 lg:justify-self-end lg:pb-3">
            The Valiant DNA is our identity. It is the code that guides how we lead, serve, speak and
            act, in private and in public.
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
          {dna.map((strand, i) => (
            <RevealItem key={strand.title} className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-night sm:p-9">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tabular-nums text-white/40">0{i + 1}</span>
                <span className="h-2 w-2 rounded-full bg-ember/40 transition-all duration-500 group-hover:w-10 group-hover:bg-ember" />
              </div>
              <h3 className="mt-12 text-2xl font-extrabold leading-tight tracking-tight">{strand.title}</h3>
              <p className="mt-3 leading-relaxed text-white/60">{strand.body}</p>
            </RevealItem>
          ))}
          <RevealItem className="bg-ember text-ink">
            <Link href="/programmes#dna-experience" className="group flex h-full flex-col justify-between p-8 sm:p-9">
              <span className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-[0.2em]">Programme</span>
                <ArrowUpRight className="size-7 transition-transform duration-300 group-hover:rotate-45" />
              </span>
              <span className="mt-12 block">
                <span className="display block text-3xl">The Valiant DNA Experience</span>
                <span className="mt-3 block leading-relaxed text-ink/75">
                  Immersive leadership training where values are not only learned, but lived.
                </span>
              </span>
            </Link>
          </RevealItem>
        </Stagger>
      </div>
    </section>
  );
}
