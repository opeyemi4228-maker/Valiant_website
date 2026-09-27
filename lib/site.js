/**
 * Everything the site says about the Movement, in one place.
 *
 * The wording is the Movement's own, taken from the Handbook, the Declaration
 * and the founder's profile, so a page never paraphrases what the Movement
 * has already said better.
 */

export const site = {
  name: "The Valiant Movement",
  short: "Valiant Movement",
  motto: "Courage, Character, Service.",
  tagline: "Courage to Lead",
  description:
    "A courageous, people-first leadership movement building a new Nigeria from the ground up, raising disciplined, ethical and courageous leaders for service, democracy and Nigeria's progress.",
  url: "https://valiants.me",
  contact: {
    phone: "+234 908 655 5555",
    phoneHref: "tel:+2349086555555",
    altPhone: "+234 703 493 1585",
    altPhoneHref: "tel:+2347034931585",
    email: "info@valiants.me",
    location: "Abuja, Nigeria",
  },
  links: {
    donate: "https://donorbox.org/naija-we-can-and-valiant-movement",
    whatsapp: "https://chat.whatsapp.com/BAXcGFFgLl45tXeZqXRcUS",
    youtube: "https://www.youtube.com/@valiantchoir",
    linkedin: "https://www.linkedin.com/in/valiantchoir/",
    app: "https://valiant-movement.vercel.app",
    appRegister: "https://valiant-movement.vercel.app/register",
    appLogin: "https://valiant-movement.vercel.app/login",
  },
};

