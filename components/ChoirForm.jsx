"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import clsx from "clsx";
import { anambraLgas, consents, heardFrom, MAX_AGE, officialSongs, supervisorRoles } from "@/lib/choir";
import { Checkbox, Field, Honeypot, Input, postJson, Select, SubmitButton, Textarea } from "@/components/form";

const STEPS = [
  { title: "Choir", fields: ["choirName", "church", "lga", "members", "oldest"] },
  { title: "Supervisor", fields: ["supervisorName", "supervisorRole", "supervisorPhone", "supervisorEmail"] },
  { title: "Performance", fields: ["song", "videoUrl", "liveConfirmed"] },
  { title: "Declarations", fields: ["consents"] },
];

const EMPTY = {
  choirName: "",
  church: "",
  denomination: "",
  lga: "",
  town: "",
  yearEstablished: "",
  members: "",
  maleMembers: "",
  femaleMembers: "",
  youngest: "",
  oldest: "",
  supervisorName: "",
  supervisorRole: "",
  supervisorPhone: "",
  supervisorEmail: "",
  song: "",
  whySong: "",
  videoUrl: "",
  liveConfirmed: false,
  consents: [],
  previousCompetition: "",
  heardFrom: "",
  company: "",
};

function validate(step, v) {
  const e = {};
  if (step === 0) {
    if (!v.choirName.trim()) e.choirName = "Enter the choir's name.";
    if (!v.church.trim()) e.church = "Enter the church or ministry.";
    if (!v.lga) e.lga = "Select the local government area.";
    if (!(Number(v.members) > 0)) e.members = "How many members does the choir have?";
    if (v.oldest && Number(v.oldest) > MAX_AGE) e.oldest = `All members must be ${MAX_AGE} or younger.`;
  }
  if (step === 1) {
    if (!v.supervisorName.trim()) e.supervisorName = "Enter the supervising adult's name.";
    if (!v.supervisorRole) e.supervisorRole = "Select their role.";
    if (v.supervisorPhone.replace(/\D/g, "").length < 10) e.supervisorPhone = "Enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.supervisorEmail)) e.supervisorEmail = "Enter a valid email address.";
  }
  if (step === 2) {
    if (!v.song) e.song = "Choose one of the official songs.";
    if (!/^https?:\/\/\S+\.\S+/.test(v.videoUrl)) e.videoUrl = "Paste the public link to your audition video.";
    if (!v.liveConfirmed) e.liveConfirmed = "Confirm this is a live performance.";
  }
  if (step === 3 && v.consents.length !== consents.length) e.consents = "All declarations must be accepted.";
  return e;
}

