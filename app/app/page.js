import {
  CalendarCheck,
  Fingerprint,
  IdCard,
  Megaphone,
  MessagesSquare,
  Newspaper,
  PhoneOff,
  ShieldCheck,
  UsersRound,
  WalletCards,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button, Kicker } from "@/components/ui";
import { Reveal, RevealItem, Stagger } from "@/components/motion";
import { ChatScreen, CodeScreen, CommunitiesScreen, FeedScreen, Phone, WalletScreen } from "@/components/app/Phone";
import { access, consoleTools, coordinators, dues, features, ladder, safeguards, split, tiers } from "@/lib/platform";
import { site } from "@/lib/site";

export const metadata = {
  title: "The Valiant App",
  description:
    "The Valiant App: one identity registered with your NIN, placed at your polling unit. A feed, communities, messages and calls, a Naira wallet and monthly dues, in one accountable place.",
};

const icons = { Newspaper, UsersRound, MessagesSquare, WalletCards, IdCard, Megaphone, Fingerprint, ShieldCheck, CalendarCheck, PhoneOff };

const screens = [
  { title: "Home", caption: "The Movement's feed, stories and field reports.", Screen: FeedScreen, active: "Home" },
  { title: "Communities", caption: "Your four groups, and live huddles.", Screen: CommunitiesScreen, active: "Groups" },
  { title: "Messages", caption: "Chats, voice notes and calls.", Screen: ChatScreen, active: "Chats", tabs: false },
  { title: "Finance", caption: "Your wallet and monthly dues.", Screen: WalletScreen, active: "Finance" },
];

const splitTones = ["bg-ember", "bg-flame", "bg-rust", "bg-white/85"];

