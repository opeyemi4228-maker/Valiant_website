import Image from "next/image";
import { gallery } from "@/lib/site";
import { Button, Kicker } from "@/components/ui";
import { Reveal } from "@/components/motion";

function Row({ images, reverse }) {
  return (
    <div
      className={`flex w-max gap-4 [--marquee-duration:70s] hover:[animation-play-state:paused] ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
    >
      {[0, 1].map((copy) => (
        <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4">
          {images.map((src, i) => (
            <div
              key={`${src}-${copy}`}
              className={`relative h-56 shrink-0 overflow-hidden rounded-3xl sm:h-72 ${
                i % 3 === 1 ? "w-56 sm:w-72" : "w-80 sm:w-[28rem]"
              }`}
            >
              <Image
                src={src}
                alt={copy === 0 ? "Valiant Movement members at a Movement event" : ""}
                fill
                sizes="448px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function GalleryRail() {
  const top = gallery.filter((_, i) => i % 2 === 0);
  const bottom = gallery.filter((_, i) => i % 2 === 1);
  return (
    <section className="overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Kicker>Gallery</Kicker>
          <h2 className="display mt-6 text-[clamp(2.22rem,5.18vw,4.81rem)]">
            Moments of <span className="text-ember">courage.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Button href="/gallery" variant="ghost">
            View the gallery
          </Button>
        </Reveal>
      </div>
      <div className="mask-fade-x mt-14 space-y-4 lg:mt-20">
        <Row images={top} />
        <Row images={bottom} reverse />
      </div>
    </section>
  );
}
