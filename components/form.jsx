"use client";

import { useId } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import clsx from "clsx";

const control =
  "w-full rounded-2xl border bg-white px-4 py-3.5 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-stone/60 focus:border-ember focus:ring-4 focus:ring-ember/15 disabled:cursor-not-allowed disabled:bg-sand/50 disabled:text-stone";

/** Label, control, hint and error, wired together for screen readers. */
export function Field({ label, hint, error, required, optional, className, children }) {
  const id = useId();
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-sm font-bold text-ink">
        <span>
          {label}
          {required && <span className="text-flame"> *</span>}
        </span>
        {optional && <span className="text-xs font-medium text-stone">Optional</span>}
      </label>
      {children({ id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-stone">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-semibold text-flame">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ error, className, ...props }) {
  return (
    <input
      {...props}
      className={clsx(control, error ? "border-flame" : "border-line", className)}
    />
  );
}

export function Textarea({ error, className, ...props }) {
  return (
    <textarea
      rows={5}
      {...props}
      className={clsx(control, "resize-y", error ? "border-flame" : "border-line", className)}
    />
  );
}

export function Select({ error, className, placeholder = "Select…", options, loading, ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className={clsx(control, "appearance-none pr-11", error ? "border-flame" : "border-line", !props.value && "text-stone/70", className)}
      >
        <option value="">{loading ? "Loading…" : placeholder}</option>
        {options.map((o) =>
          typeof o === "string" ? (
            <option key={o} value={o}>
              {o}
            </option>
          ) : (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )
        )}
      </select>
      {loading ? (
        <Loader2 className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 animate-spin text-stone" />
      ) : (
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-stone" />
      )}
    </div>
  );
}

/** A pill-shaped choice group, used where there are only a few options. */
export function Choices({ name, options, value, onChange, error }) {
  return (
    <div role="radiogroup" className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label
          key={o}
          className={clsx(
            "cursor-pointer rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ember/25",
            value === o ? "border-ink bg-ink text-white" : error ? "border-flame bg-white" : "border-line bg-white hover:border-ink/40"
          )}
        >
          <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="sr-only" />
          {o}
        </label>
      ))}
    </div>
  );
}

export function Checkbox({ checked, onChange, children, error }) {
  return (
    <label
      className={clsx(
        "flex cursor-pointer items-start gap-3 rounded-2xl border bg-white p-4 transition-colors",
        checked ? "border-ember bg-ember/5" : error ? "border-flame" : "border-line hover:border-ink/30"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-5 shrink-0 accent-[#f7941d]"
      />
      <span className="text-[15px] leading-relaxed">{children}</span>
    </label>
  );
}

/** Invisible to people, irresistible to bots. */
export function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Company
        <input tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

export function SubmitButton({ busy, children, className }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full bg-ember px-8 py-4 text-base font-extrabold text-ink shadow-[0_10px_40px_-10px_rgba(247,148,29,0.75)] transition-all hover:-translate-y-0.5 hover:bg-gold disabled:translate-y-0 disabled:opacity-60",
        className
      )}
    >
      {busy && <Loader2 className="size-5 animate-spin" />}
      {children}
    </button>
  );
}

/** POSTs JSON and returns `{ ok, data }` without throwing. */
export async function postJson(url, payload) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
  } catch {
    return { ok: false, data: { error: "You appear to be offline. Check your connection and try again." } };
  }
}
