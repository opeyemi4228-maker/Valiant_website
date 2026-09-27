import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Button, Kicker, WhatsappIcon } from "@/components/ui";
import { Reveal, RevealItem, Stagger } from "@/components/motion";
import { dateBlock, dateRange, formats, highlights, splitEvents } from "@/lib/events";
import { site } from "@/lib/site";

export const metadata = {
  title: "Events",
  description:
    "Conventions, gatherings and leadership trainings of the Valiant Movement, where Valiants meet, learn and recommit.",
};

// Re-render hourly so an event moves from Upcoming to Past without a redeploy.
export const revalidate = 3600;

const FALLBACK = "/images/gallery/g24.jpg";

function Meta({ event, tone = "dark" }) {
  const icon = tone === "dark" ? "text-ember" : "text-rust";
  const place = [event.venue, event.city].filter(Boolean).join(", ");
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
      <li className="flex items-center gap-2">
        <CalendarDays className={`size-4 ${icon}`} />
        {dateRange(event)}
      </li>
      {event.time && (
        <li className="flex items-center gap-2">
          <Clock className={`size-4 ${icon}`} />
          {event.time}
        </li>
      )}
      {place && (
        <li className="flex items-center gap-2">
          <MapPin className={`size-4 ${icon}`} />
          {place}
        </li>
      )}
    </ul>
  );
}

function Upcoming({ event }) {
  const { day, month, year } = dateBlock(event.start);
  return (
    <Reveal
      as="article"
      className="grain relative isolate grid overflow-hidden rounded-[2rem] bg-ink text-white lg:grid-cols-12"
    >
      <div className="relative aspect-[16/10] lg:col-span-5 lg:aspect-auto">
        <Image src={event.image || FALLBACK} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-col gap-8 p-8 sm:p-12 lg:col-span-7">
        <div className="flex items-end gap-5">
          <p className="display text-[clamp(4rem,8vw,6.5rem)] leading-none text-ember">{day}</p>
          <p className="eyebrow pb-2 text-white/60">
            {month}
            <br />
            {year}
          </p>
        </div>
        <div>
          <h3 className="display text-[clamp(2rem,3.7vw,3.2rem)]">{event.title}</h3>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">{event.summary}</p>
        </div>
        <div className="text-white/85">
          <Meta event={event} />
        </div>
        <div className="mt-auto flex flex-wrap gap-3">
          {event.link ? (
            <Button href={event.link} external>
              Details &amp; registration
            </Button>
          ) : (
            <Button href="/join">Register to attend</Button>
          )}
          <Button href={site.links.whatsapp} external variant="ghost">
            Ask in the community
          </Button>
        </div>
      </div>
    </Reveal>
  );
}

function Past({ event, wide }) {
  return (
    <RevealItem
      as="article"
      className={wide ? "group grid items-center gap-8 lg:col-span-2 lg:grid-cols-2 lg:gap-16" : "group"}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-sand">
        <Image
          src={event.image || FALLBACK}
          alt={[event.title, event.city].filter(Boolean).join(", ")}
          fill
          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover grayscale-[35%] transition duration-1000 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>
      <div>
        <h3 className={wide ? "display text-[clamp(2rem,3.7vw,3.2rem)]" : "mt-6 text-2xl font-extrabold sm:text-[1.7rem]"}>
          {event.title}
        </h3>
        <p className={wide ? "mt-4 max-w-lg text-lg leading-relaxed text-stone" : "mt-2 max-w-lg text-stone"}>
          {event.summary}
        </p>
        <div className={wide ? "mt-6 text-ink/80" : "mt-4 text-ink/80"}>
          <Meta event={event} tone="light" />
        </div>
      </div>
    </RevealItem>
  );
}

export default function EventsPage() {
  const { upcoming, past } = splitEvents();

  return (
    <>
      <PageHero
        kicker="Events"
        title="Where Valiants"
        accent="gather."
        intro="Conventions, trainings and gatherings across the federation. The Movement, in one room."
        image="/images/gallery/g19.jpg"
      />

      {/* Upcoming, or between seasons, a way to hear first. */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Kicker tone="rust">Upcoming</Kicker>
              <h2 className="display mt-6 text-[clamp(2.22rem,5.18vw,4.44rem)]">
                {upcoming.length ? (
                  <>
                    Save the <span className="text-rust">date.</span>
                  </>
                ) : (
                  <>
                    The next date is <span className="text-rust">coming.</span>
                  </>
                )}
              </h2>
            </div>
          </Reveal>

          {upcoming.length ? (
            <div className="mt-12 space-y-8">
              {upcoming.map((e) => (
                <Upcoming key={`${e.title}-${e.start}`} event={e} />
              ))}
            </div>
          ) : (
            <Reveal className="mt-12 flex flex-col gap-8 rounded-[2rem] bg-white p-8 ring-1 ring-line sm:p-12 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-xl text-lg leading-relaxed text-stone">
                New gatherings are announced to members first, in the WhatsApp community and through your chapter.
                Join now and you will hear the moment dates are set.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={site.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[15px] font-extrabold text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <WhatsappIcon className="size-5 text-[#25D366]" /> Get notified
                </a>
                <Button href="/join" variant="ghost-dark">
                  Become a member
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* What the Movement convenes, year after year. */}
      <section className="bg-sand py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Kicker tone="rust">What we convene</Kicker>
            <h2 className="display mt-6 text-[clamp(2.07rem,4.07vw,3.7rem)]">
              Every year, <span className="text-rust">three ways</span> in.
            </h2>
          </Reveal>
          <Stagger as="ol" className="border-t border-ink/15 lg:col-span-8">
            {formats.map((f, i) => (
              <RevealItem as="li" key={f.title} className="border-b border-ink/15">
                <Link href={f.href} className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 py-8 sm:gap-8">
                  <span className="display pt-1 text-lg text-rust">0{i + 1}</span>
                  <span>
                    <span className="block text-xl font-extrabold transition-colors group-hover:text-rust sm:text-2xl">
                      {f.title}
                    </span>
                    <span className="mt-2 block max-w-xl text-stone">{f.body}</span>
                  </span>
                  <span className="grid size-11 place-items-center rounded-full ring-1 ring-ink/20 transition duration-300 group-hover:bg-ink group-hover:text-ember group-hover:ring-ink">
                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {past.length > 0 && (
        <section className="bg-cream py-20 sm:py-28">
          <div className="container-x">
            <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Kicker tone="rust">Past events</Kicker>
                <h2 className="display mt-6 text-[clamp(2.22rem,5.18vw,4.44rem)]">
                  Where we have <span className="text-rust">been.</span>
                </h2>
              </div>
              <Button href="/gallery" variant="ghost-dark">
                See the photographs
              </Button>
            </Reveal>
            <Stagger className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2">
              {past.map((e) => (
                <Past key={`${e.title}-${e.start}`} event={e} wide={past.length === 1} />
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <section className="bg-ink py-20 text-white sm:py-28">
        <div className="container-x">
          <Reveal>
            <Kicker>From the chapters</Kicker>
            <h2 className="display mt-6 max-w-3xl text-[clamp(2.07rem,4.07vw,3.7rem)]">
              The work between <span className="text-ember">the gatherings.</span>
            </h2>
          </Reveal>
          <Stagger className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {highlights.map((h) => (
              <RevealItem as="figure" key={h.title} className="group w-[78%] shrink-0 snap-start sm:w-auto">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-night">
                  <Image
                    src={h.image}
                    alt={h.title}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-lg font-extrabold leading-snug">{h.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{h.summary}</p>
                  </figcaption>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand title="Be in the room" accent="next time." />
    </>
  );
}
