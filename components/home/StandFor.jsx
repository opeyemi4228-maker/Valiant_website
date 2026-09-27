"use client";

import { motion, useReducedMotion } from "motion/react";
import { against, standFor } from "@/lib/site";
import { Kicker } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1];

/**
 * The line in the sand, drawn literally: what we reject sits above it, small
 * and struck out; what we stand for sits below it, large and in the light.
 * The Movement is defined more by what it builds than by what it opposes, so
 * the hierarchy says so.
 */
export default function StandFor() {
  const reduce = useReducedMotion();
  const play = reduce
    ? { initial: "show", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -20% 0px" } };

  return (
    <section className="grain relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32 lg:py-40">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(70%_80%_at_50%_100%,rgba(247,148,29,0.16),rgba(63,13,0,0.5)_45%,transparent_75%)]"
      />

      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Kicker>A line in the sand</Kicker>
            <h2 className="display mt-6 text-[clamp(2.22rem,5.55vw,5.18rem)]">
              We know what
              <br />
              <span className="text-ember">we are for.</span>
            </h2>
          </div>
          <p className="max-w-sm font-serif text-lg italic leading-snug text-white/55 lg:col-span-4 lg:justify-self-end">
            “I reject corruption, injustice, apathy, and bad governance. I stand for democracy, equity,
            people power, unity, and service.”
            <span className="mt-3 block font-sans text-xs font-bold not-italic uppercase tracking-[0.2em] text-white/35">
              The Valiant Declaration
            </span>
          </p>
        </div>

        <motion.div {...play} className="mt-20 lg:mt-28">
          {/* Above the line */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-10">
            <p className="eyebrow w-36 shrink-0 text-white/40">We reject</p>
            <ul className="flex flex-wrap gap-x-7 gap-y-2 sm:gap-x-10">
              {against.map((word, i) => (
                <li key={word}>
                  <motion.span
                    variants={{
                      hidden: { backgroundSize: "0% 0.09em", opacity: 1 },
                      show: {
                        backgroundSize: "100% 0.09em",
                        opacity: 0.45,
                        transition: { duration: 0.6, delay: 0.2 + i * 0.16, ease: EASE },
                      },
                    }}
                    className="display-wide bg-[linear-gradient(var(--color-ember),var(--color-ember))] bg-[position:0_56%] bg-no-repeat text-[clamp(1.5rem,3vw,2.6rem)] text-white/80"
                  >
                    {word}
                  </motion.span>
                </li>
              ))}
            </ul>
          </div>

          {/* The line */}
          <div className="relative my-10 h-px sm:my-14">
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 1.2, delay: 0.85, ease: EASE } },
              }}
              className="absolute inset-0 origin-left bg-linear-to-r from-ember via-ember to-ember/0"
            />
            <motion.span
              aria-hidden
              variants={{
                hidden: { left: "0%", opacity: 0 },
                show: { left: "100%", opacity: [0, 1, 1, 0], transition: { duration: 1.2, delay: 0.85, ease: EASE } },
              }}
              className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_24px_6px_rgba(255,197,110,0.7)]"
            />
          </div>

          {/* Below the line */}
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <p className="eyebrow w-36 shrink-0 pt-[0.9em] text-ember">We stand for</p>
            <ul className="text-[clamp(2rem,6.6vw,6.4rem)]">
              {standFor.map((word, i) => (
                <li key={word} className="display relative overflow-hidden pb-[0.04em]">
                  <motion.span
                    variants={{
                      hidden: { y: "105%" },
                      show: { y: 0, transition: { duration: 1, delay: 1.35 + i * 0.09, ease: EASE } },
                    }}
                    className="flex cursor-default items-start transition-colors duration-300 hover:text-ember"
                  >
                    {/* Sized in the word's own em, so the number meets the cap line at any size. */}
                    <span className="flex w-[0.62em] shrink-0 pt-[0.12em]">
                      <span className="font-sans text-xs font-bold tracking-[0.1em] text-ember sm:text-sm">0{i + 1}</span>
                    </span>
                    {word}
                  </motion.span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
