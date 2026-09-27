"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, Eye, EyeOff, Lock } from "lucide-react";
import clsx from "clsx";
import { stateNames } from "@/lib/geography";
import { useGeography } from "@/lib/useGeography";
import { site } from "@/lib/site";
import { Checkbox, Field, Honeypot, Input, postJson, Select, SubmitButton } from "@/components/form";
import { WhatsappIcon } from "@/components/ui";

const EMPTY = { nin: "", phone: "", state: "", lga: "", ward: "", pollingUnitCode: "", consent: false, company: "" };

function validate(v, unitsAvailable) {
  const e = {};
  if (v.nin.length !== 11) e.nin = "Your NIN is the 11 digits on your NIN slip or card.";
  else if (/^(\d)\1{10}$/.test(v.nin)) e.nin = "That doesn't look like a real NIN.";
  if (v.phone.replace(/[^\d]/g, "").length < 10) e.phone = "Enter a valid phone number, e.g. 0803 123 4567.";
  if (!v.state) e.state = "Select your state.";
  if (!v.lga) e.lga = "Select your local government area.";
  if (!v.ward) e.ward = "Select your ward.";
  if (unitsAvailable && !v.pollingUnitCode) e.pollingUnitCode = "Select your polling unit.";
  if (!v.consent) e.consent = "Please affirm the Pledge and consent to continue.";
  return e;
}

/** Eleven segments that fill as the NIN is typed. */
function NinMeter({ length }) {
  return (
    <div className="mt-3 flex items-center gap-3" aria-hidden>
      <div className="grid flex-1 grid-cols-11 gap-1">
        {Array.from({ length: 11 }, (_, i) => (
          <span
            key={i}
            className={clsx(
              "h-1.5 rounded-full transition-colors duration-200",
              i < length ? (length === 11 ? "bg-emerald-500" : "bg-ember") : "bg-sand"
            )}
          />
        ))}
      </div>
      <span className={clsx("w-14 text-right text-xs font-bold tabular-nums", length === 11 ? "text-emerald-600" : "text-stone")}>
        {length === 11 ? "Complete" : `${length} of 11`}
      </span>
    </div>
  );
}

