/**
 * The Movement's calendar. Add an event to `events` and it appears on /events,
 * under "Upcoming" until its last day has passed, then under "Past".
 *
 *   {
 *     title: "The Valiant Gathering",
 *     start: "2026-11-14",          // ISO day, Nigerian time
 *     end: "2026-11-15",            // optional
 *     time: "10:00 am to 4:00 pm",   // optional
 *     venue: "Transcorp Hilton",
 *     city: "Abuja",
 *     summary: "One or two sentences.",
 *     image: "/images/gallery/g24.jpg",   // optional
 *     link: "https://…",            // optional: registration or details
 *   }
 */
export const events = [
  {
    title: "Valiant Convention",
    start: "2026-05-04",
    end: "2026-05-05",
    time: "8:00 am to 5:00 pm",
    venue: "Cultural Centre",
    city: "Calabar, Cross River",
    summary:
      "Two days of leadership formation, fellowship and recommitment to the Declaration, with Valiants from across the federation.",
    image: "/images/gallery/g24.jpg",
  },
];

/** Moments from the Movement's work, shown beneath the calendar. */
export const highlights = [
  {
    title: "The Valiant Gathering",
    summary: "Raising a new generation: members and leaders convened to recommit to the Declaration.",
    image: "/images/gallery/g20.jpg",
  },
  {
    title: "Valiant DNA Experience",
    summary: "Leadership training in strategic communication, civic education and community replication.",
    image: "/images/gallery/g05.jpg",
  },
  {
    title: "Awka North LGA chapter",
    summary: "Members of the Awka North chapter rallying behind R.I.S.E. in Anambra State.",
    image: "/images/gallery/g09.jpg",
  },
  {
    title: "Idemili South LGA chapter",
    summary: "A grassroots chapter meeting, multiplying leadership values ward by ward.",
    image: "/images/gallery/g07.jpg",
  },
];

/** What the Movement convenes, year after year. */
export const formats = [
  {
    title: "The Valiant Gathering",
    body: "Our flagship convening, where members recommit to the Declaration and leave to multiply it.",
    href: "/programmes#gathering",
  },
  {
    title: "The Valiant DNA Experience",
    body: "Immersive leadership training: mentorship, simulations and grassroots assignments.",
    href: "/programmes#dna-experience",
  },
  {
    title: "Youth Choir Competition",
    body: "Church youth choirs aged 20 and below, singing for faith, discipline and excellence.",
    href: "/programmes/choir",
  },
];

const TZ = "Africa/Lagos";

/** Today in Lagos as YYYY-MM-DD, so an event becomes "past" at local midnight. */
function today() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

export function splitEvents() {
  const now = today();
  const upcoming = events.filter((e) => (e.end || e.start) >= now).sort((a, b) => a.start.localeCompare(b.start));
  const past = events.filter((e) => (e.end || e.start) < now).sort((a, b) => b.start.localeCompare(a.start));
  return { upcoming, past };
}

const parse = (iso) => new Date(`${iso}T12:00:00Z`);
const fmt = (iso, options) => new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...options }).format(parse(iso));

/** "4 to 5 May 2026", "30 Apr to 2 May 2026", or "4 May 2026". */
export function dateRange({ start, end }) {
  if (!end || end === start) return fmt(start, { day: "numeric", month: "long", year: "numeric" });
  const [sy, sm] = start.split("-");
  const [ey, em] = end.split("-");
  if (sy === ey && sm === em) {
    return `${fmt(start, { day: "numeric" })} to ${fmt(end, { day: "numeric", month: "long", year: "numeric" })}`;
  }
  if (sy === ey) {
    return `${fmt(start, { day: "numeric", month: "short" })} to ${fmt(end, { day: "numeric", month: "short", year: "numeric" })}`;
  }
  return `${fmt(start, { day: "numeric", month: "short", year: "numeric" })} to ${fmt(end, { day: "numeric", month: "short", year: "numeric" })}`;
}

/** The big day-and-month block on an event row. */
export function dateBlock(iso) {
  return { day: fmt(iso, { day: "2-digit" }), month: fmt(iso, { month: "short" }), year: fmt(iso, { year: "numeric" }) };
}
