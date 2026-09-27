/**
 * Nigerian geography for member registration: INEC's register of 37 states,
 * 774 LGAs, 8,809 wards and 176,623 polling units.
 *
 * The tables live in public/geo and are fetched on demand, so nobody downloads
 * the country to fill in four dropdowns:
 *
 *   /geo/<slug>.json      one state's LGAs and wards (5 to 40 KB)
 *   /geo/pu/<LGA>.json    one LGA's polling units (2 to 60 KB)
 *
 * The data was built for the MAAP platform (scripts/build-geography.mjs there);
 * copy public/geo across again whenever INEC publishes a revision.
 */

export const states = [
  { name: "Abia", slug: "abia" },
  { name: "Adamawa", slug: "adamawa" },
  { name: "Akwa Ibom", slug: "akwa-ibom" },
  { name: "Anambra", slug: "anambra" },
  { name: "Bauchi", slug: "bauchi" },
  { name: "Bayelsa", slug: "bayelsa" },
  { name: "Benue", slug: "benue" },
  { name: "Borno", slug: "borno" },
  { name: "Cross River", slug: "cross-river" },
  { name: "Delta", slug: "delta" },
  { name: "Ebonyi", slug: "ebonyi" },
  { name: "Edo", slug: "edo" },
  { name: "Ekiti", slug: "ekiti" },
  { name: "Enugu", slug: "enugu" },
  { name: "Federal Capital Territory", slug: "abuja" },
  { name: "Gombe", slug: "gombe" },
  { name: "Imo", slug: "imo" },
  { name: "Jigawa", slug: "jigawa" },
  { name: "Kaduna", slug: "kaduna" },
  { name: "Kano", slug: "kano" },
  { name: "Katsina", slug: "katsina" },
  { name: "Kebbi", slug: "kebbi" },
  { name: "Kogi", slug: "kogi" },
  { name: "Kwara", slug: "kwara" },
  { name: "Lagos", slug: "lagos" },
  { name: "Nasarawa", slug: "nasarawa" },
  { name: "Niger", slug: "niger" },
  { name: "Ogun", slug: "ogun" },
  { name: "Ondo", slug: "ondo" },
  { name: "Osun", slug: "osun" },
  { name: "Oyo", slug: "oyo" },
  { name: "Plateau", slug: "plateau" },
  { name: "Rivers", slug: "rivers" },
  { name: "Sokoto", slug: "sokoto" },
  { name: "Taraba", slug: "taraba" },
  { name: "Yobe", slug: "yobe" },
  { name: "Zamfara", slug: "zamfara" },
];

const slugByName = new Map(states.map((s) => [s.name, s.slug]));

export const stateNames = states.map((s) => s.name);

/* One fetch per file per session. Caching the promise, not the result, means
   two callers asking at once share a request. */
const cache = new Map();

function loadJson(url) {
  if (!cache.has(url)) {
    const pending = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`${url}: ${res.status}`);
        return res.json();
      })
      .catch((error) => {
        // A dropped connection must stay retryable.
        cache.delete(url);
        throw error;
      });
    cache.set(url, pending);
  }
  return cache.get(url);
}

/** A state's tree: `{ state, code, slug, lgas: [{ code, name, wards: [{ code, name, units }] }] }`. */
export function loadState(name) {
  const slug = slugByName.get(name);
  return slug ? loadJson(`/geo/${slug}.json`) : Promise.resolve(null);
}

/** One LGA's polling units, keyed by two-digit ward number: `{ "07": [["003", "Name"], …] }`. */
export function loadUnits(lgaCode) {
  return lgaCode ? loadJson(`/geo/pu/${lgaCode}.json`) : Promise.resolve(null);
}

export function findLga(tree, lga) {
  if (!tree || !lga) return null;
  return tree.lgas.find((entry) => entry.name === lga) ?? null;
}

export function findWard(tree, lga, ward) {
  if (!ward) return null;
  return findLga(tree, lga)?.wards.find((entry) => entry.name === ward) ?? null;
}

/**
 * Polling units of one ward as `{ value, label }`. The value is INEC's code,
 * because unit names repeat inside a ward; repeated labels get their number.
 */
export function pollingUnitsFor(units, wardCode) {
  if (!units || !wardCode) return [];
  const rows = units[wardCode.slice(-2)] ?? [];
  const seen = new Map();
  for (const [, name] of rows) seen.set(name, (seen.get(name) ?? 0) + 1);
  return rows.map(([number, name]) => ({
    value: `${wardCode}-${number}`,
    label: seen.get(name) > 1 ? `${name} (unit ${number})` : name,
  }));
}
