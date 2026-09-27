"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Fingerprint, UserRound } from "lucide-react";
import clsx from "clsx";
import JoinForm from "@/components/JoinForm";
import QuickJoinForm from "@/components/QuickJoinForm";

const TYPES = [
  {
    id: "full",
    Icon: UserRound,
    title: "Full registration",
    body: "Your personal details, where you vote, and the Valiant Pledge.",
    meta: "3 steps · about 3 minutes",
  },
  {
    id: "nin",
    Icon: Fingerprint,
    title: "Register with your NIN",
    body: "Your NIN, phone number and polling unit, on one screen.",
    meta: "1 step · under a minute",
    badge: "Fastest",
  },
];

/**
 * The Join page's two ways in. The choice lives in the URL (?type=nin), so a
 * chapter can share a link that opens straight on NIN registration.
 */
export default function JoinRegistration() {
  const [type, setType] = useState("full");

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("type");
    if (wanted === "nin") setType("nin");
  }, []);

  const choose = (id) => {
    setType(id);
    const url = new URL(window.location.href);
    if (id === "nin") url.searchParams.set("type", "nin");
    else url.searchParams.delete("type");
    window.history.replaceState(null, "", url);
  };

  return (
    <div>
      <fieldset>
        <legend className="eyebrow text-rust">Choose how to register</legend>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {TYPES.map(({ id, Icon, title, body, meta, badge }) => {
            const selected = type === id;
            return (
              <label
                key={id}
                className={clsx(
                  "group relative flex cursor-pointer gap-4 rounded-[1.75rem] p-5 transition-[background-color,box-shadow] duration-300 sm:p-6",
                  "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ember/30",
                  selected
                    ? "bg-white shadow-[0_24px_60px_-30px_rgba(63,13,0,0.45)] ring-2 ring-ember"
                    : "bg-white/50 ring-1 ring-line hover:bg-white hover:ring-ink/20"
                )}
              >
                <input
                  type="radio"
                  name="registration-type"
                  value={id}
                  checked={selected}
                  onChange={() => choose(id)}
                  className="sr-only"
                />
                <span
                  className={clsx(
                    "grid size-12 shrink-0 place-items-center rounded-2xl transition-colors duration-300",
                    selected ? "bg-ember text-ink" : "bg-sand text-rust"
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <span className="min-w-0 flex-1 pr-7">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-extrabold leading-tight">{title}</span>
                    {badge && (
                      <span className="rounded-full bg-ink px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ember">
                        {badge}
                      </span>
                    )}
                  </span>
                  <span className="mt-1.5 block text-[15px] leading-snug text-stone">{body}</span>
                  <span className="mt-3 block text-xs font-bold uppercase tracking-[0.14em] text-rust">{meta}</span>
                </span>
                <span
                  aria-hidden
                  className={clsx(
                    "absolute right-5 top-5 grid size-6 place-items-center rounded-full transition-all duration-300",
                    selected ? "scale-100 bg-ember text-ink" : "scale-90 ring-2 ring-line"
                  )}
                >
                  {selected && <Check className="size-3.5" strokeWidth={3.5} />}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={type}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          {type === "nin" ? <QuickJoinForm /> : <JoinForm />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