export default function ChoirForm() {
  const [values, setValues] = useState(EMPTY);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);
  const top = useRef(null);

  const set = (key) => (value) => setValues((v) => ({ ...v, [key]: value }));
  const bind = (key) => ({ value: values[key], onChange: (e) => set(key)(e.target.value), error: errors[key] });
  const toggleConsent = (c) => (on) =>
    setValues((v) => ({ ...v, consents: on ? [...v.consents, c] : v.consents.filter((x) => x !== c) }));
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
    const { ok, data } = await postJson("/api/choir", values);
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
          Registration <span className="text-ember">received.</span>
        </h2>
        <p className="mt-6 max-w-lg text-lg text-white/75">
          Thank you. Your reference is <strong className="font-mono text-ember">{done.reference}</strong>. The organisers will
          review your audition and contact the supervising adult with next steps.
        </p>
      </div>
    );
  }

  return (
    <form ref={top} onSubmit={submit} noValidate className="relative scroll-mt-28 rounded-[2rem] bg-white p-6 shadow-[0_40px_120px_-50px_rgba(63,13,0,0.35)] ring-1 ring-line sm:p-10">
      <Honeypot value={values.company} onChange={set("company")} />

      <ol className="grid grid-cols-4 gap-2 sm:gap-3">
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
            <p className={clsx("mt-2.5 truncate text-[11px] font-bold uppercase tracking-[0.12em] sm:text-xs", i === step ? "text-ink" : "text-stone/70")}>
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
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Choir name" required error={errors.choirName}>
                {(a) => <Input {...a} {...bind("choirName")} />}
              </Field>
              <Field label="Church / ministry" required error={errors.church}>
                {(a) => <Input {...a} {...bind("church")} />}
              </Field>
              <Field label="Denomination" optional>
                {(a) => <Input {...a} {...bind("denomination")} />}
              </Field>
              <Field label="Local government area" required error={errors.lga}>
                {(a) => <Select {...a} {...bind("lga")} options={anambraLgas} placeholder="Select LGA" />}
              </Field>
              <Field label="Town / community" optional>
                {(a) => <Input {...a} {...bind("town")} />}
              </Field>
              <Field label="Year established" optional>
                {(a) => <Input {...a} {...bind("yearEstablished")} type="number" inputMode="numeric" min="1900" max={new Date().getFullYear()} />}
              </Field>
              <div className="grid grid-cols-3 gap-4 sm:col-span-2">
                <Field label="Members" required error={errors.members}>
                  {(a) => <Input {...a} {...bind("members")} type="number" inputMode="numeric" min="1" />}
                </Field>
                <Field label="Male">
                  {(a) => <Input {...a} {...bind("maleMembers")} type="number" inputMode="numeric" min="0" />}
                </Field>
                <Field label="Female">
                  {(a) => <Input {...a} {...bind("femaleMembers")} type="number" inputMode="numeric" min="0" />}
                </Field>
              </div>
              <Field label="Youngest member's age" optional>
                {(a) => <Input {...a} {...bind("youngest")} type="number" inputMode="numeric" min="1" max={MAX_AGE} />}
              </Field>
              <Field label="Oldest member's age" optional error={errors.oldest} hint={`Must be ${MAX_AGE} or below.`}>
                {(a) => <Input {...a} {...bind("oldest")} type="number" inputMode="numeric" min="1" max={MAX_AGE} />}
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-6 sm:grid-cols-2">
              <p className="rounded-2xl bg-cream p-4 text-sm text-stone sm:col-span-2">
                The supervising adult must be a Youth Pastor, Choir Director or Church Leader.
              </p>
              <Field label="Full name" required error={errors.supervisorName}>
                {(a) => <Input {...a} {...bind("supervisorName")} autoComplete="name" />}
              </Field>
              <Field label="Role in church" required error={errors.supervisorRole}>
                {(a) => <Select {...a} {...bind("supervisorRole")} options={supervisorRoles} />}
              </Field>
              <Field label="Phone number" required error={errors.supervisorPhone}>
                {(a) => <Input {...a} {...bind("supervisorPhone")} type="tel" inputMode="tel" placeholder="0803 123 4567" autoComplete="tel" />}
              </Field>
              <Field label="Email" required error={errors.supervisorEmail}>
                {(a) => <Input {...a} {...bind("supervisorEmail")} type="email" autoComplete="email" />}
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-6">
              <Field label="Official song" required error={errors.song}>
                {(a) => <Select {...a} {...bind("song")} options={officialSongs} placeholder="Select a song" />}
              </Field>
              <Field label="Why did you choose this song?" optional>
                {(a) => <Textarea {...a} {...bind("whySong")} rows={3} />}
              </Field>
              <Field
                label="Audition video link"
                required
                error={errors.videoUrl}
                hint="Upload to Google Drive, Dropbox or WeTransfer and set access to “Anyone with the link can view”."
              >
                {(a) => <Input {...a} {...bind("videoUrl")} type="url" placeholder="https://" />}
              </Field>
              <Checkbox checked={values.liveConfirmed} onChange={set("liveConfirmed")} error={errors.liveConfirmed}>
                I confirm this is a live performance by our choir and not an edited studio recording.
              </Checkbox>
              {errors.liveConfirmed && <p className="-mt-3 text-sm font-semibold text-flame">{errors.liveConfirmed}</p>}
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-3">
              <p className="mb-2 font-bold">We confirm that:</p>
              {consents.map((c) => (
                <Checkbox key={c} checked={values.consents.includes(c)} onChange={toggleConsent(c)} error={errors.consents && !values.consents.includes(c)}>
                  {c}
                </Checkbox>
              ))}
              {errors.consents && <p className="text-sm font-semibold text-flame">{errors.consents}</p>}
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Field label="Previous competitions or achievements" optional>
                  {(a) => <Input {...a} {...bind("previousCompetition")} />}
                </Field>
                <Field label="How did you hear about us?" optional>
                  {(a) => <Select {...a} {...bind("heardFrom")} options={heardFrom} />}
                </Field>
              </div>
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
          <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-extrabold text-white transition-transform hover:-translate-y-0.5">
            Continue <ArrowRight className="size-4" />
          </button>
        ) : (
          <SubmitButton busy={busy}>{busy ? "Submitting…" : "Submit registration"}</SubmitButton>
        )}
      </div>
    </form>
  );
}