export const nav = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about", note: "Preamble, mission, vision and philosophy" },
      { label: "Meet the Founder", href: "/founder", note: "Valentine Chineto Ozigbo" },
      { label: "Declaration & Pledge", href: "/pledge", note: "The words every Valiant lives by" },
      { label: "Code of Ethics", href: "/ethics", note: "Culture, ethics and conduct" },
      { label: "Membership & Culture", href: "/membership", note: "Eligibility, rights and duties" },
    ],
  },
  { label: "Programmes", href: "/programmes" },
  { label: "The App", href: "/app" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const values = [
  "Truth",
  "Courage",
  "Discipline",
  "Excellence",
  "Service",
  "Justice",
  "Responsibility",
  "Unity",
];

export const against = ["Corruption", "Injustice", "Apathy", "Bad governance"];
export const standFor = ["Democracy", "Equity", "People-power", "Unity", "Service"];

export const rise = [
  {
    letter: "R",
    title: "Resist",
    body: "Resist corruption and criminality in public office, in our communities and in ourselves.",
    image: "/images/gallery/g09.jpg",
  },
  {
    letter: "I",
    title: "Inspire",
    body: "Inspire bold leadership that places the people above power and the nation above self.",
    image: "/images/gallery/g10.jpg",
  },
  {
    letter: "S",
    title: "Speak up",
    body: "Speak up for democracy, defend the people's mandate and protect every vote cast.",
    image: "/images/gallery/g20.jpg",
  },
  {
    letter: "E",
    title: "Engage",
    body: "Engage and empower the people, ward by ward and polling unit by polling unit.",
    image: "/images/gallery/g01.jpg",
  },
];

export const objectives = [
  {
    title: "Empower Grassroots Leaders",
    body: "Develop articulate, capable leaders who influence communities with integrity.",
    image: "/images/gallery/g05.jpg",
  },
  {
    title: "Build a Resilient Democratic Culture",
    body: "Strengthen civic participation and protect the people's mandate.",
    image: "/images/gallery/g11.jpg",
  },
  {
    title: "Enhance Strategic Communication",
    body: "Train leaders to speak with discipline, clarity and unity of purpose.",
    image: "/images/gallery/g23.jpg",
  },
  {
    title: "Multiply Leadership Downlines",
    body: "Ensure leadership values are replicated across wards and polling units nationwide.",
    image: "/images/gallery/g07.jpg",
  },
  {
    title: "Drive Community Engagement",
    body: "Promote actionable, service-driven projects that uplift communities.",
    image: "/images/gallery/g06.jpg",
  },
];

export const dna = [
  { title: "Visionary Leadership", body: "We lead with foresight, clarity and purpose." },
  { title: "Accountability & Integrity", body: "We uphold truth, honour and transparency in all we do." },
  { title: "Loyalty to People & Nation", body: "We commit to Nigeria above personal or sectional ambition." },
  { title: "Innovation & Impact", body: "We think boldly and create measurable solutions." },
  { title: "Active Citizenship", body: "We mobilise, educate and defend civic participation." },
  { title: "Nation-Building through Service", body: "We strengthen communities through fairness and empowerment." },
  { title: "Tenacity & Resilience", body: "We do not retreat. We rise stronger after every challenge." },
];

export const declaration = [
  "I am a Valiant.",
  "I am not here for myself alone; I am here for my people, my community, and my nation.",
  "I rise with courage, I lead with vision, and I serve with integrity.",
  "I reject corruption, injustice, apathy, and bad governance.",
  "I stand for democracy, equity, people power, unity, and service.",
  "I will multiply these values until they live in every heart across Nigeria.",
  "This is my oath. This is my identity.",
];

export const programmes = [
  {
    kicker: "Leadership training",
    title: "The Valiant DNA Experience",
    body: "Immersive leadership training where values are not only learned, but lived.",
    image: "/images/gallery/g02.jpg",
    href: "/programmes#dna-experience",
    cta: "Explore the programme",
  },
  {
    kicker: "Flagship convening",
    title: "The Valiant Gathering",
    body: "Our flagship convening, raising a new generation of leaders.",
    image: "/images/gallery/g24.jpg",
    href: "/events",
    cta: "See upcoming events",
  },
  {
    kicker: "Youth & culture",
    title: "Valiant Youth Choir Competition",
    body: "Youth choirs aged 20 and below sing for faith, discipline and excellence.",
    image: "/images/gallery/g15.jpg",
    href: "/programmes/choir",
    cta: "Register a choir",
  },
];

export const membershipCategories = [
  "Student Members",
  "Regular Members",
  "Professional Members",
  "Diaspora Members",
  "Honorary Members",
  "Institutional Partners",
];

/** INEC's register as it stands: the ground the Movement is organising. */
export const reach = [
  { value: 37, label: "States & FCT" },
  { value: 774, label: "Local governments" },
  { value: 8809, label: "Wards" },
  { value: 176623, label: "Polling units" },
];

export const founder = {
  name: "Valentine Chineto Ozigbo",
  honours: "BSc, MBA, MSc, FCA, FCIT, FICA, FITP, JP",
  role: "Founder & Convener",
  image: "/images/founder-portrait.jpg",
  summary:
    "Nigerian business leader, public intellectual, philanthropist, author and nation-building advocate. Immediate Past President and Group CEO of Transcorp Plc, Founder of the VCO Foundation, Chevening Scholar and author of The Equilibrium Effect.",
  quote:
    "Societies are transformed when citizens find the courage to build.",
  highlights: [
    "Past President & Group CEO, Transcorp Plc",
    "Founder, VCO Foundation",
    "MSc Finance with Distinction, Lancaster University",
    "Visiting Associate Professor, UNIZIK",
  ],
};

/** Every photograph with its dimensions. g21 is left out: a Wi-Fi password is legible on the stage sign. */
export const galleryPhotos = [
  { src: "/images/gallery/g01.jpg", width: 1200, height: 676 },
  { src: "/images/gallery/g02.jpg", width: 1200, height: 676 },
  { src: "/images/gallery/g03.jpg", width: 432, height: 618 },
  { src: "/images/gallery/g04.jpg", width: 1200, height: 676 },
  { src: "/images/gallery/g05.jpg", width: 1200, height: 676 },
  { src: "/images/gallery/g06.jpg", width: 1200, height: 676 },
  { src: "/images/gallery/g07.jpg", width: 1200, height: 900 },
  { src: "/images/gallery/g08.jpg", width: 1200, height: 900 },
  { src: "/images/gallery/g09.jpg", width: 1200, height: 900 },
  { src: "/images/gallery/g10.jpg", width: 1200, height: 675 },
  { src: "/images/gallery/g11.jpg", width: 1200, height: 675 },
  { src: "/images/gallery/g12.jpg", width: 1200, height: 804 },
  { src: "/images/gallery/g13.jpg", width: 1200, height: 1109 },
  { src: "/images/gallery/g14.jpg", width: 1200, height: 676 },
  { src: "/images/gallery/g15.jpg", width: 1080, height: 608 },
  { src: "/images/gallery/g16.jpg", width: 1080, height: 608 },
  { src: "/images/gallery/g17.jpg", width: 1080, height: 608 },
  { src: "/images/gallery/g18.jpg", width: 1080, height: 686 },
  { src: "/images/gallery/g19.jpg", width: 1080, height: 608 },
  { src: "/images/gallery/g20.jpg", width: 1080, height: 636 },
  { src: "/images/gallery/g22.jpg", width: 1080, height: 708 },
  { src: "/images/gallery/g23.jpg", width: 1080, height: 666 },
  { src: "/images/gallery/g24.jpg", width: 1080, height: 608 },
];

/** The same photographs as plain paths, for the home page rail. */
export const gallery = galleryPhotos.map((p) => p.src);
