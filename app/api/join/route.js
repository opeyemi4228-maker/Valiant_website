import { stateNames } from "@/lib/geography";
import { membershipCategories } from "@/lib/site";
import { ageOn, isEmail, json, normalisePhone, rateLimited, readAll, save, text } from "@/lib/submissions";

const TITLES = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof", "Chief", "Engr", "Barr", "Rev", "Hon"];
const GENDERS = ["Male", "Female"];

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

  // Bots fill every field, including the one people never see.
  if (text(body.company)) return json({ ok: true, reference: "VM-PENDING" });

  const member = {
    title: TITLES.includes(body.title) ? body.title : "",
    firstName: text(body.firstName, 60),
    middleName: text(body.middleName, 60),
    lastName: text(body.lastName, 60),
    phone: normalisePhone(body.phone),
    email: text(body.email, 120).toLowerCase(),
    gender: GENDERS.includes(body.gender) ? body.gender : "",
    dateOfBirth: text(body.dateOfBirth, 10),
    category: membershipCategories.includes(body.category) ? body.category : "",
    state: stateNames.includes(body.state) ? body.state : "",
    lga: text(body.lga, 80),
    ward: text(body.ward, 120),
    wardCode: text(body.wardCode, 20),
    pollingUnit: text(body.pollingUnit, 200),
    pollingUnitCode: text(body.pollingUnitCode, 24),
    occupation: text(body.occupation, 80),
    pledge: body.pledge === true,
  };

  const errors = {};
  if (!member.firstName) errors.firstName = "Enter your first name.";
  if (!member.lastName) errors.lastName = "Enter your last name.";
  if (!member.phone) errors.phone = "Enter a valid phone number, e.g. 0803 123 4567.";
  if (member.email && !isEmail(member.email)) errors.email = "That email address doesn't look right.";
  if (!member.gender) errors.gender = "Select your gender.";
  const age = ageOn(member.dateOfBirth);
  if (age === null) errors.dateOfBirth = "Enter your date of birth.";
  else if (age < 18) errors.dateOfBirth = "Members must be at least 18 years old.";
  else if (age > 120) errors.dateOfBirth = "Check your date of birth.";
  if (!member.category) errors.category = "Choose a membership category.";
  if (!member.state) errors.state = "Select your state.";
  if (!member.lga) errors.lga = "Select your local government area.";
  if (!member.ward) errors.ward = "Select your ward.";
  if (!member.pledge) errors.pledge = "Please affirm the Valiant Pledge to join.";

  if (Object.keys(errors).length) {
    return json({ error: "Please check the highlighted fields.", errors }, 422);
  }

  const existing = await readAll("members");
  if (existing.some((m) => m.phone === member.phone)) {
    return json(
      {
        error: "This phone number is already registered. If you think that's a mistake, contact us.",
        errors: { phone: "Already registered." },
      },
      409
    );
  }

  // A friendly reference: VM-<state code>-<running number>.
  const stateCode = (member.wardCode.split("-")[0] || member.state.slice(0, 3)).toUpperCase();
  const reference = `VM-${stateCode}-${String(existing.length + 1).padStart(6, "0")}`;

  const stored = await save("members", { reference, ...member });
  if (!stored) {
    return json({ error: "We couldn't save your registration just now. Please try again shortly." }, 503);
  }

  return json({ ok: true, reference, firstName: member.firstName });
}
