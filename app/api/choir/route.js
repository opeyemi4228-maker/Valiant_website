import { anambraLgas, consents, heardFrom, MAX_AGE, officialSongs, supervisorRoles } from "@/lib/choir";
import { isEmail, json, normalisePhone, rateLimited, readAll, save, text } from "@/lib/submissions";

const int = (v) => {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
};

export async function POST(request) {
  if (rateLimited(request)) {
    return json({ error: "Too many attempts. Please wait a few minutes and try again." }, 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "We could not read that registration." }, 400);
  }
  if (text(body.company)) return json({ ok: true, reference: "VYC-PENDING" });

  const entry = {
    choirName: text(body.choirName, 120),
    church: text(body.church, 160),
    denomination: text(body.denomination, 80),
    lga: anambraLgas.includes(body.lga) ? body.lga : "",
    town: text(body.town, 80),
    yearEstablished: int(body.yearEstablished),
    members: int(body.members),
    maleMembers: int(body.maleMembers),
    femaleMembers: int(body.femaleMembers),
    youngest: int(body.youngest),
    oldest: int(body.oldest),
    supervisorName: text(body.supervisorName, 100),
    supervisorRole: supervisorRoles.includes(body.supervisorRole) ? body.supervisorRole : "",
    supervisorPhone: normalisePhone(body.supervisorPhone),
    supervisorEmail: text(body.supervisorEmail, 120).toLowerCase(),
    song: officialSongs.includes(body.song) ? body.song : "",
    whySong: text(body.whySong, 1000),
    videoUrl: text(body.videoUrl, 500),
    liveConfirmed: body.liveConfirmed === true,
    consents: Array.isArray(body.consents) ? body.consents.filter((c) => consents.includes(c)) : [],
    previousCompetition: text(body.previousCompetition, 500),
    heardFrom: heardFrom.includes(body.heardFrom) ? body.heardFrom : "",
  };

  const errors = {};
  if (!entry.choirName) errors.choirName = "Enter the choir's name.";
  if (!entry.church) errors.church = "Enter the church or ministry.";
  if (!entry.lga) errors.lga = "Select the local government area.";
  if (!entry.members || entry.members < 1) errors.members = "How many members does the choir have?";
  if (entry.oldest !== null && entry.oldest > MAX_AGE) errors.oldest = `All members must be ${MAX_AGE} or younger.`;
  if (!entry.supervisorName) errors.supervisorName = "Enter the supervising adult's name.";
  if (!entry.supervisorRole) errors.supervisorRole = "Select their role.";
  if (!entry.supervisorPhone) errors.supervisorPhone = "Enter a valid phone number.";
  if (!isEmail(entry.supervisorEmail)) errors.supervisorEmail = "Enter a valid email address.";
  if (!entry.song) errors.song = "Choose one of the official songs.";
  try {
    const url = new URL(entry.videoUrl);
    if (!/^https?:$/.test(url.protocol)) throw new Error();
  } catch {
    errors.videoUrl = "Paste the public link to your audition video.";
  }
  if (!entry.liveConfirmed) errors.liveConfirmed = "Confirm this is a live performance.";
  if (entry.consents.length !== consents.length) errors.consents = "All declarations must be accepted.";

  if (Object.keys(errors).length) return json({ error: "Please check the highlighted fields.", errors }, 422);

  const existing = await readAll("choirs");
  const reference = `VYC-${String(existing.length + 1).padStart(4, "0")}`;
  const stored = await save("choirs", { reference, ...entry });
  if (!stored) return json({ error: "We couldn't save the registration just now. Please try again shortly." }, 503);
  return json({ ok: true, reference });
}
