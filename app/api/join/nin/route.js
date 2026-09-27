import { stateNames } from "@/lib/geography";
import { json, ninFingerprint, normaliseNin, normalisePhone, rateLimited, readAll, save, text } from "@/lib/submissions";

/**
 * Quick registration: a NIN, a phone number and the member's place on the
 * register. Stored alongside full registrations so references and duplicate
 * checks cover both.
 */
export async function POST(request) {
  if (rateLimited(request)) {
    return json({ error: "Too many attempts. Please wait a few minutes and try again." }, 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "We could not read that submission." }, 400);
  }

  if (text(body.company)) return json({ ok: true, reference: "VM-PENDING" });

  const nin = normaliseNin(body.nin);
  const place = {
    phone: normalisePhone(body.phone),
    state: stateNames.includes(body.state) ? body.state : "",
    lga: text(body.lga, 80),
    ward: text(body.ward, 120),
    wardCode: text(body.wardCode, 20),
    pollingUnit: text(body.pollingUnit, 200),
    pollingUnitCode: text(body.pollingUnitCode, 24),
  };
  // The form only lets a member skip the polling unit when INEC lists none for their ward.
  const unitsAvailable = body.unitsAvailable !== false;

  const errors = {};
  if (!nin) errors.nin = "Your NIN is the 11 digits on your NIN slip or card.";
  if (!place.phone) errors.phone = "Enter a valid phone number, e.g. 0803 123 4567.";
  if (!place.state) errors.state = "Select your state.";
  if (!place.lga) errors.lga = "Select your local government area.";
  if (!place.ward) errors.ward = "Select your ward.";
  if (unitsAvailable && !place.pollingUnitCode) errors.pollingUnitCode = "Select your polling unit.";
  if (body.consent !== true) errors.consent = "Please affirm the Pledge and consent to continue.";
  if (Object.keys(errors).length) {
    return json({ error: "Please check the highlighted fields.", errors }, 422);
  }

  const fingerprint = ninFingerprint(nin);
  if (!fingerprint) {
    console.error("[join/nin] NIN_HASH_SECRET is not set; refusing to store a NIN.");
    return json({ error: "NIN registration is not available just now. Please use full registration." }, 503);
  }

  const existing = await readAll("members");
  if (existing.some((m) => m.ninHash === fingerprint.ninHash)) {
    return json(
      {
        error: "This NIN is already registered. If you think that's a mistake, contact us.",
        errors: { nin: "Already registered." },
      },
      409
    );
  }
  if (existing.some((m) => m.phone === place.phone)) {
    return json(
      {
        error: "This phone number is already registered. If you think that's a mistake, contact us.",
        errors: { phone: "Already registered." },
      },
      409
    );
  }

  const stateCode = (place.wardCode.split("-")[0] || place.state.slice(0, 3)).toUpperCase();
  const reference = `VM-${stateCode}-${String(existing.length + 1).padStart(6, "0")}`;

  const stored = await save("members", { reference, registration: "nin", ...fingerprint, ...place, pledge: true });
  if (!stored) {
    return json({ error: "We couldn't save your registration just now. Please try again shortly." }, 503);
  }

  return json({ ok: true, reference });
}
