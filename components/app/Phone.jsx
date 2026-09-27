import Image from "next/image";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  CheckCheck,
  Heart,
  Home,
  Landmark,
  MessageCircle,
  MessagesSquare,
  Mic,
  Phone as PhoneIcon,
  Plus,
  Repeat2,
  Send,
  UsersRound,
  Video,
  WalletCards,
} from "lucide-react";
import clsx from "clsx";

/*
 * Illustrative screens of the Valiant App, drawn in code rather than
 * screenshotted so they stay sharp at any size. People and figures in them
 * are examples, not real members or balances.
 */

const TABS = [
  { label: "Home", Icon: Home },
  { label: "Groups", Icon: UsersRound },
  { label: "Chats", Icon: MessagesSquare },
  { label: "Finance", Icon: WalletCards },
  { label: "Alerts", Icon: Bell },
];

/** A phone: bezel, dynamic island, status bar, the screen, and the app's tab bar. */
export function Phone({ children, active = "Home", tabs = true, className }) {
  return (
    <div
      className={clsx(
        "w-[17.5rem] shrink-0 rounded-[2.9rem] bg-[#0b0504] p-[0.55rem] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)_inset]",
        className
      )}
    >
      <div className="relative flex h-[36rem] flex-col overflow-hidden rounded-[2.4rem] bg-[#f7f4ef] text-[#1a0f0b]">
        <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-bold">
          <span>9:41</span>
          <span aria-hidden className="absolute left-1/2 top-2.5 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1">
            <span className="flex items-end gap-[2px]">
              {[4, 6, 8, 10].map((h) => (
                <span key={h} className="w-[3px] rounded-sm bg-current" style={{ height: h }} />
              ))}
            </span>
            <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-current p-[1px]">
              <span className="block h-full w-3/4 rounded-[1px] bg-current" />
            </span>
          </span>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
        {tabs && (
          <nav className="grid grid-cols-5 border-t border-black/5 bg-white/90 px-2 pb-4 pt-2">
            {TABS.map(({ label, Icon }) => (
              <span
                key={label}
                className={clsx(
                  "flex flex-col items-center gap-0.5 text-[9px] font-semibold",
                  label === active ? "text-[#f7931e]" : "text-[#1a0f0b]/45"
                )}
              >
                <Icon className="size-[17px]" strokeWidth={label === active ? 2.4 : 1.9} />
                {label}
              </span>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

function Avatar({ initials, tone = "ember", size = "size-8" }) {
  const tones = {
    ember: "from-[#ffb65c] to-[#f7931e] text-[#3f0d00]",
    maroon: "from-[#8a2a0c] to-[#3f0d00] text-white",
    ink: "from-[#3b2a24] to-[#120705] text-white",
    sand: "from-[#f2e5d3] to-[#e0c9ad] text-[#3f0d00]",
  };
  return (
    <span className={clsx("grid shrink-0 place-items-center rounded-full bg-linear-to-br text-[10px] font-extrabold", size, tones[tone])}>
      {initials}
    </span>
  );
}

function AppBar({ title, action }) {
  return (
    <div className="flex items-center justify-between px-4 pb-2 pt-1">
      <p className="text-[17px] font-extrabold tracking-tight">{title}</p>
      {action}
    </div>
  );
}

/** Home: stories, a member's post with a photo, and a coordinator's field report. */
export function FeedScreen() {
  const stories = [
    { name: "You", initials: "+", tone: "sand" },
    { name: "Amara", initials: "AE", tone: "ember" },
    { name: "Ward 04", initials: "W4", tone: "maroon" },
    { name: "Tunde", initials: "TA", tone: "ink" },
    { name: "Ngozi", initials: "NU", tone: "ember" },
  ];
  return (
    <div>
      <AppBar
        title="Home"
        action={
          <span className="relative">
            <Bell className="size-[18px]" />
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[#f7931e] ring-2 ring-[#f7f4ef]" />
          </span>
        }
      />
      <div className="flex gap-3 overflow-hidden px-4 pb-3">
        {stories.map((s, i) => (
          <div key={s.name} className="flex w-11 shrink-0 flex-col items-center gap-1">
            <span className={clsx("rounded-full p-[2px]", i === 0 ? "border border-dashed border-black/25" : "bg-linear-to-tr from-[#f7931e] to-[#ffc56e]")}>
              <span className="block rounded-full bg-[#f7f4ef] p-[2px]">
                <Avatar initials={s.initials} tone={s.tone} size="size-9" />
              </span>
            </span>
            <span className="truncate text-[9px] font-medium text-black/60">{s.name}</span>
          </div>
        ))}
      </div>

      <article className="mx-3 rounded-2xl bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <header className="flex items-center gap-2">
          <Avatar initials="CO" />
          <div className="min-w-0 leading-tight">
            <p className="flex items-center gap-1 text-[11px] font-bold">
              Chidi Okafor <BadgeCheck className="size-3 text-[#f7931e]" />
            </p>
            <p className="text-[9.5px] text-black/50">Ward 04 · Awka South · 2h</p>
          </div>
        </header>
        <p className="mt-2 text-[11px] leading-snug">
          Ward 04 met at the polling unit this morning. Thirty-two new Valiants registered. Courage to lead!
        </p>
        <div className="relative mt-2 aspect-[16/10] overflow-hidden rounded-xl">
          <Image src="/images/gallery/g01.jpg" alt="" fill sizes="260px" className="object-cover" />
        </div>
        <footer className="mt-2 flex items-center gap-4 text-[10px] font-semibold text-black/55">
          <span className="flex items-center gap-1 text-[#e8590c]">
            <Heart className="size-3.5 fill-current" /> 128
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="size-3.5" /> 24
          </span>
          <span className="flex items-center gap-1">
            <Repeat2 className="size-3.5" /> 12
          </span>
        </footer>
      </article>

      <article className="mx-3 mt-2.5 rounded-2xl bg-[#1a0f0b] p-3 text-white">
        <p className="text-[8.5px] font-bold uppercase tracking-[0.16em] text-[#ffc56e]">Field report · LGA Coordinator</p>
        <p className="mt-1.5 text-[11px] leading-snug text-white/85">
          Voter education outreach across six wards this weekend. Thank you, Awka South.
        </p>
      </article>
    </div>
  );
}

/** Communities: a live huddle banner and the member's four groups. */
export function CommunitiesScreen() {
  const groups = [
    { name: "Anambra State Chapter", level: "State", members: "12,480", unread: 0, initials: "AN", tone: "maroon" },
    { name: "Awka South LGA", level: "LGA", members: "1,932", unread: 3, initials: "AS", tone: "ink" },
    { name: "Ward 04", level: "Ward", members: "214", unread: 12, initials: "W4", tone: "ember" },
    { name: "Polling Unit 012", level: "Polling unit", members: "38", unread: 5, initials: "PU", tone: "sand" },
  ];
  return (
    <div>
      <AppBar title="Communities" action={<Plus className="size-[18px]" />} />
      <div className="mx-3 flex items-center gap-2.5 rounded-2xl bg-linear-to-r from-[#f7931e] to-[#ff6a13] p-3 text-white">
        <span className="relative grid size-8 place-items-center rounded-full bg-white/20">
          <Video className="size-4" />
          <span className="absolute -right-0.5 -top-0.5 size-2.5 animate-pulse rounded-full bg-white" />
        </span>
        <div className="leading-tight">
          <p className="text-[11px] font-extrabold">Huddle live in Ward 04</p>
          <p className="text-[9.5px] text-white/85">9 Valiants talking · tap to join</p>
        </div>
      </div>
      <p className="px-4 pb-1.5 pt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-black/40">Your communities</p>
      <ul className="mx-3 divide-y divide-black/5 overflow-hidden rounded-2xl bg-white">
        {groups.map((g) => (
          <li key={g.name} className="flex items-center gap-2.5 p-3">
            <Avatar initials={g.initials} tone={g.tone} size="size-9" />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[11px] font-bold">{g.name}</p>
              <p className="text-[9.5px] text-black/50">
                {g.level} · {g.members} members
              </p>
            </div>
            {g.unread > 0 && (
              <span className="grid h-4 min-w-4 place-items-center rounded-full bg-[#f7931e] px-1 text-[8.5px] font-extrabold text-white">
                {g.unread}
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="px-5 pt-3 text-[9.5px] leading-snug text-black/45">
        Placed by your address. Move house and your groups move with you.
      </p>
    </div>
  );
}

/** Finance: the wallet, the month's dues and recent activity. */
export function WalletScreen() {
  const rows = [
    { label: "Wallet top-up", note: "Bank transfer", amount: "+₦10,000", Icon: ArrowDownLeft, positive: true },
    { label: "September dues", note: "Paid on the 28th", amount: "-₦2,000", Icon: Landmark },
    { label: "Mobilizer bonus", note: "20 referrals", amount: "+₦5,000", Icon: BadgeCheck, positive: true },
  ];
  return (
    <div>
      <AppBar title="Finance" action={<Bell className="size-[18px]" />} />
      <div className="mx-3 overflow-hidden rounded-2xl bg-linear-to-br from-[#ff9a2e] via-[#f7931e] to-[#e05a0c] p-4 text-white">
        <p className="text-[9.5px] font-semibold text-white/80">Wallet balance</p>
        <p className="mt-0.5 text-[24px] font-extrabold tracking-tight">₦24,500.00</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <span className="flex items-center justify-center gap-1 rounded-full bg-white py-1.5 text-[10px] font-extrabold text-[#c2410c]">
            <Plus className="size-3" /> Deposit
          </span>
          <span className="flex items-center justify-center gap-1 rounded-full bg-white/20 py-1.5 text-[10px] font-extrabold">
            <ArrowUpRight className="size-3" /> Withdraw
          </span>
        </div>
      </div>
      <div className="mx-3 mt-2.5 rounded-2xl bg-white p-3">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold">Monthly dues</p>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[8.5px] font-bold text-emerald-700">Up to date</span>
        </div>
        <p className="mt-0.5 text-[9.5px] text-black/50">₦2,000 · next on 28 October</p>
        <div className="mt-2.5 flex h-1.5 overflow-hidden rounded-full">
          <span className="w-1/2 bg-[#f7931e]" />
          <span className="w-1/5 bg-[#c2410c]" />
          <span className="w-1/5 bg-[#6a1d05]" />
          <span className="w-1/10 bg-[#1a0f0b]" />
        </div>
        <p className="mt-1.5 text-[8.5px] text-black/45">Shared: Ward 50% · LGA 20% · State 20% · National 10%</p>
      </div>
      <p className="px-4 pb-1.5 pt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-black/40">Recent</p>
      <ul className="mx-3 divide-y divide-black/5 rounded-2xl bg-white">
        {rows.map(({ label, note, amount, Icon, positive }) => (
          <li key={label} className="flex items-center gap-2.5 px-3 py-2.5">
            <span className={clsx("grid size-7 place-items-center rounded-full", positive ? "bg-emerald-50 text-emerald-700" : "bg-[#fdf0e1] text-[#c2410c]")}>
              <Icon className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-[10.5px] font-bold">{label}</p>
              <p className="text-[9px] text-black/45">{note}</p>
            </div>
            <span className={clsx("text-[10.5px] font-extrabold", positive ? "text-emerald-700" : "text-black/80")}>{amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A direct message thread: read receipts, a voice note and a call. */
export function ChatScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 border-b border-black/5 bg-white px-4 pb-2.5 pt-1">
        <Avatar initials="AE" />
        <div className="flex-1 leading-tight">
          <p className="text-[11.5px] font-bold">Amara Eze</p>
          <p className="text-[9px] font-semibold text-emerald-600">Online</p>
        </div>
        <PhoneIcon className="size-4" />
        <Video className="size-4" />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-3 py-3 text-[10.5px] leading-snug">
        <p className="mx-auto rounded-full bg-black/5 px-2.5 py-0.5 text-[8.5px] font-semibold text-black/45">Today</p>
        <p className="max-w-[78%] rounded-2xl rounded-bl-md bg-white px-3 py-2">
          Are we still meeting at the polling unit on Saturday?
        </p>
        <p className="ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-[#f7931e] px-3 py-2 text-white">
          Yes, 10am. Bring the new registration forms.
          <span className="mt-0.5 flex items-center justify-end gap-0.5 text-[8px] text-white/80">
            10:24 <CheckCheck className="size-3 text-sky-200" />
          </span>
        </p>
        <div className="flex max-w-[78%] items-center gap-2 rounded-2xl rounded-bl-md bg-white px-3 py-2">
          <span className="grid size-6 place-items-center rounded-full bg-[#f7931e] text-white">
            <Mic className="size-3" />
          </span>
          <span className="flex h-5 flex-1 items-center gap-[2px]">
            {[5, 9, 14, 8, 16, 11, 6, 13, 9, 15, 7, 10, 5, 12, 8].map((h, i) => (
              <span key={i} className="w-[2px] rounded-full bg-black/35" style={{ height: h }} />
            ))}
          </span>
          <span className="text-[8.5px] text-black/45">0:14</span>
        </div>
        <p className="mx-auto flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[9px] font-semibold text-black/55">
          <PhoneIcon className="size-3 text-emerald-600" /> Voice call · 4 min
        </p>
      </div>
      <div className="flex items-center gap-2 border-t border-black/5 bg-white px-3 py-2.5">
        <span className="flex-1 rounded-full bg-[#f7f4ef] px-3 py-2 text-[10px] text-black/40">Message</span>
        <span className="grid size-8 place-items-center rounded-full bg-[#f7931e] text-white">
          <Send className="size-3.5" />
        </span>
      </div>
    </div>
  );
}

/**
 * Signing in: members use the email or phone number they registered with and
 * confirm a one-time code, until they choose to set a password.
 */
export function CodeScreen() {
  const digits = ["4", "8", "1", "", "", ""];
  return (
    <div className="flex h-full flex-col px-6 pb-8 pt-6">
      <span className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-[#ffb65c] to-[#f7931e] text-[15px] font-extrabold text-[#3f0d00]">
        V
      </span>
      <p className="mt-6 text-[20px] font-extrabold leading-tight tracking-tight">Confirm it&apos;s you</p>
      <p className="mt-2 text-[11.5px] leading-snug text-black/55">
        We sent a 6-digit code to <span className="font-bold text-black/80">0803 ••• 4567</span>, the number you
        registered with.
      </p>
      <div className="mt-6 grid grid-cols-6 gap-1.5">
        {digits.map((d, i) => (
          <span
            key={i}
            className={clsx(
              "grid aspect-[4/5] place-items-center rounded-xl bg-white text-[18px] font-extrabold",
              i === 3 ? "ring-2 ring-[#f7931e]" : "ring-1 ring-black/10"
            )}
          >
            {d || (i === 3 ? <span className="h-5 w-[2px] animate-pulse bg-[#f7931e]" /> : "")}
          </span>
        ))}
      </div>
      <p className="mt-4 text-[10.5px] text-black/45">
        Resend code in <span className="font-bold text-black/70">0:42</span>
      </p>
      <span className="mt-6 flex items-center justify-center rounded-2xl bg-linear-to-r from-[#f7931e] to-[#ff6a13] py-3 text-[12px] font-extrabold text-white">
        Continue
      </span>
      <div className="mt-auto rounded-2xl bg-white p-3.5 ring-1 ring-black/5">
        <p className="text-[10.5px] font-bold">No password yet?</p>
        <p className="mt-0.5 text-[9.5px] leading-snug text-black/50">
          Each sign-in is confirmed with a fresh code until you set one.
        </p>
      </div>
    </div>
  );
}
