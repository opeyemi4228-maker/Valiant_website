import ChoirForm from "@/components/ChoirForm";
import PageHero from "@/components/PageHero";
import { officialSongs } from "@/lib/choir";

export const metadata = {
  title: "Valiant Youth Choir Competition",
  description:
    "Register your church youth choir for the Valiant Youth Choir Competition. Open to choirs in Anambra State with members aged 20 and below.",
};

const rules = [
  "All members are 20 years old or younger, Christian and active in church",
  "Supervised by a Youth Pastor, Choir Director or Church Leader",
  "Parental consent obtained for every minor",
  "Audition is a live performance of one official song",
];

export default function ChoirPage() {
  return (
    <>
      <PageHero
        kicker="Valiant Youth Choir Competition"
        title="Lift your"
        accent="voices."
        intro="Church youth choirs across Anambra State compete for faith, discipline and excellence. Registration takes about five minutes."
        parent={{ label: "Programmes", href: "/programmes" }}
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <ChoirForm />
          </div>
          <aside className="lg:col-span-4">
            <div className="space-y-10 lg:sticky lg:top-28">
              <div>
                <p className="eyebrow text-rust">Who can enter</p>
                <ul className="mt-5 space-y-3">
                  {rules.map((r) => (
                    <li key={r} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ember" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-ink p-7 text-white">
                <p className="eyebrow text-ember">Official songs</p>
                <ol className="mt-5 space-y-3 font-serif text-lg italic">
                  {officialSongs.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
