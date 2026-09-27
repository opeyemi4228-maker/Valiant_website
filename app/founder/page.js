import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Reveal } from "@/components/motion";
import { founder } from "@/lib/site";

export const metadata = {
  title: "Meet the Founder",
  description:
    "Valentine Chineto Ozigbo: business leader, public intellectual, philanthropist and Founder & Convener of the Valiant Movement.",
};

const chapters = [
  {
    label: "Enterprise",
    body: [
      "Valentine Ozigbo is the Immediate Past President and Group Chief Executive Officer of Transcorp Plc, one of Nigeria's leading diversified conglomerates. Before that he served as Managing Director and CEO of Transcorp Hotels Plc, where he led significant growth, innovation and institutional transformation.",
      "Earlier, he built a distinguished banking career across UBA, Diamond Bank, FSB International Bank, Continental Trust Bank and Keystone Bank, rising to General Manager and Director of Global Transaction Banking.",
    ],
  },
  {
    label: "Scholarship",
    body: [
      "He graduated as the Best Graduating Student in Accounting and earned his MBA at the University of Nigeria, Nsukka. A Chevening Scholar, he took an MSc in Finance with Distinction at Lancaster University, which later honoured him as a Distinguished Alumnus.",
      "He holds an Honorary Doctorate from Tansian University, is a Visiting Associate Professor at Nnamdi Azikiwe University (UNIZIK), and is the author of The Equilibrium Effect.",
    ],
    list: [
      "Fellow, Institute of Chartered Accountants of Nigeria (FCA)",
      "Fellow, Chartered Institute of Taxation of Nigeria (FCIT)",
      "Fellow, Institute of Credit Administration (FICA)",
      "Fellow, Institute of Tourism Professionals (FITP)",
      "Justice of the Peace (JP) · Member, Institute of Directors",
    ],
  },
  {
    label: "Civic leadership",
    body: [
      "A respected voice on leadership, governance, restructuring and national renewal, he received the inaugural Seven Stars Leadership & Governance Excellence Medal (2025). His advocacy centres on:",
    ],
    list: [
      "A reimagined Nigeria anchored on truth, equity, justice and unity",
      "Constitutional restructuring and strengthened rule of law",
      "Judicial independence",
      "Electoral reform: electronic voting and transmission of results, and independent candidacy",
      "A united, secure and prosperous Nigeria free from extremism and impunity",
    ],
  },
  {
    label: "The Valiant Movement",
    body: [
      "In February 2025 he founded the Valiant Movement, a nationwide civic renaissance platform rooted in the philosophy “Courage to Lead”, promoting ethical and visionary leadership, active citizenship, youth development, and a values-driven push toward a restructured, secure and globally competitive Nigeria.",
    ],
  },
  {
    label: "Social impact",
    body: [
      "Through the VCO Foundation he supports education, youth empowerment, entrepreneurship and humanitarian work, including Anambra's Future Tech Leaders programme, which equipped over 100 young people with digital, creative and entrepreneurial skills.",
      "As Founder and Chairman of Feet 'N' Tricks International he has championed freestyle football across Africa, from the Nigerian Freestyle Football Championship to the African Freestyle Football Championships. In 2018 he chaired Unusual Praise, and for years led the Unusual Entrepreneur Programme for young entrepreneurs.",
    ],
  },
  {
    label: "Family",
    body: ["Valentine is married to Ojiugo Ozigbo, and together they are blessed with four children."],
  },
];

export default function FounderPage() {
  return (
    <>
      <PageHero kicker="Founder & Convener" title="Valentine" accent="Ozigbo." intro={founder.honours}
        image="/images/founder-portrait.jpg"
        imageAlt="Valentine Chineto Ozigbo"
        imagePosition="50% 15%"
        parent={{ label: "About", href: "/about" }}
      />

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand">
                <Image
                  src="/images/founder-tshirt.jpg"
                  alt={`${founder.name}, ${founder.role} of the Valiant Movement`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <blockquote className="mt-8 border-l-4 border-ember pl-6">
                <p className="font-serif text-2xl italic leading-snug">
                  “When you empower a human being, you transform a nation.”
                </p>
              </blockquote>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-2xl font-semibold leading-snug sm:text-[1.7rem]">
                Valentine Chineto Ozigbo is a Nigerian business leader, public intellectual, philanthropist,
                author and nation-building advocate, and the Founder and Convener of the Valiant Movement.
              </p>
            </Reveal>

            <div className="mt-14 divide-y divide-line border-t border-line">
              {chapters.map((c) => (
                <Reveal key={c.label} className="grid gap-4 py-10 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <h2 className="eyebrow pt-1.5 text-rust">{c.label}</h2>
                  <div className="space-y-4 text-lg leading-relaxed text-stone">
                    {c.body.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                    {c.list && (
                      <ul className="space-y-2 pt-1 text-base text-ink">
                        {c.list.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ember" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Answer the" accent="call to lead." />
    </>
  );
}
