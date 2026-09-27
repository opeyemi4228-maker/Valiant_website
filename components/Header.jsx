"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { nav, site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [mobileSub, setMobileSub] = useState(null);
  const lastY = useRef(0);
  const closeTimer = useRef(null);

  // Solid once the hero has scrolled away; tucked away while reading down,
  // back the moment the reader scrolls up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus whenever the page changes.
  useEffect(() => {
    setOpen(false);
    setDropdown(null);
    setMobileSub(null);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && (setOpen(false), setDropdown(null));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openMenu = (label) => {
    clearTimeout(closeTimer.current);
    setDropdown(label);
  };
  const closeMenuSoon = () => {
    closeTimer.current = setTimeout(() => setDropdown(null), 160);
  };

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const itemActive = (item) =>
    isActive(item.href) || (item.children && item.children.some((c) => isActive(c.href)));

  const linkClass = (active) =>
    clsx(
      "relative flex items-center gap-1.5 whitespace-nowrap py-2 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors",
      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-ember after:transition-transform after:duration-300",
      active ? "text-white after:scale-x-100" : "text-white/70 hover:text-white after:scale-x-0 hover:after:scale-x-100"
    );

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out-expo",
          hidden && !open && !dropdown ? "-translate-y-full" : "translate-y-0",
          "border-b",
          scrolled || open ? "border-white/10 bg-ink" : "border-transparent bg-transparent"
        )}
      >
        <div
          className={clsx(
            "container-x flex items-center gap-8 transition-[height] duration-500 ease-out-expo",
            scrolled ? "h-[68px] lg:h-[72px]" : "h-[76px] lg:h-[92px]"
          )}
        >
          <Link href="/" aria-label={`${site.name}, home`} className="relative z-10 shrink-0">
            <Image
              src="/images/logo-white.png"
              alt={site.name}
              width={701}
              height={207}
              priority
              className={clsx("w-auto transition-[height] duration-500", scrolled ? "h-10" : "h-11 lg:h-[50px]")}
            />
          </Link>

          <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-6 xl:gap-9">
              {nav.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && openMenu(item.label)}
                  onMouseLeave={() => item.children && closeMenuSoon()}
                >
                  {item.children ? (
                    <button
                      type="button"
                      aria-expanded={dropdown === item.label}
                      aria-haspopup="true"
                      onClick={() => setDropdown(dropdown === item.label ? null : item.label)}
                      className={linkClass(itemActive(item) || dropdown === item.label)}
                    >
                      {item.label}
                      <ChevronDown
                        className={clsx(
                          "size-3.5 transition-transform duration-300",
                          dropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>
                  ) : (
                    <Link href={item.href} className={linkClass(isActive(item.href))}>
                      {item.label}
                    </Link>
                  )}

                  <AnimatePresence>
                    {item.children && dropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2, ease }}
                        className="absolute left-1/2 top-full w-[340px] -translate-x-1/2 pt-5"
                        onFocus={() => openMenu(item.label)}
                      >
                        <div className="overflow-hidden rounded-2xl bg-white text-ink shadow-[0_24px_60px_-20px_rgba(18,7,5,0.45)] ring-1 ring-black/5">
                          <div className="h-1 bg-ember" />
                          <ul className="p-2">
                            {item.children.map((child) => {
                              const current = pathname === child.href;
                              return (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    aria-current={current ? "page" : undefined}
                                    className={clsx(
                                      "group/item flex items-center justify-between gap-4 rounded-xl px-4 py-3 transition-colors",
                                      current ? "bg-cream" : "hover:bg-cream"
                                    )}
                                  >
                                    <span>
                                      <span
                                        className={clsx(
                                          "block text-[14px] font-semibold transition-colors",
                                          current ? "text-rust" : "group-hover/item:text-rust"
                                        )}
                                      >
                                        {child.label}
                                      </span>
                                      <span className="mt-0.5 block text-[12.5px] leading-snug text-stone">
                                        {child.note}
                                      </span>
                                    </span>
                                    <ArrowRight className="size-4 shrink-0 -translate-x-1 text-ember opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-6 lg:ml-0">
            <Link
              href="/donate"
              className="hidden whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white xl:inline"
            >
              Donate
            </Link>
            <Link
              href="/join"
              className="hidden h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-ember px-6 lg:inline-flex text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-gold"
            >
              Join Us
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="-mr-1 flex h-11 items-center gap-3 rounded-full pl-5 pr-4 text-white ring-1 ring-inset ring-white/20 transition-colors hover:ring-white/45 lg:hidden"
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.18em]">{open ? "Close" : "Menu"}</span>
              {/* Two lines that cross into an X. */}
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={clsx(
                    "absolute left-0 top-1/2 h-[2px] w-5 rounded-full bg-current transition-[translate,rotate] duration-500 ease-out-expo",
                    open ? "translate-y-[-1px] rotate-45" : "-translate-y-[5px]"
                  )}
                />
                <span
                  className={clsx(
                    "absolute right-0 top-1/2 h-[2px] rounded-full bg-current transition-[translate,rotate,width] duration-500 ease-out-expo",
                    open ? "w-5 translate-y-[-1px] -rotate-45" : "w-3.5 translate-y-[3px]"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink pt-[68px] text-white lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col pb-[max(2rem,env(safe-area-inset-bottom))] pt-6">
              <ul>
                {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease }}
                    className="border-b border-white/10"
                  >
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={mobileSub === item.label}
                          onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                          className={clsx(
                            "flex w-full items-center justify-between py-5 text-left text-xl font-semibold",
                            itemActive(item) && "text-ember"
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className={clsx(
                              "size-5 text-white/50 transition-transform duration-300",
                              mobileSub === item.label && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileSub === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease }}
                              className="overflow-hidden"
                            >
                              <ul className="mb-5 border-l-2 border-ember/60 pl-4">
                                {item.children.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      className={clsx(
                                        "block py-2.5 text-base font-medium",
                                        pathname === child.href ? "text-ember" : "text-white/70"
                                      )}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={clsx(
                          "block py-5 text-xl font-semibold",
                          isActive(item.href) && "text-ember"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease }}
                className="mt-auto pt-10"
              >
                <Link
                  href="/join"
                  className="group flex items-center justify-between gap-4 rounded-[2rem] bg-ember p-2 pl-6 text-ink shadow-[0_20px_50px_-20px_rgba(247,148,29,0.7)]"
                >
                  <span className="py-2">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-ink/60">Membership is open</span>
                    <span className="mt-0.5 block text-xl font-extrabold">Join the Movement</span>
                  </span>
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-ink text-ember transition-transform duration-300 group-hover:rotate-45 group-active:scale-95">
                    <ArrowUpRight className="size-6" />
                  </span>
                </Link>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Link
                    href="/donate"
                    className="flex items-center justify-center rounded-full py-3.5 text-sm font-bold ring-1 ring-inset ring-white/20 transition-colors hover:ring-white/45"
                  >
                    Donate
                  </Link>
                  <a
                    href={site.links.app}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-full py-3.5 text-sm font-bold ring-1 ring-inset ring-white/20 transition-colors hover:ring-white/45"
                  >
                    Open the app <ArrowUpRight className="size-4 text-ember" />
                  </a>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
