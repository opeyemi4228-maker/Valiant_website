"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import clsx from "clsx";
import { stateNames } from "@/lib/geography";
import { useGeography } from "@/lib/useGeography";
import { membershipCategories, site } from "@/lib/site";
import { Checkbox, Choices, Field, Honeypot, Input, postJson, Select, SubmitButton } from "@/components/form";
import { WhatsappIcon } from "@/components/ui";

const TITLES = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof", "Chief", "Engr", "Barr", "Rev", "Hon"];

const STEPS = [
  { title: "About you", fields: ["firstName", "lastName", "gender", "dateOfBirth", "phone", "email"] },
  { title: "Where you vote", fields: ["category", "state", "lga", "ward"] },
  { title: "Your pledge", fields: ["pledge"] },
];

const EMPTY = {
  title: "",
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  occupation: "",
  category: "Regular Members",
  state: "",
  lga: "",
  ward: "",
  pollingUnitCode: "",
  pledge: false,
  company: "",
};

const pledge = [
  "I pledge to stand for truth, courage, discipline, service, and justice.",
  "I shall uphold integrity in private and public life.",
  "I shall reject corruption, violence, hatred, and selfish leadership.",
  "I shall live not only for myself, but for future generations.",
];

function latestBirthday() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  return d.toISOString().slice(0, 10);
}

function validate(step, v) {
  const e = {};
  if (step === 0) {
    if (!v.firstName.trim()) e.firstName = "Enter your first name.";
    if (!v.lastName.trim()) e.lastName = "Enter your last name.";
    if (!v.gender) e.gender = "Select your gender.";
    if (!v.dateOfBirth) e.dateOfBirth = "Enter your date of birth.";
    else if (v.dateOfBirth > latestBirthday()) e.dateOfBirth = "Members must be at least 18 years old.";
    const digits = v.phone.replace(/[^\d+]/g, "");
    if (digits.replace("+", "").length < 10) e.phone = "Enter a valid phone number, e.g. 0803 123 4567.";
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = "That email address doesn't look right.";
  }
  if (step === 1) {
    if (!v.category) e.category = "Choose a membership category.";
    if (!v.state) e.state = "Select your state.";
    if (!v.lga) e.lga = "Select your local government area.";
    if (!v.ward) e.ward = "Select your ward.";
  }
  if (step === 2 && !v.pledge) e.pledge = "Please affirm the Valiant Pledge to join.";
  return e;
}

