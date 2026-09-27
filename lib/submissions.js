/**
 * Where form submissions go.
 *
 * Every submission is appended as one JSON line to data/<kind>.jsonl, enough
 * for a site running on a single server, readable with any text editor and
 * trivially imported into a spreadsheet. If FORMS_WEBHOOK_URL is set, each one
 * is also POSTed there (a Google Apps Script, Zapier or Make hook), which is
 * how a deployment without a writable disk (Vercel, Netlify) keeps its data.
 */

import "server-only";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = process.env.FORMS_DATA_DIR || path.join(process.cwd(), "data");
const WEBHOOK = process.env.FORMS_WEBHOOK_URL;

function file(kind) {
  return path.join(DATA_DIR, `${kind}.jsonl`);
}

export async function readAll(kind) {
  try {
    const text = await readFile(file(kind), "utf8");
    return text
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

/** Stores a record; returns false only if neither the disk nor the webhook took it. */
export async function save(kind, record) {
  const entry = { kind, receivedAt: new Date().toISOString(), ...record };
  let stored = false;

  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(file(kind), JSON.stringify(entry) + "\n", "utf8");
    stored = true;
  } catch (error) {
    console.error(`[forms] could not write ${kind}:`, error.message);
  }

  if (WEBHOOK) {
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (res.ok) stored = true;
      else console.error(`[forms] webhook answered ${res.status} for ${kind}`);
    } catch (error) {
      console.error(`[forms] webhook failed for ${kind}:`, error.message);
    }
  }

  return stored;
}

/* A small in-memory limiter: plenty for one server, and it resets on deploy. */
const hits = new Map();

export function rateLimited(request, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > limit;
}

/* ── Field helpers shared by the routes ─────────────────────────────────── */

export const text = (value, max = 200) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

/**
 * Nigerian numbers in any common spelling become +234XXXXXXXXXX. Anything
 * already international (a diaspora member) is kept as typed, digits only.
 */
export function normalisePhone(value) {
  const raw = text(value, 30).replace(/[\s\-().]/g, "");
  if (/^0[789][01]\d{8}$/.test(raw)) return "+234" + raw.slice(1);
  if (/^234[789][01]\d{8}$/.test(raw)) return "+" + raw;
  if (/^\+234[789][01]\d{8}$/.test(raw)) return raw;
  if (/^\+\d{8,15}$/.test(raw)) return raw;
  return null;
}

export function ageOn(dateString, today = new Date()) {
  const dob = new Date(dateString);
  if (Number.isNaN(dob.getTime())) return null;
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

export function json(body, status = 200) {
  return Response.json(body, { status });
}
