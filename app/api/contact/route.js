import { isEmail, json, normalisePhone, rateLimited, save, text } from "@/lib/submissions";

const TOPICS = ["General enquiry", "Membership", "Partnership", "Media & press", "Volunteering", "Other"];

export async function POST(request) {
  if (rateLimited(request)) {
    return json({ error: "Too many messages. Please wait a few minutes and try again." }, 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "We could not read that message." }, 400);
  }
  if (text(body.company)) return json({ ok: true });

  const message = {
    name: text(body.name, 100),
    email: text(body.email, 120).toLowerCase(),
    phone: body.phone ? normalisePhone(body.phone) : "",
    topic: TOPICS.includes(body.topic) ? body.topic : "General enquiry",
    message: text(body.message, 4000),
  };

  const errors = {};
  if (!message.name) errors.name = "Tell us your name.";
  if (!isEmail(message.email)) errors.email = "Enter a valid email so we can reply.";
  if (message.phone === null) errors.phone = "That phone number doesn't look right.";
  if (message.message.length < 10) errors.message = "Write a little more so we can help.";
  if (Object.keys(errors).length) return json({ error: "Please check the highlighted fields.", errors }, 422);

  const stored = await save("messages", message);
  if (!stored) return json({ error: "We couldn't send your message just now. Please try again shortly." }, 503);
  return json({ ok: true });
}
