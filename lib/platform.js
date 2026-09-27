/**
 * The Valiant App, as the website presents it. Taken from the platform's own
 * documentation, and limited to what members can use today: features that
 * still run on sample data or scripted answers are left out on purpose.
 */

/** Getting in: register, confirm a code, then set a password. */
export const access = [
  {
    title: "Register",
    body: "Give your NIN, your email address or phone number, and your home address. You are placed at your polling unit and joined to your four communities.",
  },
  {
    title: "Confirm with a code",
    body: "Sign in with the email or phone number you registered with. A one-time code is sent to it, so only you can get in.",
  },
  {
    title: "Set your password",
    body: "Until you set a password, every sign-in is confirmed with a fresh code. Once it is set, sign in with your email or phone number and your password.",
  },
];

/** The structure every member is placed in, from the nation to their polling unit. */
export const ladder = [
  { level: "National", count: "1", note: "The whole Movement" },
  { level: "State", count: "37", note: "36 states and the FCT" },
  { level: "LGA", count: "774", note: "Local government areas" },
  { level: "Ward", count: "8,809", note: "Your ward group" },
  { level: "Polling unit", count: "176,623", note: "Where you vote" },
];

/** What a member can do, one tile each. `icon` names a lucide-react icon. */
export const features = [
  {
    icon: "Newspaper",
    title: "A feed for the Movement",
    body: "Posts, photos, stories and comments from Valiants everywhere, with coordinators' updates from the field pinned where you will see them.",
  },
  {
    icon: "UsersRound",
    title: "Your communities, automatically",
    body: "Your address places you in four groups: your state, LGA, ward and polling unit. Move house and your groups move with you.",
  },
  {
    icon: "MessagesSquare",
    title: "Messages, voice notes and calls",
    body: "Direct messages with read receipts, voice notes and attachments. Voice and video calls, and live group huddles in any community.",
  },
  {
    icon: "WalletCards",
    title: "A wallet and your dues",
    body: "A Naira wallet with your own bank account number for transfers. Monthly dues are paid from it, with reminders before every due date.",
  },
  {
    icon: "IdCard",
    title: "Your member ID",
    body: "A digital membership card with your member code and ward, plus a profile that shows your posts, your communities and what you have given.",
  },
  {
    icon: "Megaphone",
    title: "Recruit, and be rewarded",
    body: "Every member gets a personal invite code. Bring people in and earn wallet bonuses as you climb from Mobilizer to Movement Legend.",
  },
];

/** How every dues payment is shared up the structure. */
export const split = [
  { level: "Ward", share: 50 },
  { level: "LGA", share: 20 },
  { level: "State", share: 20 },
  { level: "National", share: 10 },
];

export const dues = [
  { category: "Regular members", amount: "₦2,000", note: "a month" },
  { category: "Professional members", amount: "₦10,000", note: "a month" },
  { category: "Students, honorary members and institutional partners", amount: "Free", note: "no monthly dues" },
];

export const tiers = [
  { name: "Mobilizer", referrals: 20, bonus: "₦5,000" },
  { name: "Organizer", referrals: 50, bonus: "₦15,000" },
  { name: "Vanguard", referrals: 100, bonus: "₦40,000" },
  { name: "Champion", referrals: 200, bonus: "₦100,000" },
  { name: "Movement Legend", referrals: 1000, bonus: "₦500,000" },
];

/** Plain-language promises about data and money. */
export const safeguards = [
  {
    icon: "Fingerprint",
    title: "Your NIN is never stored in plain text",
    body: "It is kept only as a keyed, one-way code. Passwords are salted and hashed; sessions are stored as hashes too.",
  },
  {
    icon: "ShieldCheck",
    title: "Money only moves when it is confirmed",
    body: "Your wallet is credited only after the payment provider confirms the payment, never on the word of a browser. A duplicate confirmation credits once.",
  },
  {
    icon: "CalendarCheck",
    title: "Dues can never be charged twice",
    body: "Each month's charge is unique per member, enforced by the database itself, and every share of it is recorded against its structure.",
  },
  {
    icon: "PhoneOff",
    title: "No calls from strangers",
    body: "Two members must have messaged each other before either can call. Members can report abuse, and worrying messages alert local leaders.",
  },
];

/** What each level of leadership sees in the coordinator console. */
export const coordinators = [
  { role: "Ward Captain", scope: "One ward" },
  { role: "LGA Coordinator", scope: "One LGA" },
  { role: "State Coordinator", scope: "One state" },
  { role: "National leadership", scope: "The whole Movement" },
];

export const consoleTools = [
  "A live, searchable members database with CSV export",
  "Structure treasuries and their dedicated accounts",
  "Community monitoring and post moderation",
  "A field activity log that appears in members' feeds",
  "A recruitment leaderboard for their area",
];