export default function QuickJoinForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);
  const [showNin, setShowNin] = useState(false);
  const top = useRef(null);

  const geo = useGeography(values.state, values.lga, values.ward);
  const unit = useMemo(() => geo.units.find((u) => u.value === values.pollingUnitCode), [geo.units, values.pollingUnitCode]);
  // INEC lists no polling units for a handful of wards; only then may the member skip it.
  const unitsAvailable = !(values.ward && !geo.unitsLoading && !geo.units.length);

  const set = (key) => (value) => {
    // A field's message goes as soon as the member changes it.
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
    setValues((v) => {
      const next = { ...v, [key]: value };
      if (key === "state") Object.assign(next, { lga: "", ward: "", pollingUnitCode: "" });
      if (key === "lga") Object.assign(next, { ward: "", pollingUnitCode: "" });
      if (key === "ward") next.pollingUnitCode = "";
      return next;
    });
  };
  const bind = (key) => ({ value: values[key], onChange: (e) => set(key)(e.target.value), error: errors[key] });

  const submit = async (event) => {
    event.preventDefault();
    const e = validate(values, unitsAvailable);
    setErrors(e);
    if (Object.keys(e).length) {
      top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setBusy(true);
    setFormError("");
    const { ok, data } = await postJson("/api/join/nin", {
      ...values,
      wardCode: geo.wardCode ?? "",
      pollingUnit: unit?.label ?? "",
      unitsAvailable,
    });
    setBusy(false);
    if (ok) {
      setDone(data);
      top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setFormError(data.error || "Something went wrong. Please try again.");
    if (data.errors) setErrors(data.errors);
  };

  if (done) {
    return (
      <div ref={top} className="scroll-mt-28 rounded-[2rem] bg-ink p-8 text-white sm:p-12">
        <span className="grid size-16 place-items-center rounded-full bg-ember text-ink">
          <Check className="size-8" strokeWidth={3} />
        </span>
        <h2 className="display mt-8 text-[clamp(2.22rem,5.18vw,4.07rem)]">
          Welcome.
          <br />
          <span className="text-ember">You are a Valiant.</span>
        </h2>
        <p className="mt-6 max-w-lg text-lg text-white/75">
          Your registration has been received. Your reference is{" "}
          <strong className="font-mono text-ember">{done.reference}</strong>. Your chapter will reach you on{" "}
          {values.phone} for orientation.
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
    <form
      ref={top}
      onSubmit={submit}
      noValidate
      className="relative scroll-mt-28 rounded-[2rem] bg-white p-6 shadow-[0_40px_120px_-50px_rgba(63,13,0,0.35)] ring-1 ring-line sm:p-10"
    >
      <Honeypot value={values.company} onChange={set("company")} />

      {formError && (
        <p role="alert" className="mb-8 rounded-2xl bg-flame/10 px-5 py-4 font-semibold text-flame">
          {formError}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="National Identification Number (NIN)" required error={errors.nin} className="sm:col-span-2">
          {(a) => (
            <div>
              <div className="relative">
                <Input
                  {...a}
                  value={values.nin}
                  onChange={(e) => set("nin")(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  error={errors.nin}
                  type={showNin ? "text" : "password"}
                  inputMode="numeric"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="11 digits"
                  className="pr-14 text-lg font-bold tracking-[0.3em] placeholder:font-normal placeholder:tracking-normal"
                />
                <button
                  type="button"
                  onClick={() => setShowNin((s) => !s)}
                  aria-label={showNin ? "Hide NIN" : "Show NIN"}
                  aria-pressed={showNin}
                  className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-xl text-stone transition-colors hover:bg-sand hover:text-ink"
                >
                  {showNin ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
              <NinMeter length={values.nin.length} />
              {!errors.nin && (
                <p className="mt-2 text-sm text-stone">
                  Can&apos;t find it? Dial <strong className="text-ink">*346#</strong> from the phone number linked to your NIN.
                </p>
              )}
            </div>
          )}
        </Field>

        <Field label="Phone number" required error={errors.phone} hint="WhatsApp number preferred." className="sm:col-span-2">
          {(a) => <Input {...a} {...bind("phone")} type="tel" inputMode="tel" placeholder="0803 123 4567" autoComplete="tel" />}
        </Field>

        <div className="relative my-2 flex items-center gap-4 sm:col-span-2">
          <span className="eyebrow text-rust">Where you vote</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <Field label="State" required error={errors.state}>
          {(a) => <Select {...a} {...bind("state")} options={stateNames} placeholder="Select state" />}
        </Field>
        <Field
          label="Local government area"
          required
          error={errors.lga || (geo.error ? "Couldn't load LGAs. Check your connection and reselect the state." : undefined)}
        >
          {(a) => (
            <Select
              {...a}
              {...bind("lga")}
              options={geo.lgas}
              placeholder={values.state ? "Select LGA" : "Choose a state first"}
              disabled={!values.state || geo.loading}
              loading={geo.loading}
            />
          )}
        </Field>
        <Field label="Ward" required error={errors.ward}>
          {(a) => (
            <Select {...a} {...bind("ward")} options={geo.wards} placeholder={values.lga ? "Select ward" : "Choose an LGA first"} disabled={!values.lga} />
          )}
        </Field>
        <Field
          label="Polling unit"
          required={unitsAvailable}
          optional={!unitsAvailable}
          error={errors.pollingUnitCode}
          hint={!unitsAvailable ? "INEC lists no polling units for this ward. You can add yours at orientation." : undefined}
        >
          {(a) => (
            <Select
              {...a}
              value={values.pollingUnitCode}
              onChange={(e) => set("pollingUnitCode")(e.target.value)}
              error={errors.pollingUnitCode}
              options={geo.units}
              placeholder={values.ward ? "Select polling unit" : "Choose a ward first"}
              disabled={!values.ward || geo.unitsLoading || !unitsAvailable}
              loading={Boolean(values.ward) && geo.unitsLoading}
            />
          )}
        </Field>

        <div className="sm:col-span-2">
          <Checkbox checked={values.consent} onChange={set("consent")} error={errors.consent}>
            I affirm the{" "}
            <Link href="/pledge" target="_blank" className="font-bold underline decoration-ember underline-offset-2">
              Valiant Pledge
            </Link>{" "}
            and consent to the Movement using my NIN and phone number to register and verify my membership.
          </Checkbox>
          {errors.consent && <p className="mt-2 text-sm font-semibold text-flame">{errors.consent}</p>}
        </div>
      </div>

      <div className="mt-10 flex flex-col-reverse items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
        <p className="flex max-w-xs items-start gap-2 text-sm text-stone">
          <Lock className="mt-0.5 size-4 shrink-0 text-rust" />
          Your NIN is never stored as typed. We keep a secure fingerprint and the last four digits only.
        </p>
        <SubmitButton busy={busy}>{busy ? "Registering…" : "Register with NIN"}</SubmitButton>
      </div>
    </form>
  );
}
