import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { programmes } from "@/lib/site";
import { Button, Kicker } from "@/components/ui";
import { Reveal, RevealItem, Stagger } from "@/components/motion";

export default function Programmes() {
  return (
    <section className="bg-sand py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Kicker tone="rust">Programmes &amp; events</Kicker>
            <h2 className="display mt-6 text-[clamp(2.22rem,5.18vw,4.81rem)]">
              Where Valiants <span className="text-rust">are formed.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/programmes" variant="ghost-dark">
              All programmes
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3" gap={0.12}>
          {programmes.map((p, i) => (
            <RevealItem key={p.title} className={i === 0 ? "md:col-span-2 lg:col-span-1" : undefined}>
              <Link
                href={p.href}
                className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(63,13,0,0.35)]"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-cream/95 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-rust backdrop-blur">
                    {p.kicker}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <h3 className="text-2xl font-extrabold tracking-tight sm:text-[1.75rem]">{p.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-stone">{p.body}</p>
                  <span className="mt-7 inline-flex items-center gap-2 font-extrabold text-ink">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                      {p.cta}
                    </span>
                    <span className="grid size-9 place-items-center rounded-full bg-ember transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
