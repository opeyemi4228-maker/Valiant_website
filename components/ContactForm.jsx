"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Field, Honeypot, Input, postJson, Select, SubmitButton, Textarea } from "@/components/form";

const TOPICS = ["General enquiry", "Membership", "Partnership", "Media & press", "Volunteering", "Other"];
const EMPTY = { name: "", email: "", phone: "", topic: "General enquiry", message: "", company: "" };

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const bind = (key) => ({
    value: values[key],
    onChange: (e) => setValues((v) => ({ ...v, [key]: e.target.value })),
    error: errors[key],
  });

  const submit = async (event) => {
    event.preventDefault();
    const e = {};
    if (!values.name.trim()) e.name = "Tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) e.email = "Enter a valid email so we can reply.";
    if (values.message.trim().length < 10) e.message = "Write a little more so we can help.";
    setErrors(e);
    if (Object.keys(e).length) return;

    setBusy(true);
    setFormError("");
    const { ok, data } = await postJson("/api/contact", values);
    setBusy(false);
    if (ok) return setSent(true);
    setFormError(data.error || "Something went wrong. Please try again.");
    if (data.errors) setErrors(data.errors);
  };

  if (sent) {
    return (
      <div className="rounded-[2rem] bg-ink p-8 text-white sm:p-12">
        <span className="grid size-14 place-items-center rounded-full bg-ember text-ink">
          <Check className="size-7" strokeWidth={3} />
        </span>
        <h2 className="mt-6 text-3xl font-extrabold">Message sent.</h2>
        <p className="mt-3 text-lg text-white/75">Thank you, {values.name.split(" ")[0]}. Our team will get back to you as soon as we can.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative grid gap-6 rounded-[2rem] bg-white p-6 ring-1 ring-line sm:grid-cols-2 sm:p-10">
      <Honeypot value={values.company} onChange={(v) => setValues((s) => ({ ...s, company: v }))} />
      {formError && (
        <p role="alert" className="rounded-2xl bg-flame/10 px-5 py-4 font-semibold text-flame sm:col-span-2">
          {formError}
        </p>
      )}
      <Field label="Your name" required error={errors.name}>
        {(a) => <Input {...a} {...bind("name")} autoComplete="name" />}
      </Field>
      <Field label="Email" required error={errors.email}>
        {(a) => <Input {...a} {...bind("email")} type="email" autoComplete="email" />}
      </Field>
      <Field label="Phone" optional error={errors.phone}>
        {(a) => <Input {...a} {...bind("phone")} type="tel" inputMode="tel" autoComplete="tel" />}
      </Field>
      <Field label="Topic">
        {(a) => <Select {...a} {...bind("topic")} options={TOPICS} />}
      </Field>
      <Field label="Message" required error={errors.message} className="sm:col-span-2">
        {(a) => <Textarea {...a} {...bind("message")} rows={6} />}
      </Field>
      <div className="sm:col-span-2">
        <SubmitButton busy={busy}>{busy ? "Sending…" : "Send message"}</SubmitButton>
      </div>
    </form>
  );
}
