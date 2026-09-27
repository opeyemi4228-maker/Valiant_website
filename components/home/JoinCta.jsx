import Image from "next/image";
import { Heart } from "lucide-react";
import { site } from "@/lib/site";
import { Button, WhatsappIcon } from "@/components/ui";
import { Reveal } from "@/components/motion";

export default function JoinCta() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container-x grid gap-6 lg:grid-cols-12">
        <Reveal className="grain relative flex flex-col justify-center overflow-hidden rounded-[2.5rem] bg-ink p-8 text-white sm:p-12 lg:col-span-8 lg:p-16">
          <div aria-hidden className="absolute -right-24 -top-24 size-96 rounded-full bg-ember/25 blur-3xl" />
          <div className="relative">
            <p className="eyebrow text-ember">Membership is open</p>
            <h2 className="display mt-6 text-[clamp(2.59rem,7.4vw,6.66rem)]">
              Be <span className="text-ember">valiant.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Register in minutes, choose your ward and polling unit, and stand with Nigerians building
              something that lasts.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/join" size="lg">
                Register as a member
              </Button>
              <a
                href={site.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full px-6 py-[18px] font-bold text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10"
              >
                <WhatsappIcon className="size-5 text-[#25D366]" />
                Join our WhatsApp community
              </a>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:col-span-4">
          <Reveal delay={0.1} className="relative min-h-72 overflow-hidden rounded-[2.5rem]">
            <Image
              src="/images/awka-north-chapter.png"
              alt="Members of the Awka North LGA chapter with the Valiant Movement banner"
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/80 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 font-serif text-2xl italic leading-snug text-white">
              “Values multiplied until they live in every heart across Nigeria.”
            </p>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col justify-between rounded-[2.5rem] bg-ember p-8 text-ink sm:p-10">
            <div>
              <span className="grid size-12 place-items-center rounded-full bg-ink text-ember">
                <Heart className="size-5" fill="currentColor" />
              </span>
              <h3 className="display mt-6 text-4xl">Fuel the movement</h3>
              <p className="mt-3 leading-relaxed text-ink/80">
                Your gift trains leaders, equips chapters and takes the Valiant message to every community.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/donate" variant="ink">
                Donate now
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
