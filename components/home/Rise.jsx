import Image from "next/image";
import { rise } from "@/lib/site";
import { Kicker } from "@/components/ui";
import { Reveal, RevealItem, Stagger } from "@/components/motion";

/** "To be valiant is to R.I.S.E.": the four letters on the Movement's banners. */
export default function Rise() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Kicker tone="rust">The Valiant creed</Kicker>
            <h2 className="display mt-6 text-[clamp(2.22rem,6.29vw,5.92rem)]">
              To be valiant
              <br />
              is to <span className="text-ember">R.I.S.E.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm text-lg leading-relaxed text-stone lg:pb-3">
            Four words printed on every Valiant banner, from Awka North to Idemili South, and four
            commitments every member carries home.
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4" gap={0.1}>
          {rise.map((item) => (
            <RevealItem key={item.letter}>
              <article className="group relative flex h-[440px] flex-col justify-between overflow-hidden rounded-[2rem] bg-ink p-8 text-white lg:h-[540px]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-40 transition-all duration-1000 ease-out-expo group-hover:scale-105 group-hover:opacity-70 lg:opacity-0"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-ink/10" />
                <span className="display relative text-[7.4rem] leading-[0.8] text-ember transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 lg:text-[8.88rem]">
                  {item.letter}
                </span>
                <div className="relative">
                  <h3 className="display text-4xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/75">{item.body}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
