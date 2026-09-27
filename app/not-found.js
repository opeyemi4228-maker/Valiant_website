import { Button } from "@/components/ui";
import { Sunrise } from "@/components/PageHero";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-svh items-center overflow-hidden bg-ink text-white">
      <Sunrise />
      <div className="container-x py-40">
        <p className="eyebrow flex items-center gap-3 text-ember">
          <span className="h-px w-8 bg-current" />
          Error 404
        </p>
        <h1 className="display mt-6 text-[clamp(2.6rem,7vw,6.5rem)]">
          This page has
          <br />
          <span className="text-ember">moved on.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-white/70">
          The page you were looking for doesn&apos;t exist. The Movement, however, is very much here.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/join" variant="ghost">
            Join Us
          </Button>
        </div>
      </div>
    </section>
  );
}
