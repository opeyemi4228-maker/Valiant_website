import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Button, Kicker } from "@/components/ui";
import { Reveal, RevealItem, Stagger } from "@/components/motion";

export const metadata = {
  title: "Membership & Culture",
  description:
    "Who can join the Valiant Movement, the categories of membership, and the rights, responsibilities and benefits of every member.",
};

const eligibility = [
  "Are at least eighteen (18) years of age",
  "Believe in the principles and values of the Movement",
  "Demonstrate good character and responsible citizenship",
  "Agree to uphold the Constitution, Handbook and Code of Conduct",
  "Are willing to contribute positively to society",
];

const categories = [
  ["Student", "Young people in education who want to learn, grow and contribute through the ideals of the Movement."],
  ["Regular", "Individuals who share the vision and actively take part in the Movement's activities and programmes."],
  ["Professional", "People with recognised qualifications, leadership experience or notable achievement in their field."],
  ["Diaspora", "Nigerians and friends of Nigeria abroad who support and take part in the Movement's work."],
  ["Honorary", "Individuals of exceptional character, achievement or service, admitted in recognition of their contribution."],
  ["Institutional partners", "Organisations and institutions that support the vision through partnership arrangements."],
];

const journey = ["Awareness", "Registration", "Orientation", "Induction", "Participation", "Service", "Leadership", "Mentorship"];

const rights = [
  "Take part in Movement activities, meetings and approved events",
  "Access training, mentorship and leadership development",
  "Contribute ideas, proposals and recommendations",
  "Vote where applicable, and contest eligible leadership positions",
  "Receive information about the Movement's activities",
  "Be treated with fairness, dignity and respect",
];

const duties = [
  "Uphold the values and principles of the Movement",
  "Conduct yourself honourably at all times",
  "Promote peace, unity and responsible citizenship",
  "Take part actively in approved programmes",
  "Pay approved dues and contributions where applicable",
  "Serve as an ambassador of the Movement in your community",
];

const benefits = [
  "Leadership development programmes",
  "Mentorship opportunities",
  "Civic education",
  "Networking",
  "Community service platforms",
  "Publications and resources",
  "Conferences, retreats and conventions",
  "Opportunities for leadership and public service",
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        kicker="Membership & culture"
        title="Privilege and"
        accent="responsibility."
        intro="The strength of the Movement lies not in its structures alone, but in the character, commitment and conduct of its members."
        image="/images/gallery/g02.jpg"
        imageAlt="Members in Valiant Movement caps at a training session"
        imagePosition="45% 50%"
        parent={{ label: "About", href: "/about" }}
      />

      <section className="bg-cream py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <Kicker tone="rust">Who can join</Kicker>
            <h2 className="display mt-6 text-[clamp(2.07rem,4.07vw,3.7rem)]">Open to every Nigerian of character.</h2>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              No member is discriminated against on the basis of ethnicity, gender, religion, disability, social
              status, region or political opinion.
            </p>
            <div className="mt-8">
              <Button href="/join">Register now</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="eyebrow text-stone">Membership is open to individuals who</p>
            <ol className="mt-6 border-t border-line">
              {eligibility.map((e, i) => (
                <li key={e} className="flex items-baseline gap-6 border-b border-line py-5 text-xl font-semibold">
                  <span className="display w-8 shrink-0 text-2xl text-ember">{i + 1}</span>
                  {e}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-24 text-white sm:py-32">
        <div className="container-x">
          <Reveal>
            <Kicker>Categories of membership</Kicker>
            <h2 className="display mt-6 text-[clamp(2.22rem,5.18vw,4.81rem)]">
              There is a place <span className="text-ember">for you.</span>
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(([name, body]) => (
              <RevealItem key={name} className="bg-ink p-8 transition-colors duration-500 hover:bg-night sm:p-10">
                <h3 className="text-2xl font-extrabold">{name}</h3>
                <p className="mt-3 leading-relaxed text-white/60">{body}</p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="overflow-hidden bg-ember py-20 text-ink sm:py-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-maroon">The membership journey</p>
            <p className="mt-4 max-w-2xl text-lg text-ink/80">
              Membership is a developmental journey, not a registration exercise.
            </p>
          </Reveal>
          {/* Eight stages read as a path: a rule that fills in stage by stage. */}
          <Stagger as="ol" className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4" gap={0.07}>
            {journey.map((step, i) => (
              <RevealItem as="li" key={step} className="relative border-t-2 border-ink/15 pt-5">
                <span aria-hidden className="absolute -top-0.5 left-0 h-0.5 w-10 bg-ink" />
                <span className="eyebrow text-maroon">0{i + 1}</span>
                <span className="display mt-2 block text-[clamp(1.35rem,2.2vw,2rem)]">{step}</span>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-cream py-24 sm:py-32">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          {[
            ["Your rights", "Every member has the right to", rights],
            ["Your responsibilities", "Every member shall", duties],
          ].map(([title, lead, items], i) => (
            <Reveal key={title} delay={i * 0.1} className="rounded-[2rem] bg-white p-8 ring-1 ring-line sm:p-12">
              <h2 className="display text-[clamp(2rem,3.7vw,3.3rem)]">{title}</h2>
              <p className="mt-3 text-stone">{lead}:</p>
              <ul className="mt-6 space-y-3 text-lg">
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

        <div className="container-x mt-20">
          <Reveal>
            <p className="eyebrow text-rust">Benefits of membership</p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {benefits.map((b) => (
                <li key={b} className="rounded-full bg-sand px-5 py-2.5 font-semibold">
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-stone">
              Benefits are commensurate with participation, commitment and contribution. Membership is measured
              not merely by registration but by active participation.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Begin your" accent="journey." />
    </>
  );
}
