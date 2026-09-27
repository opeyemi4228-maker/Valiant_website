import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Kicker } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata = {
  title: "Culture, Ethics & Conduct",
  description:
    "The culture, code of ethics and standards of conduct that guide every member and leader of the Valiant Movement.",
};

const principles = [
  ["Service", "Self", "Members prioritise contribution over entitlement."],
  ["Responsibility", "Complaint", "We seek solutions rather than merely criticise problems."],
  ["Character", "Position", "Integrity always takes precedence over titles and status."],
  ["Unity", "Division", "We promote understanding, cooperation and mutual respect."],
  ["Excellence", "Mediocrity", "We strive for the highest standards in conduct and performance."],
  ["Action", "Apathy", "We act constructively rather than remain indifferent."],
];

const members = [
  "Speak truthfully",
  "Conduct themselves honourably",
  "Avoid corruption",
  "Respect human dignity",
  "Promote peace and discipline",
  "Demonstrate integrity in public and private life",
  "Protect the reputation of the Movement",
];

const leaders = [
  "Lead by example",
  "Maintain accountability and transparency",
  "Avoid abuse of office",
  "Protect institutional integrity",
  "Serve with humility",
  "Place the interest of the Movement above personal interest",
];

const avoid = ["Fraud", "Violence", "Hate speech", "Abuse of authority", "Discrimination", "Criminal misconduct", "Deliberate misinformation"];

const notes = [
  [
    "Conflict of interest",
    "Members and leaders avoid situations where personal interests conflict with those of the Movement. Potential conflicts are disclosed promptly and managed transparently, and no one uses their position for improper personal advantage.",
  ],
  [
    "Social media",
    "Members use digital platforms responsibly. They never spread false information, promote hatred, attack people personally or misrepresent the Movement, and they use them to promote truth, civic responsibility and constructive engagement.",
  ],
  [
    "Volunteerism",
    "Volunteerism is a defining characteristic of the Movement. Members contribute their time, skills, resources and influence, because meaningful transformation requires active participation and sustained service.",
  ],
];

export default function EthicsPage() {
  return (
    <>
      <PageHero
        kicker="Culture, ethics & conduct"
        title="Character"
        accent="before position."
        intro="The Valiant Movement is a values-driven citizen movement. Our culture ultimately determines our success, so we hold ourselves to a clear standard."
        image="/images/gallery/g17.jpg"
        imageAlt="Two senior members sharing a laugh at a Movement gathering"
        imagePosition="35% 50%"
        parent={{ label: "About", href: "/about" }}
      />

      <section className="bg-cream py-24 sm:py-32">
        <div className="container-x">
          <Reveal>
            <Kicker tone="rust">Core cultural principles</Kicker>
          </Reveal>
          <ul className="mt-10 border-t border-line">
            {principles.map(([first, second, line], i) => (
              <Reveal as="li" key={first} delay={i * 0.04} className="grid gap-3 border-b border-line py-7 md:grid-cols-12 md:items-baseline md:gap-8">
                <p className="display text-[clamp(1.8rem,3.4vw,3rem)] md:col-span-7">
                  {first} <span className="text-stone/45">before</span> <span className="text-rust">{second}</span>
                </p>
                <p className="text-lg text-stone md:col-span-5">{line}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sand py-24 sm:py-32">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          {[
            ["Code of ethics", "Members shall", members, "bg-white text-ink ring-1 ring-line", "text-rust"],
            ["Leadership ethics", "Leaders shall", leaders, "bg-ink text-white", "text-ember"],
          ].map(([kicker, title, items, tone, accent], i) => (
            <Reveal key={kicker} delay={i * 0.1} className={`rounded-[2rem] p-8 sm:p-12 ${tone}`}>
              <p className={`eyebrow ${accent}`}>{kicker}</p>
              <h2 className="display mt-5 text-[clamp(2rem,3.7vw,3.3rem)]">{title}</h2>
              <ul className="mt-8 space-y-3.5 text-lg">
                {items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-ember" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="container-x mt-6">
          <Reveal className="rounded-[2rem] bg-maroon p-8 text-white sm:p-12">
            <p className="eyebrow text-ember">Public conduct</p>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              Members avoid any conduct that brings the Movement into disrepute, including:
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {avoid.map((a) => (
                <li key={a} className="rounded-full bg-white/10 px-4 py-2 font-semibold line-through decoration-ember decoration-2">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-24 sm:py-28">
        <div className="container-x grid gap-10 md:grid-cols-3">
          {notes.map(([title, body], i) => (
            <Reveal key={title} delay={i * 0.08}>
              <h3 className="text-xl font-extrabold">{title}</h3>
              <p className="mt-3 leading-relaxed text-stone">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Hold the" accent="standard." />
    </>
  );
}
