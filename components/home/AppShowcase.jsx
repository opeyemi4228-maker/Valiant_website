import { IdCard, MessagesSquare, UsersRound, WalletCards } from "lucide-react";
import { Button, Kicker } from "@/components/ui";
import { Reveal, RevealItem, Stagger } from "@/components/motion";
import { CommunitiesScreen, FeedScreen, Phone } from "@/components/app/Phone";
import { site } from "@/lib/site";

const points = [
  { Icon: UsersRound, title: "Your communities, automatically", body: "State, LGA, ward and polling unit groups, joined the day you register." },
  { Icon: MessagesSquare, title: "Messages, calls and huddles", body: "Talk to any Valiant, or gather your ward in a live group call." },
  { Icon: WalletCards, title: "A wallet and your dues", body: "Pay monthly dues from your wallet, shared openly up the structure." },
  { Icon: IdCard, title: "Your member ID", body: "A digital membership card, a profile and your own invite code." },
];

/**
 * The Valiant App on the home page: what it is in one sentence, four things it
 * does, and two screens of it. The full story lives on /app.
 */
export default function AppShowcase() {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_78%_55%,rgba(247,148,29,0.22),rgba(106,29,5,0.25)_45%,transparent_75%)]"
      />
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <Kicker>The Valiant App</Kicker>
            <h2 className="display mt-6 text-[clamp(2.22rem,5.18vw,4.81rem)]">
              The Movement, <span className="text-ember">in your pocket.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              One identity, registered with your NIN and placed at your own polling unit. Your feed, your
              communities, your wallet and your dues, in one accountable place.
            </p>
          </Reveal>

          <Stagger as="ul" className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {points.map(({ Icon, title, body }) => (
              <RevealItem as="li" key={title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/[0.06] text-ember ring-1 ring-white/10">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block font-extrabold">{title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-white/60">{body}</span>
                </span>
              </RevealItem>
            ))}
          </Stagger>

          <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center gap-3">
            <Button href={site.links.appRegister} external size="lg">
              Create your account
            </Button>
            <Button href="/app" variant="ghost" size="lg">
              How it works
            </Button>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm text-white/50">
              Already registered? Sign in with your email or phone number and a one-time code.
            </p>
          </Reveal>
        </div>

        {/* Two screens: the feed in front, communities leaning in behind. */}
        <Reveal delay={0.1} className="relative mx-auto h-[38rem] w-full max-w-[30rem] lg:col-span-6 lg:h-[42rem]">
          <div aria-hidden className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/20 blur-3xl" />
          <Phone active="Groups" className="absolute left-0 top-12 hidden origin-bottom-right -rotate-[6deg] scale-[0.92] sm:block">
            <CommunitiesScreen />
          </Phone>
          <Phone className="absolute left-1/2 top-0 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 sm:rotate-[3deg]">
            <FeedScreen />
          </Phone>
        </Reveal>
      </div>
    </section>
  );
}
