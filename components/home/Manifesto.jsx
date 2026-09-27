"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Kicker } from "@/components/ui";
import { Reveal } from "@/components/motion";

const statement =
  "Nigeria's greatest crisis is not merely political, economic or structural. It is a crisis of leadership, values and civic consciousness. True transformation begins with the rebuilding of human character.";

// Words that carry the argument are set in ember once lit.
const emphasis = new Set(["leadership,", "values", "character."]);

function Word({ children, progress, range }) {
  // A function transform keeps opacity on motion's JS path; the array form is
  // handed to a WAAPI scroll timeline that maps the range wrongly.
  const opacity = useTransform(progress, (v) => 0.14 + 0.86 * Math.min(1, Math.max(0, (v - range[0]) / (range[1] - range[0]))));
  const lit = emphasis.has(children);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }} className={lit ? "text-rust" : undefined}>
        {children}
      </motion.span>
    </span>
  );
}

export default function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.split(" ");

  return (
    <section id="manifesto" className="relative bg-cream py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <Kicker tone="rust">Why we exist</Kicker>
            </Reveal>
          </div>
          <p ref={ref} className="display-wide text-[clamp(2rem,4.6vw,4.4rem)] lg:col-span-9">
            {words.map((word, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {word}
              </Word>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
