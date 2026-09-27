import Image from "next/image";
import { founder } from "@/lib/site";
import { Button, Kicker } from "@/components/ui";
import { Reveal } from "@/components/motion";

export default function Founder() {
  return (
    <section className="overflow-hidden bg-cream py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div aria-hidden className="absolute -inset-4 hidden rounded-[2.9rem] ring-1 ring-ember/60 sm:block" />
          <div aria-hidden className="absolute -bottom-10 -left-10 -z-10 size-56 rounded-full bg-ember/25 blur-3xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-sand shadow-[0_50px_100px_-40px_rgba(63,13,0,0.5)]">
            <Image
              src={founder.image}
              alt={`${founder.name}, ${founder.role} of the Valiant Movement`}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <Kicker tone="rust">{founder.role}</Kicker>
            <h2 className="display mt-6 text-[clamp(2.07rem,4.44vw,4.07rem)]">{founder.name}</h2>
            <p className="mt-3 text-sm font-bold tracking-[0.12em] text-stone">{founder.honours}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <blockquote className="relative mt-10 border-l-4 border-ember pl-6 sm:pl-8">
              <p className="font-serif text-3xl italic leading-tight sm:text-4xl">“{founder.quote}”</p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-stone">{founder.summary}</p>
            <div className="mt-10">
              <Button href="/founder" variant="ink">
                Read the founder&apos;s profile
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
