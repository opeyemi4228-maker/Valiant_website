import Image from "next/image";
import { reach } from "@/lib/site";
import { Button } from "@/components/ui";
import { CountUp, Reveal } from "@/components/motion";

/**
 * The size of the task. These are INEC's figures, not membership claims: the
 * Movement's structure mirrors the register, so every member belongs to a ward
 * and a polling unit.
 */
export default function Reach() {
  return (
    <section className="relative overflow-hidden bg-ember py-24 text-ink sm:py-28">
      <Image
        src="/images/eagle.png"
        alt=""
        width={256}
        height={256}
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 w-[46vw] max-w-[640px] -translate-y-1/2 opacity-[0.12] mix-blend-multiply"
      />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-maroon">From the ground up</p>
            <h2 className="display mt-5 text-[clamp(2.22rem,5.55vw,5.18rem)]">
              Organising every polling unit in Nigeria.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink/80">
              Our structure mirrors the national register, so leadership values are replicated in every
              ward and every polling unit, and every member knows exactly where they stand.
            </p>
            <div className="mt-7">
              <Button href="/join" variant="ink">
                Find your ward
              </Button>
            </div>
          </Reveal>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-ink/15 lg:mt-20 lg:grid-cols-4">
          {reach.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} className="bg-ember p-6 sm:p-9">
              <dt className="text-sm font-bold uppercase tracking-[0.16em] text-maroon/80">{item.label}</dt>
              <dd className="display mt-3 text-[clamp(1.92rem,4.44vw,3.7rem)] tabular-nums">
                <CountUp value={item.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
        <p className="mt-4 text-sm text-ink/60">Source: Independent National Electoral Commission (INEC) register.</p>
      </div>
    </section>
  );
}
