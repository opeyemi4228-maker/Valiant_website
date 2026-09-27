# The Valiant Movement website

Next.js 16 · Tailwind CSS 4 · Motion. Replaces the WordPress site at valiants.me.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/about` · `/founder` · `/pledge` · `/ethics` · `/membership` | About the Movement |
| `/programmes` · `/programmes/choir` | Programmes, choir competition registration |
| `/events` · `/gallery` · `/contact` · `/donate` | |
| `/join` | Member registration |

Old WordPress addresses (`/join-us`, `/about-us`, `/meet-our-founder`, …) redirect to their new pages (see `next.config.mjs`).

## Editing content

- **Wording, links, phone numbers:** `lib/site.js`
- **Events:** `lib/events.js`. Add an entry; it moves from Upcoming to Past on its own.
- **Choir competition lists (LGAs, songs, declarations):** `lib/choir.js`
- **Photos:** `public/images/gallery/`, listed in `lib/site.js`.

## Registrations and messages

The Join, Choir and Contact forms post to `/api/join`, `/api/choir` and `/api/contact`. Each submission is validated on the server and appended as one line of JSON to:

- `data/members.jsonl`: members, each with a reference such as `VM-LAG-000001`
- `data/choirs.jsonl`
- `data/messages.jsonl`

Duplicate phone numbers are rejected, members must be 18+, and a honeypot plus a per-IP rate limit keep bots out.

**Deploying:** on a VPS or any Node host with a persistent disk this works as is (back up `data/`). On Vercel/Netlify the disk is not persistent, so set `FORMS_WEBHOOK_URL` (see `.env.example`) to forward every submission to a Google Sheet, CRM or database.

## Geography

The ward and polling-unit dropdowns use INEC's register (37 states, 774 LGAs, 8,809 wards, 176,623 polling units) in `public/geo/`, fetched one state and one LGA at a time. The data comes from the MAAP project's `scripts/build-geography.mjs`; copy `public/geo` across again if INEC publishes a revision.