export default function JoinForm() {
  const [values, setValues] = useState(EMPTY);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);
  const top = useRef(null);

  const geo = useGeography(values.state, values.lga, values.ward);
  const unit = useMemo(() => geo.units.find((u) => u.value === values.pollingUnitCode), [geo.units, values.pollingUnitCode]);

  const set = (key) => (value) => {
    // A field's message goes as soon as the member changes it.
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
    setValues((v) => {
      const next = { ...v, [key]: value };
      // Changing a place clears everything beneath it.
      if (key === "state") Object.assign(next, { lga: "", ward: "", pollingUnitCode: "" });
      if (key === "lga") Object.assign(next, { ward: "", pollingUnitCode: "" });
      if (key === "ward") next.pollingUnitCode = "";
      return next;
    });
  };
  const bind = (key) => ({
    value: values[key],
    onChange: (e) => set(key)(e.target.value),
    error: errors[key],
  });

  const scrollTop = () => top.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const next = () => {
    const e = validate(step, values);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStep((s) => s + 1);
    scrollTop();
  };

  const submit = async (event) => {
    event.preventDefault();
    if (step < STEPS.length - 1) return next();
    const e = validate(step, values);
    setErrors(e);
    if (Object.keys(e).length) return;

    setBusy(true);
    setFormError("");
    const { ok, data } = await postJson("/api/join", {
      ...values,
      wardCode: geo.wardCode ?? "",
      pollingUnit: unit?.label ?? "",
    });
    setBusy(false);

    if (ok) {
      setDone(data);
      scrollTop();
      return;
    }
    setFormError(data.error || "Something went wrong. Please try again.");
    if (data.errors) {
      setErrors(data.errors);
      const first = STEPS.findIndex((s) => s.fields.some((f) => data.errors[f]));
      if (first >= 0) setStep(first);
    }
  };

  if (done) {
    return (
      <div ref={top} className="scroll-mt-28 rounded-[2rem] bg-ink p-8 text-white sm:p-12">
        <span className="grid size-16 place-items-center rounded-full bg-ember text-ink">
          <Check className="size-8" strokeWidth={3} />
        </span>
        <h2 className="display mt-8 text-[clamp(2.22rem,5.18vw,4.07rem)]">
          Welcome, {done.firstName}.<br />
          <span className="text-ember">You are a Valiant.</span>
        </h2>
        <p className="mt-6 max-w-lg text-lg text-white/75">
          Your registration has been received. Your reference is{" "}
          <strong className="font-mono text-ember">{done.reference}</strong>. Keep it for your orientation
          and induction.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={site.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-4 font-extrabold text-ink transition-transform hover:-translate-y-0.5"
          >
            <WhatsappIcon className="size-5" /> Join the WhatsApp community
          </a>
          <Link href="/pledge" className="inline-flex items-center gap-2 rounded-full px-7 py-4 font-bold ring-1 ring-white/25 hover:bg-white/10">
            Read the Declaration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form ref={top} onSubmit={submit} noValidate className="relative scroll-mt-28 rounded-[2rem] bg-white p-6 shadow-[0_40px_120px_-50px_rgba(63,13,0,0.35)] ring-1 ring-line sm:p-10">
      <Honeypot value={values.company} onChange={set("company")} />

      <ol className="grid grid-cols-3 gap-2 sm:gap-3">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <div className="h-1.5 overflow-hidden rounded-full bg-sand">
              <motion.div
                initial={false}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-ember"
              />
            </div>
            <p className={clsx("mt-2.5 text-xs font-bold uppercase tracking-[0.14em] sm:text-[13px]", i === step ? "text-ink" : "text-stone/70")}>
              <span className="hidden sm:inline">Step {i + 1} · </span>
              {s.title}
            </p>
          </li>
        ))}
      </ol>

      {formError && (
        <p role="alert" className="mt-8 rounded-2xl bg-flame/10 px-5 py-4 font-semibold text-flame">
          {formError}
        </p>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          {step === 0 && (
            <div className="grid gap-6 sm:grid-cols-6">
              <Field label="Title" optional className="sm:col-span-2">
                {(a) => <Select {...a} {...bind("title")} options={TITLES} placeholder="Select" />}
              </Field>
              <Field label="First name" required error={errors.firstName} className="sm:col-span-4">
                {(a) => <Input {...a} {...bind("firstName")} autoComplete="given-name" />}
              </Field>
              <Field label="Middle name" optional className="sm:col-span-3">
                {(a) => <Input {...a} {...bind("middleName")} autoComplete="additional-name" />}
              </Field>
              <Field label="Last name" required error={errors.lastName} className="sm:col-span-3">
                {(a) => <Input {...a} {...bind("lastName")} autoComplete="family-name" />}
              </Field>
              <Field label="Gender" required error={errors.gender} className="sm:col-span-3">
                {() => <Choices name="gender" options={["Male", "Female"]} value={values.gender} onChange={set("gender")} error={errors.gender} />}
              </Field>
              <Field label="Date of birth" required error={errors.dateOfBirth} className="sm:col-span-3">
                {(a) => <Input {...a} {...bind("dateOfBirth")} type="date" max={latestBirthday()} autoComplete="bday" />}
              </Field>
              <Field label="Phone number" required error={errors.phone} hint="WhatsApp number preferred." className="sm:col-span-3">
                {(a) => <Input {...a} {...bind("phone")} type="tel" inputMode="tel" placeholder="0803 123 4567" autoComplete="tel" />}
              </Field>
              <Field label="Email" optional error={errors.email} className="sm:col-span-3">
                {(a) => <Input {...a} {...bind("email")} type="email" placeholder="you@example.com" autoComplete="email" />}
              </Field>
              <Field label="Occupation" optional className="sm:col-span-6">
                {(a) => <Input {...a} {...bind("occupation")} placeholder="e.g. Teacher, Trader, Student" />}
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Membership category" required error={errors.category} className="sm:col-span-2">
                {(a) => <Select {...a} {...bind("category")} options={membershipCategories} />}
              </Field>
              <Field
                label="State"
                required
                error={errors.state}
                hint={values.category === "Diaspora Members" ? "Choose your state of origin." : "Where you are registered to vote."}
              >
                {(a) => <Select {...a} {...bind("state")} options={stateNames} placeholder="Select state" />}
              </Field>
              <Field label="Local government area" required error={errors.lga || (geo.error ? "Couldn't load LGAs. Check your connection and reselect the state." : undefined)}>
                {(a) => (
                  <Select {...a} {...bind("lga")} options={geo.lgas} placeholder={values.state ? "Select LGA" : "Choose a state first"} disabled={!values.state || geo.loading} loading={geo.loading} />
                )}
              </Field>
              <Field label="Ward" required error={errors.ward}>
                {(a) => <Select {...a} {...bind("ward")} options={geo.wards} placeholder={values.lga ? "Select ward" : "Choose an LGA first"} disabled={!values.lga} />}
              </Field>
              <Field label="Polling unit" optional hint={values.ward && !geo.unitsLoading && !geo.units.length ? "Polling units unavailable. You can add yours at orientation." : undefined}>
                {(a) => (
                  <Select
                    {...a}
                    value={values.pollingUnitCode}
                    onChange={(e) => set("pollingUnitCode")(e.target.value)}
                    options={geo.units}
                    placeholder={values.ward ? "Select polling unit" : "Choose a ward first"}
                    disabled={!values.ward || geo.unitsLoading}
                    loading={Boolean(values.ward) && geo.unitsLoading}
                  />
                )}
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-6">
              <div className="rounded-3xl bg-ink p-7 text-white sm:p-9">
                <p className="eyebrow text-ember">The Valiant Pledge</p>
                <div className="mt-5 space-y-2.5 font-serif text-lg italic leading-snug text-white/90 sm:text-xl">
                  {pledge.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <Link href="/pledge" target="_blank" className="mt-5 inline-block text-sm font-bold text-ember hover:underline">
                  Read the full Declaration, Pledge &amp; Oath
                </Link>
              </div>

              <dl className="grid gap-x-6 gap-y-3 rounded-3xl bg-cream p-6 text-sm sm:grid-cols-2">
                {[
                  ["Name", [values.title, values.firstName, values.middleName, values.lastName].filter(Boolean).join(" ")],
                  ["Phone", values.phone],
                  ["Category", values.category],
                  ["Location", [values.ward, values.lga, values.state].filter(Boolean).join(", ")],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-bold text-stone">{k}</dt>
                    <dd className="mt-0.5 font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>

              <Checkbox checked={values.pledge} onChange={set("pledge")} error={errors.pledge}>
                I affirm the Valiant Pledge and agree to uphold the{" "}
                <Link href="/ethics" target="_blank" className="font-bold underline decoration-ember underline-offset-2">
                  Code of Ethics &amp; Conduct
                </Link>
                . I consent to the Movement keeping my details to manage my membership.
              </Checkbox>
              {errors.pledge && <p className="-mt-3 text-sm font-semibold text-flame">{errors.pledge}</p>}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex flex-wrap-reverse items-center justify-between gap-4 border-t border-line pt-8">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setStep((s) => s - 1);
              setErrors({});
            }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold text-stone hover:bg-sand hover:text-ink"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-extrabold text-white transition-transform hover:-translate-y-0.5"
          >
            Continue <ArrowRight className="size-4" />
          </button>
        ) : (
          <SubmitButton busy={busy}>{busy ? "Registering…" : "Complete registration"}</SubmitButton>
        )}
      </div>
    </form>
  );
}
