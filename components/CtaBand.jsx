import { Button } from "@/components/ui";
import { Reveal } from "@/components/motion";

/** The closing invitation on inner pages. */
export default function CtaBand({ title = "Ready to stand", accent = "with us?", body }) {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="grain relative overflow-hidden rounded-[2.5rem] bg-ember px-8 py-14 text-ink sm:px-14 sm:py-20">
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="display text-[clamp(2.22rem,5.18vw,4.81rem)]">
                {title} <span className="text-maroon">{accent}</span>
              </h2>
              {body && <p className="mt-5 max-w-xl text-lg text-ink/80">{body}</p>}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/join" variant="ink" size="lg">
                Join Us
              </Button>
              <Button href="/donate" variant="light" size="lg">
                Donate
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
