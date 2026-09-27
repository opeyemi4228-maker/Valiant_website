import JoinRegistration from "@/components/JoinRegistration";
import PageHero from "@/components/PageHero";
import { WhatsappIcon } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = {
  title: "Join Us",
  description:
    "Register as a member of the Valiant Movement, in full or in under a minute with your NIN. Choose your ward and polling unit and join Nigerians building a new nation with courage, character and service.",
};

const journey = [
  { title: "Register", body: "In full, or in under a minute with your NIN." },
  { title: "Orientation", body: "Your chapter introduces you to our vision, values and structure." },
  { title: "Induction", body: "Take the Valiant Pledge and begin to serve." },
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        kicker="Membership"
        title="Join the"
        accent="Movement."
        intro="Membership is open to every Nigerian aged 18 and over who believes in courage, character and service, at home and in the diaspora."
        image="/images/gallery/g04.jpg"
        imageAlt="Members in Valiant Movement caps"
        imagePosition="50% 50%"
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <JoinRegistration />
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-rust">What happens next</p>
              <ol className="mt-6 space-y-6">
                {journey.map((j, i) => (
                  <li key={j.title} className="flex gap-4">
                    <span className="display grid size-11 shrink-0 place-items-center rounded-full bg-ink text-xl text-ember">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-extrabold">{j.title}</p>
                      <p className="mt-1 text-stone">{j.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 rounded-3xl bg-sand p-6">
                <p className="font-bold">Need help registering?</p>
                <p className="mt-1 text-stone">
                  Call <a href={site.contact.altPhoneHref} className="font-semibold text-ink underline decoration-ember underline-offset-2">{site.contact.altPhone}</a>{" "}
                  or ask in our community.
                </p>
                <a
                  href={site.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-bold text-ink hover:text-rust"
                >
                  <WhatsappIcon className="size-5 text-[#25D366]" /> WhatsApp community
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