export default function AppPage() {
  return (
    <>
      <PageHero
        kicker="The Valiant App"
        title="The Movement,"
        accent="in your pocket."
        intro="One identity, registered with your NIN and placed at your own polling unit. Your feed, your communities, your wallet and your dues, in one accountable place."
        visual={
          // The sign-in screen, rising from the bottom edge like the arches elsewhere.
          <div className="relative mx-auto h-[25rem] w-[17.5rem] overflow-hidden sm:h-[28rem] lg:mr-0 lg:ml-auto lg:h-[32rem]">
            <div aria-hidden className="absolute inset-x-[-40%] bottom-0 h-3/4 rounded-full bg-ember/25 blur-3xl" />
            <Phone tabs={false} className="absolute left-0 top-0">
              <CodeScreen />
            </Phone>
          </div>
        }
      >
        <Button href={site.links.appRegister} external size="lg">
          Create your account
        </Button>
        <Button href={site.links.appLogin} external variant="ghost" size="lg">
          Sign in
        </Button>
      </PageHero>

      {/* Getting in. */}
      <section className="bg-cream pt-24 sm:pt-32">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <Kicker tone="rust">Getting in</Kicker>
            <h2 className="display mt-6 text-[clamp(2.22rem,5.18vw,4.44rem)]">
              No password to remember. <span className="text-rust">Until you want one.</span>
            </h2>
          </Reveal>
          <Stagger as="ol" className="mt-14 grid gap-6 md:grid-cols-3" gap={0.1}>
            {access.map((step, i) => (
              <RevealItem
                as="li"
                key={step.title}
                className={
                  i === 1
                    ? "relative rounded-[2rem] bg-ink p-8 text-white sm:p-10"
                    : "relative rounded-[2rem] bg-white p-8 ring-1 ring-line sm:p-10"
                }
              >
                <span className={i === 1 ? "display text-5xl text-ember" : "display text-5xl text-rust"}>0{i + 1}</span>
                <h3 className="mt-8 text-xl font-extrabold">{step.title}</h3>
                <p className={i === 1 ? "mt-3 leading-relaxed text-white/65" : "mt-3 leading-relaxed text-stone"}>{step.body}</p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* The app itself, four screens across. */}
      <section className="overflow-hidden bg-cream py-24 sm:py-32">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <Kicker tone="rust">Inside the app</Kicker>
            <h2 className="display mt-6 text-[clamp(2.22rem,5.18vw,4.44rem)]">
              Everything a movement needs. <span className="text-rust">One place.</span>
            </h2>
          </Reveal>
        </div>
        <Stagger className="mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto px-[max(1rem,calc((100vw-88rem)/2+3rem))] pb-6 [scrollbar-width:none] lg:mt-20 xl:justify-center" gap={0.1}>
          {screens.map(({ title, caption, Screen, active, tabs }) => (
            <RevealItem key={title} as="figure" className="flex shrink-0 snap-center flex-col items-center">
              <Phone active={active} tabs={tabs !== false}>
                <Screen />
              </Phone>
              <figcaption className="mt-6 max-w-[15rem] text-center">
                <span className="block font-extrabold">{title}</span>
                <span className="mt-1 block text-sm text-stone">{caption}</span>
              </figcaption>
            </RevealItem>
          ))}
        </Stagger>
        <p className="container-x mt-6 text-center text-xs text-stone/80">Screens are illustrations; names and figures are examples.</p>
      </section>

      {/* Placement: from the nation to the polling unit. */}
      <section className="grain relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Kicker>Structure is the product</Kicker>
            <h2 className="display mt-6 text-[clamp(2.07rem,4.07vw,3.7rem)]">
              Placed where <span className="text-ember">you vote.</span>
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/70">
              <p>
                When you register, your home address places you down to your polling unit. That placement is not just
                a line on your profile. It decides which communities you join, where your dues go and which leaders
                serve you.
              </p>
              <p>Move house and update your address: you leave your old groups and join your new ones, automatically.</p>
            </div>
          </Reveal>

          <Stagger as="ol" className="lg:col-span-7" gap={0.09}>
            {ladder.map((step, i) => (
              <RevealItem as="li" key={step.level}>
                <div
                  style={{ marginLeft: `${i * 6}%` }}
                  className={
                    i === ladder.length - 1
                      ? "flex items-center justify-between gap-6 rounded-3xl bg-ember px-6 py-5 text-ink"
                      : "flex items-center justify-between gap-6 border-b border-white/10 px-6 py-5"
                  }
                >
                  <span>
                    <span className="display block text-[clamp(1.4rem,2.4vw,2.1rem)]">{step.level}</span>
                    <span className={i === ladder.length - 1 ? "text-sm font-semibold text-ink/70" : "text-sm text-white/55"}>
                      {step.note}
                    </span>
                  </span>
                  <span className={i === ladder.length - 1 ? "display text-2xl" : "display text-2xl text-ember"}>{step.count}</span>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* What members can do. */}
      <section className="bg-sand py-24 sm:py-32">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <Kicker tone="rust">For members</Kicker>
            <h2 className="display mt-6 text-[clamp(2.22rem,5.18vw,4.44rem)]">
              Built for how <span className="text-rust">Valiants work.</span>
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
            {features.map((f) => {
              const Icon = icons[f.icon];
              return (
                <RevealItem key={f.title} className="bg-cream p-8 sm:p-10">
                  <span className="grid size-12 place-items-center rounded-2xl bg-ink text-ember">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-7 text-xl font-extrabold">{f.title}</h3>
                  <p className="mt-3 leading-relaxed text-stone">{f.body}</p>
                </RevealItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Dues, and where every naira goes. */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Kicker tone="rust">Dues, in the open</Kicker>
            <h2 className="display mt-6 text-[clamp(2.07rem,4.07vw,3.7rem)]">
              Every naira, <span className="text-rust">accounted for.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              Dues are paid from your wallet on the 28th of each month, with reminders in the five days before. Every
              payment is shared up the structure and recorded against the ward, LGA and state it funds.
            </p>
            <ul className="mt-10 border-t border-line">
              {dues.map((d) => (
                <li key={d.category} className="flex items-baseline justify-between gap-6 border-b border-line py-5">
                  <span className="font-semibold">{d.category}</span>
                  <span className="shrink-0 text-right">
                    <span className="display block text-2xl">{d.amount}</span>
                    <span className="text-xs font-semibold text-stone">{d.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="grain relative self-start overflow-hidden rounded-[2.5rem] bg-ink p-8 text-white sm:p-12 lg:col-span-7">
            <p className="eyebrow text-ember">How each payment is shared</p>
            <p className="display mt-5 text-[clamp(1.8rem,3.2vw,2.8rem)]">
              Half stays <span className="text-ember">in your ward.</span>
            </p>
            <div className="mt-10 flex h-16 overflow-hidden rounded-2xl">
              {split.map((s, i) => (
                <span key={s.level} className={`${splitTones[i]} h-full`} style={{ width: `${s.share}%` }} />
              ))}
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {split.map((s, i) => (
                <li key={s.level}>
                  <span className={`block h-1 w-8 rounded-full ${splitTones[i]}`} />
                  <span className="display mt-4 block text-4xl">{s.share}%</span>
                  <span className="mt-1 block text-sm text-white/60">{s.level}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/55">
              Each structure keeps its own treasury. A month's dues can only ever be charged once, and a wallet can
              never go below zero.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Referral tiers. */}
      <section className="bg-sand py-24 sm:py-32">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal className="max-w-2xl">
              <Kicker tone="rust">Multiply the Movement</Kicker>
              <h2 className="display mt-6 text-[clamp(2.22rem,5.18vw,4.44rem)]">
                Bring people in. <span className="text-rust">Rise with them.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-lg leading-relaxed text-stone">
                Every member gets an invite code. Each tier you reach pays a one-off bonus into your wallet.
              </p>
            </Reveal>
          </div>
          <Stagger as="ol" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" gap={0.08}>
            {tiers.map((t, i) => (
              <RevealItem
                as="li"
                key={t.name}
                className={
                  i === tiers.length - 1
                    ? "flex flex-col rounded-[2rem] bg-ink p-7 text-white sm:col-span-2 lg:col-span-1"
                    : "flex flex-col rounded-[2rem] bg-cream p-7 ring-1 ring-line"
                }
              >
                <span className={i === tiers.length - 1 ? "eyebrow text-ember" : "eyebrow text-rust"}>
                  {t.referrals.toLocaleString("en-NG")} referrals
                </span>
                <span className="mt-4 text-lg font-extrabold leading-tight">{t.name}</span>
                <span className="display mt-auto pt-10 text-3xl">{t.bonus}</span>
                <span className={i === tiers.length - 1 ? "text-xs text-white/55" : "text-xs text-stone"}>wallet bonus</span>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Safety, and what leaders see. */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Kicker tone="rust">Safe by design</Kicker>
              <h2 className="display mt-6 text-[clamp(2.07rem,4.07vw,3.7rem)]">
                Your identity and money, <span className="text-rust">protected.</span>
              </h2>
            </Reveal>
            <Stagger className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2" gap={0.08}>
              {safeguards.map((g) => {
                const Icon = icons[g.icon];
                return (
                  <RevealItem key={g.title}>
                    <Icon className="size-6 text-rust" />
                    <h3 className="mt-4 text-lg font-extrabold leading-snug">{g.title}</h3>
                    <p className="mt-2 leading-relaxed text-stone">{g.body}</p>
                  </RevealItem>
                );
              })}
            </Stagger>
          </div>

          <Reveal delay={0.1} className="self-start rounded-[2.5rem] bg-ink p-8 text-white sm:p-10 lg:col-span-5">
            <p className="eyebrow text-ember">For coordinators</p>
            <h3 className="display mt-5 text-[clamp(1.8rem,3vw,2.5rem)]">
              Lead your area, <span className="text-ember">and only yours.</span>
            </h3>
            <p className="mt-4 leading-relaxed text-white/65">
              Leaders sign in the same way as members and land in a console scoped to their own jurisdiction.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {coordinators.map((c) => (
                <li key={c.role} className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                  <span className="block text-sm font-extrabold">{c.role}</span>
                  <span className="mt-1 block text-xs text-white/55">{c.scope}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-8 space-y-3 border-t border-white/10 pt-8 text-[15px] text-white/75">
              {consoleTools.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ember" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Close. */}
      <section className="bg-cream pb-20 sm:pb-28">
        <div className="container-x">
          <Reveal className="grain relative overflow-hidden rounded-[2.5rem] bg-ember px-8 py-14 text-ink sm:px-14 sm:py-20">
            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="display text-[clamp(2.22rem,5.18vw,4.81rem)]">
                  Your place <span className="text-maroon">is waiting.</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg text-ink/80">
                  Registration takes a few minutes: your NIN, your email or phone number, and your home address.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={site.links.appRegister} external variant="ink" size="lg">
                  Create your account
                </Button>
                <Button href={site.links.appLogin} external variant="light" size="lg">
                  Sign in
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
