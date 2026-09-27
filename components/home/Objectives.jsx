"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { objectives } from "@/lib/site";
import { Button, Kicker } from "@/components/ui";
import { Reveal } from "@/components/motion";

/** Five objectives as a numbered list; the photograph follows the one in focus. */
export default function Objectives() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-sand py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Kicker tone="rust">What we do</Kicker>
              <h2 className="display mt-6 text-[clamp(2.22rem,4.81vw,4.44rem)]">
                Leaders are <span className="text-rust">made,</span> not born.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">
                We train leaders, prioritise people above power, multiply values to the grassroots,
                defend democracy and build structures that last.
              </p>
            </Reveal>

            <div className="relative mt-10 hidden aspect-[5/4] overflow-hidden rounded-[2rem] bg-ink lg:block">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={objectives[active].image}
                    alt={objectives[active].title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 0px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-linear-to-t from-ink/70 to-transparent" />
              <p className="display absolute bottom-6 left-7 text-6xl text-ember">0{active + 1}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
        <ol>
          {objectives.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.05}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={clsx(
                  "group grid w-full grid-cols-[auto_1fr_auto] items-start gap-5 border-t border-ink/15 py-8 text-left transition-colors sm:gap-8 sm:py-10",
                  i === objectives.length - 1 && "border-b"
                )}
              >
                <span
                  className={clsx(
                    "display pt-1 text-3xl transition-colors duration-300 sm:text-4xl",
                    active === i ? "text-rust" : "text-ink/25"
                  )}
                >
                  0{i + 1}
                </span>
                <span>
                  <span
                    className={clsx(
                      "block text-2xl font-extrabold tracking-tight transition-colors duration-300 sm:text-4xl",
                      active === i ? "text-ink" : "text-ink/55 group-hover:text-ink"
                    )}
                  >
                    {item.title}
                  </span>
                  <span
                    className={clsx(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo",
                      active === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="block pt-3 text-lg leading-relaxed text-stone">{item.body}</span>
                      <span className="relative mt-5 block aspect-video overflow-hidden rounded-2xl lg:hidden">
                        <Image src={item.image} alt="" fill sizes="90vw" className="object-cover" />
                      </span>
                    </span>
                  </span>
                </span>
                <span
                  className={clsx(
                    "mt-1 grid size-11 place-items-center rounded-full transition-all duration-300",
                    active === i ? "bg-ember text-ink" : "bg-ink/5 text-ink/40"
                  )}
                >
                  <ArrowRight className={clsx("size-5 transition-transform", active === i && "-rotate-45")} />
                </span>
              </button>
            </Reveal>
          ))}
        </ol>
          <Reveal className="mt-10">
            <Button href="/about" variant="ink">
              Read our full story
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
