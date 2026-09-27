import { Spark } from "@/components/ui";
import { values } from "@/lib/site";

/** The eight core values running across the page like a banner at a rally. */
export default function ValuesMarquee() {
  const row = [...values, ...values];
  return (
    <section aria-label="Our core values" className="relative z-10 -mt-px overflow-hidden bg-ember py-5 text-ink sm:py-6">
      <div className="flex w-max animate-marquee [--marquee-duration:38s] hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {row.map((value, i) => (
              <li key={`${value}-${i}`} className="flex items-center">
                <span className="display px-6 text-4xl sm:px-8 sm:text-5xl">{value}</span>
                <Spark className="size-6 text-maroon sm:size-7" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
