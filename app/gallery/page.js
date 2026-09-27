import PageHero from "@/components/PageHero";
import Lightbox from "@/components/Lightbox";
import { Button, YoutubeIcon } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { galleryPhotos, site } from "@/lib/site";

export const metadata = {
  title: "Gallery",
  description: "Photographs from Valiant Movement gatherings, trainings and chapter meetings.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero kicker="Gallery" title="Moments of" accent="courage." intro="From chapter meetings to the Valiant Gathering."
        image="/images/gallery/g13.jpg"
        imageAlt="Two members embracing at a Movement gathering"
        imagePosition="40% 50%"
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-x">
          <Lightbox images={galleryPhotos} />
        </div>
      </section>

      <section className="bg-ink py-20 text-white sm:py-24">
        <Reveal className="container-x flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-[#FF0000]">
              <YoutubeIcon className="size-8 text-white" />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Watch on YouTube</h2>
              <p className="mt-1 text-white/65">Speeches, gatherings and the Valiant choir.</p>
            </div>
          </div>
          <Button href={site.links.youtube} external>
            Visit our channel
          </Button>
        </Reveal>
      </section>
    </>
  );
}
