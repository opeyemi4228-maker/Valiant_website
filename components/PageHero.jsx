import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MaskLines, Reveal } from "@/components/motion";

/**
 * The sun of the emblem, rising from the bottom edge. Kept for pages that
 * want atmosphere without a photograph (the 404 page).
 */
export function Sunrise() {
  const rings = [150, 215, 290, 375, 470];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute bottom-0 right-[-30%] aspect-square w-[min(64rem,130vw)] translate-y-1/2 sm:right-[-12%] lg:right-[-4%]">
        <div className="absolute inset-[30%] rounded-full bg-flame/25 blur-3xl" />
        <svg viewBox="0 0 1000 1000" className="absolute inset-0 size-full">
          <defs>
            <radialGradient id="sunrise-disc" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffc56e" />
              <stop offset="45%" stopColor="#f7941d" />
              <stop offset="100%" stopColor="#6a1d05" />
            </radialGradient>
          </defs>
          {rings.map((r, i) => (
            <circle key={r} cx="500" cy="500" r={r} fill="none" stroke="#f7941d" strokeOpacity={0.3 - i * 0.05} strokeWidth="1" />
          ))}
          <circle cx="500" cy="500" r="110" fill="url(#sunrise-disc)" opacity="0.85" />
        </svg>
        <svg viewBox="0 0 1000 1000" className="absolute inset-0 size-full animate-spin-slow">
          <circle cx="500" cy="500" r="252" fill="none" stroke="#ffc56e" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="2 14" />
        </svg>
      </div>
    </div>
  );
}

/**
 * The opening of every inner page. Words on the left; on the right an arch,
 * the same shape as the portraits on the home page, standing on the bottom
 * edge. It holds a photograph when the page has a fitting one and the eagle
 * of the emblem when it does not. The arch is sized so the ~1200px event
 * photographs stay sharp instead of being stretched edge to edge.
 *
 *   parent    optional { label, href }, the middle step of the breadcrumb
 *   children  optional calls to action under the intro
 */
export default function PageHero({
  kicker,
  title,
  accent,
  intro,
  image,
  imageAlt = "",
  imagePosition = "center",
  parent,
  children,
}) {
  const lines = accent ? [title, accent] : [title];
  const trail = [{ label: "Home", href: "/" }, ...(parent ? [parent] : [])];

  return (
    <section className="grain relative isolate overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_70%_at_82%_100%,rgba(106,29,5,0.7),transparent_70%)]"
      />

      <div className="container-x grid items-end gap-10 pt-32 sm:pt-36 lg:grid-cols-12 lg:gap-12 lg:pt-40">
        <div className="lg:col-span-7 lg:pb-24">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-white/50">
                {trail.map((c) => (
                  <li key={c.href} className="flex items-center gap-1.5">
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                    <ChevronRight aria-hidden className="size-3.5" />
                  </li>
                ))}
                <li aria-current="page" className="text-ember">
                  {kicker}
                </li>
              </ol>
            </nav>
          </Reveal>

          <h1 className="display mt-6 text-[clamp(2.4rem,5.9vw,5.4rem)]">
            <MaskLines lines={lines} lineClassNames={["", "text-ember"]} delay={0.1} />
          </h1>

          {intro && (
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">{intro}</p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.35} className="mt-9 flex flex-wrap gap-3">
              {children}
            </Reveal>
          )}
        </div>

        <Reveal delay={0.2} y={60} className="relative lg:col-span-5">
          <div className="relative mx-auto w-[min(58vw,15rem)] sm:w-72 lg:ml-auto lg:mr-0 lg:w-full lg:max-w-[23rem]">
            <div aria-hidden className="absolute -inset-3 rounded-t-full border border-white/15 sm:-inset-4" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-night">
              {image ? (
                <>
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 23rem, 20rem"
                    className="object-cover"
                    style={{ objectPosition: imagePosition }}
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-ink/60 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,var(--color-gold),var(--color-ember)_45%,var(--color-flame)_80%)]">
                  <Image
                    src="/images/eagle.png"
                    alt=""
                    width={256}
                    height={256}
                    className="absolute left-1/2 top-[44%] w-3/5 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_18px_30px_rgba(63,13,0,0.45)]"
                  />
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
