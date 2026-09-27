"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui";
import { MaskLines } from "@/components/motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * A colonnade of the Movement's own people: five arched portraits that rise
 * into place and run off the bottom of the screen. Each photo is shown at a
 * width it stays sharp at, and the staggered tops give the row its rhythm.
 * `drift` is how far each arch travels as the page scrolls.
 */
const faces = [
  { src: "/images/gallery/g02.jpg", pos: "32% center", offset: "mt-[12%]", drift: 40, alt: "Valiant members in the Movement's orange caps at a training session" },
  { src: "/images/gallery/g15.jpg", pos: "38% center", offset: "mt-[4%]", drift: 90, alt: "A member in a red hijab listening at a Valiant gathering" },
  { src: "/images/gallery/g03.jpg", pos: "center 20%", offset: "mt-0", drift: 20, alt: "A Valiant leader in an orange cap addressing members" },
  { src: "/images/gallery/g23.jpg", pos: "34% center", offset: "mt-[7%]", drift: 70, alt: "A woman speaking to a Valiant gathering" },
  { src: "/images/gallery/g13.jpg", pos: "40% center", offset: "mt-[15%]", drift: 50, alt: "Two members embracing, smiling, at a Movement gathering" },
];

function Arch({ face, index, scrollY, reduce }) {
  const y = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -face.drift]);
  // The outer two arches only appear once there is room for five.
  const hideSmall = index === 0 || index === 4 ? "hidden sm:block" : "";
  return (
    <motion.div style={{ y }} className={`relative min-w-0 flex-1 ${face.offset} ${hideSmall}`}>
      <motion.div
        initial={reduce ? false : { y: "60%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 + Math.abs(index - 2) * 0.12, ease: EASE }}
        className="relative h-[clamp(13rem,34svh,17rem)] overflow-hidden rounded-t-full bg-night sm:h-[clamp(19rem,50svh,40rem)]"
      >
        <motion.div
          initial={reduce ? false : { scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, delay: 0.5 + Math.abs(index - 2) * 0.12, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src={face.src}
            alt={face.alt}
            fill
            priority={index === 2}
            sizes="(min-width: 640px) 20vw, 33vw"
            className="object-cover"
            style={{ objectPosition: face.pos }}
          />
        </motion.div>
        {/* A warm wash so five different rooms read as one light. */}
        <div aria-hidden className="absolute inset-0 bg-linear-to-b from-maroon/10 via-transparent to-ink/60 mix-blend-multiply" />
        <div aria-hidden className="absolute inset-0 rounded-t-full ring-1 ring-inset ring-white/10" />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section className="grain relative isolate flex h-svh min-h-[42rem] flex-col overflow-hidden bg-ink text-white">
      {/* The last light of the sun, low behind the people. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_70%_at_50%_100%,rgba(247,148,29,0.28),rgba(106,29,5,0.35)_45%,transparent_75%)]"
      />

      <div className="container-x grid gap-8 pt-32 sm:pt-36 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pt-40">
        <div className="lg:col-span-7 xl:col-span-8">
          <motion.p {...rise(0.1)} className="eyebrow flex items-center gap-3 text-ember">
            <span className="h-px w-8 bg-current" />
            Courage · Character · Service
          </motion.p>
          <h1 className="display mt-6 text-[clamp(3.3rem,9vw,8.6rem)] leading-[0.88]">
            <MaskLines lines={["Courage", "to lead."]} lineClassNames={["", "text-ember"]} delay={0.2} />
          </h1>
        </div>

        <div className="lg:col-span-5 lg:pb-3 xl:col-span-4">
          <motion.p {...rise(0.45)} className="max-w-md text-pretty text-lg leading-relaxed text-white/70 sm:text-xl">
            A people-first movement raising courageous, ethical leaders to build a new Nigeria, ward by ward,
            from the ground up.
          </motion.p>
          <motion.div {...rise(0.6)} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="/join" size="lg">
              Join the Movement
            </Button>
            <Link
              href="/pledge"
              className="group inline-flex items-center gap-2 py-2 font-bold text-white/85 transition-colors hover:text-white"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:100%_1px]">
                Read the Declaration
              </span>
              <span aria-hidden className="text-ember transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* The colonnade runs past the fold, so the page visibly continues. */}
      <div className="mx-auto mt-10 flex w-full max-w-[96rem] items-start gap-2.5 px-[clamp(1rem,2.5vw,2.5rem)] sm:mt-14 sm:gap-3.5 lg:mt-16 lg:gap-5">
        {faces.map((face, i) => (
          <Arch key={face.src} face={face} index={i} scrollY={scrollY} reduce={reduce} />
        ))}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-ink to-transparent" />
    </section>
  );
}
