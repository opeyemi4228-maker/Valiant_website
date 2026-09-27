import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

const variants = {
  ember:
    "bg-ember text-ink shadow-[0_10px_40px_-10px_rgba(247,148,29,0.75)] [&>.fill]:bg-gold",
  ink: "bg-ink text-white [&>.fill]:bg-maroon",
  light: "bg-white text-ink [&>.fill]:bg-sand",
  ghost: "text-white ring-1 ring-inset ring-white/30 hover:ring-white/60 [&>.fill]:bg-white/10",
  "ghost-dark": "text-ink ring-1 ring-inset ring-ink/20 hover:ring-ink/50 [&>.fill]:bg-ink/5",
};

/** The one button of the site: a pill whose fill sweeps in on hover. */
export function Button({ href, children, variant = "ember", size = "md", external, icon = true, className }) {
  const classes = clsx(
    "group relative inline-flex shrink-0 items-center whitespace-nowrap justify-center gap-2.5 overflow-hidden rounded-full font-extrabold transition-transform duration-300 hover:-translate-y-0.5",
    size === "lg" ? "px-8 py-[18px] text-base sm:text-lg" : "px-6 py-3.5 text-[15px]",
    variants[variant],
    className
  );
  const inner = (
    <>
      <span className="fill absolute inset-0 -translate-x-[101%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
      <span className="relative">{children}</span>
      {icon && (
        <ArrowUpRight className="relative size-[1.15em] transition-transform duration-300 group-hover:rotate-45" />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/** Small uppercase label with a leading rule, above every section heading. */
export function Kicker({ children, className, tone = "ember" }) {
  return (
    <p
      className={clsx(
        "eyebrow flex items-center gap-3",
        tone === "ember" ? "text-ember" : tone === "rust" ? "text-rust" : "text-white/70",
        className
      )}
    >
      <span className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

/** The eagle-and-sun glyph, drawn as a simple mark for separators. */
export function Spark({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 0l2.6 8.4L24 12l-9.4 3.6L12 24l-2.6-8.4L0 12l9.4-3.6z" />
    </svg>
  );
}

export function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  );
}

export function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" />
    </svg>
  );
}

export function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.5 13.5 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.8a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zM20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.2 24l6.4-1.7A11.8 11.8 0 0 0 24 12a11.7 11.7 0 0 0-3.5-8.5z" />
    </svg>
  );
}
