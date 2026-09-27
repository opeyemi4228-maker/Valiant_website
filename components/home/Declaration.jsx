"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { declaration } from "@/lib/site";
import { Button, Kicker } from "@/components/ui";

const STEPS = declaration.length + 1; // every line, then the final cry

// Opacity uses a function transform: motion hands array-mapped opacity to a
// WAAPI scroll timeline, which maps this tall sticky range wrongly.
const ramp = (from, to, start, end) => (v) => from + (to - from) * Math.min(1, Math.max(0, (v - start) / (end - start)));

/** Pinning only makes sense where the whole oath fits on one screen. */
function useWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 700px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide;
}

function Line({ text, index, progress, pinned }) {
  const start = index / STEPS;
  const end = (index + 1) / STEPS;
  const opacity = useTransform(progress, ramp(0.16, 1, start, end));
  const x = useTransform(progress, [start, end], [-18, 0]);
  return (
    <motion.p
      style={pinned ? { opacity, x } : undefined}
      className={
        index === 0
          ? "font-serif text-3xl italic text-ember sm:text-4xl"
          : "text-xl font-bold leading-snug sm:text-2xl lg:text-[1.7rem]"
      }
    >
      {text}
    </motion.p>
  );
}

/**
 * The Declaration, recited line by line as the reader scrolls. The section is
 * tall and its content sticky, so the page holds still while the oath is read.
 */
export default function Declaration() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const pinned = useWide() && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const finalStart = declaration.length / STEPS;
  const finalScale = useTransform(scrollYProgress, [finalStart, 1], [0.7, 1]);
  const finalOpacity = useTransform(scrollYProgress, ramp(0, 1, finalStart, 1));
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} className={pinned ? "relative h-[320vh] bg-ink" : "relative bg-ink"} aria-label="The Valiant Declaration">
      <div
        className={`grain flex min-h-svh items-center overflow-hidden text-white ${pinned ? "sticky top-0" : "relative"}`}
      >
        <motion.div style={{ scale: bgScale }} className="absolute inset-0">
          <Image src="/images/gallery/g10.jpg" alt="" fill sizes="100vw" className="object-cover opacity-25" />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/90 to-ink/50" />

        <div className="container-x relative grid gap-12 py-24 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Kicker>The Valiant Declaration</Kicker>
            <div className="mt-8 space-y-4 sm:space-y-5">
              {declaration.map((text, i) => (
                <Line key={text} text={text} index={i} progress={scrollYProgress} pinned={pinned} />
              ))}
            </div>
          </div>

          <motion.div
            style={pinned ? { scale: finalScale, opacity: finalOpacity } : undefined}
            className="origin-left lg:col-span-5"
          >
            <p className="display text-[clamp(3.33rem,8.14vw,7.4rem)] text-ember">
              I am a<br />Valiant!
            </p>
            <p className="mt-6 max-w-sm text-lg text-white/70">
              Every member recites it. Every leader lives it. Add your voice to a new generation of
              Nigerians who have found the courage to build.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/join">Take your place</Button>
              <Button href="/pledge" variant="ghost">
                The Pledge &amp; Oath
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
