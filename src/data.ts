export type Lang = 'en' | 'mn';
export type L = Record<Lang, string>;

export const UI = {
  en: {
    skip: 'Skip to work',
    nav: { work: 'Work', stack: 'Stack', path: 'Path', contact: 'Contact', hire: 'Start a project' },
    status: 'Taking new projects · Ulaanbaatar',
    name: ['Munkhbaatar', 'Dorjsuren'],
    role: 'Full-stack web & mobile developer',
    lede: "I take products from the first idea to the App Store, Google Play and the client's hands. Payments, video calls, SMS login and AI assistants included.",
    cta1: 'See shipped work',
    cta2: 'Download CV',
    hint: 'Every dot in orbit is a product I shipped. Hover one.',
    hintTouch: 'Every dot in orbit is a product I shipped. Tap one.',
    scroll: 'Scroll',
    profile:
      'Coding since 14. About five years in, the last one as a freelancer: nine products delivered, eight apps live in the stores, and features that matter to a business — payments, video calls, SMS verification and AI assistants.',
    results: 'Key results',
    workTitle: 'Shipped work',
    workSub: 'Built for clients, used by real people. Most of it alone, end to end.',
    stackTitle: 'The toolkit',
    stackSub: 'Main stack first. Everything else is what the product needed.',
    pathTitle: 'The path so far',
    edu: 'Education',
    langs: 'Languages',
    contactTitle: "Have a product in mind? Let's build it.",
    contactSub: "Web, iOS, Android or Odoo ERP. Tell me what you need and I'll reply within a day.",
    copy: 'Copy email',
    copied: 'Email copied',
    phone: 'Phone',
    footer: 'Made in Ulaanbaatar',
    visit: 'Visit',
    users: 'users',
    views: 'page views',
    first2: 'In the first 2 months',
    cv: '/cv-en.pdf',
  },
  mn: {
    skip: 'Төслүүд рүү очих',
    nav: { work: 'Төслүүд', stack: 'Ур чадвар', path: 'Туршлага', contact: 'Холбоо барих', hire: 'Төсөл эхлүүлэх' },
    status: 'Шинэ төсөл авч байна · Улаанбаатар',
    name: ['Мөнхбаатар', 'Доржсүрэн'],
    role: 'Full-stack вэб ба мобайл хөгжүүлэгч',
    lede: 'Бүтээгдэхүүнийг санаанаас нь эхлээд App Store, Google Play-д гаргаж, захиалагчид хүлээлгэн өгөх хүртэл бүрэн хариуцна. QPay төлбөр, видео дуудлага, SMS нэвтрэлт, AI туслах бүгд багтана.',
    cta1: 'Хийсэн ажлууд',
    cta2: 'CV татах',
    hint: 'Тойрог зам дахь цэг бүр миний гаргасан бүтээгдэхүүн. Хулганаа аваачаад үзээрэй.',
    hintTouch: 'Тойрог зам дахь цэг бүр миний гаргасан бүтээгдэхүүн. Аль нэг дээр нь дараарай.',
    scroll: 'Гүйлгэх',
    profile:
      '14 настайгаасаа код бичиж эхэлсэн, 5 орчим жилийн туршлагатай. Сүүлийн нэг жил бие даан ажиллаж, 9 бүтээгдэхүүн хүлээлгэн өгч, 8 аппыг store-д гаргасан. QPay төлбөр, видео дуудлага, SMS баталгаажуулалт, AI туслах зэрэг бизнест шууд үр өгөөжтэй шийдлүүдийг нэвтрүүлдэг.',
    results: 'Гол үр дүн',
    workTitle: 'Хүлээлгэн өгсөн ажлууд',
    workSub: 'Захиалагчдад зориулж хийсэн, бодит хэрэглэгчтэй. Ихэнхийг нь ганцаараа, эхнээс нь дуустал.',
    stackTitle: 'Ур чадвар',
    stackSub: 'Эхэнд нь үндсэн stack. Бусад нь бүтээгдэхүүн шаардсан технологиуд.',
    pathTitle: 'Туулсан зам',
    edu: 'Боловсрол',
    langs: 'Хэл',
    contactTitle: 'Санаа байна уу? Хамт бүтээе.',
    contactSub: 'Вэб, iOS, Android эсвэл Odoo ERP. Юу хэрэгтэйгээ бичээрэй, нэг өдрийн дотор хариулна.',
    copy: 'Имэйл хуулах',
    copied: 'Имэйл хуулагдлаа',
    phone: 'Утас',
    footer: 'Улаанбаатарт бүтээв',
    visit: 'Үзэх',
    users: 'хэрэглэгч',
    views: 'хуудас үзэлт',
    first2: 'Эхний 2 сард',
    cv: '/cv-mn.pdf',
  },
} as const;

export const STATS: { n: number; s: string; label: L }[] = [
  { n: 9, s: '', label: { en: 'products delivered to clients', mn: 'хүлээлгэн өгсөн бүтээгдэхүүн' } },
  { n: 8, s: '', label: { en: 'live apps: 5 iOS, 3 Android', mn: 'live апп: 5 iOS, 3 Android' } },
  { n: 126, s: 'K', label: { en: 'Newsac.mn users in 2 months', mn: 'Newsac.mn хэрэглэгч, 2 сард' } },
  { n: 622, s: 'K', label: { en: 'Newsac.mn page views in 2 months', mn: 'Newsac.mn хуудас үзэлт, 2 сард' } },
  { n: 200, s: '+', label: { en: 'orders on Soyol Shop', mn: 'Soyol Shop захиалга' } },
  { n: 100, s: '+', label: { en: 'bookings on Achira', mn: 'Achira цаг захиалга' } },
];

export type Kind = 'web' | 'mobile';
export interface Project {
  id: string;
  name: string;
  url?: string;
  plat: string[];
  kind: Kind[];
  metric: L;
  desc: L;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'newsac', name: 'Newsac.mn', featured: true, url: 'https://newsac.mn', plat: ['Web'], kind: ['web'],
    metric: { en: '126K users · 622K views in 2 months', mn: '126K хэрэглэгч · 622K үзэлт, 2 сард' },
    desc: {
      en: 'Built solo, end to end: a media platform with news, video and reels, an online shop, QR concert tickets and an admin CMS.',
      mn: 'Ганцаараа бүрэн хийсэн медиа платформ: мэдээ, видео ба reels, онлайн дэлгүүр, QR концертын тасалбар, админ CMS.',
    },
  },
  {
    id: 'soyol', name: 'Soyol Shop', plat: ['iOS', 'Android'], kind: ['mobile'],
    metric: { en: '200+ orders', mn: '200+ захиалга' },
    desc: {
      en: 'E-commerce app with live video shopping, SMS OTP login and a Gemini AI shopping assistant.',
      mn: 'Шууд видео худалдаа, SMS OTP нэвтрэлт, Gemini AI худалдааны туслахтай онлайн дэлгүүр.',
    },
  },
  {
    id: 'achira', name: 'Achira', url: 'https://achira.mn', plat: ['Web', 'iOS'], kind: ['web', 'mobile'],
    metric: { en: '100+ bookings', mn: '100+ цаг захиалга' },
    desc: {
      en: 'Barber booking by barber and time slot, customer accounts and a product shop.',
      mn: 'Үсчин болон цагийн сонголтоор захиалга авах систем, хэрэглэгчийн бүртгэл, бүтээгдэхүүний дэлгүүр.',
    },
  },
  {
    id: 'gevabal', name: 'Gevabal', plat: ['iOS', 'Android'], kind: ['mobile'],
    metric: { en: 'QPay · LiveKit video', mn: 'QPay · LiveKit видео' },
    desc: {
      en: 'Video consultation platform: booking, QPay payments, LiveKit video calls and chat.',
      mn: 'Зөвлөхтэй видео зөвлөгөөний платформ: цаг захиалга, QPay төлбөр, видео дуудлага, чат.',
    },
  },
  {
    id: 'aupair', name: 'Aupair Mongolia', plat: ['Web', 'iOS', 'Android'], kind: ['web', 'mobile'],
    metric: { en: 'Multilingual matching', mn: 'Олон хэлтэй' },
    desc: {
      en: 'Au pair agency website and matching app: profiles, video interviews, multiple languages.',
      mn: 'Au pair агентлагийн вэб болон тохируулах апп: профайл, видео ярилцлага, олон хэл.',
    },
  },
  {
    id: 'trails', name: 'Mongoltrails.com', url: 'https://mongoltrails.com', plat: ['Web'], kind: ['web'],
    metric: { en: '20+ tour packages', mn: '20+ аяллын багц' },
    desc: {
      en: 'Travel platform with GPX route maps, reviews and a blog editor.',
      mn: 'Аялал жуулчлалын платформ: GPX маршрутын газрын зураг, сэтгэгдэл, блог засварлагч.',
    },
  },
  {
    id: 'dcapital', name: 'DCapital.mn', url: 'https://dcapital.mn', plat: ['Web'], kind: ['web'],
    metric: { en: 'Course marketplace', mn: 'Сургалтын маркетплейс' },
    desc: {
      en: 'Instructors upload lessons, learners buy and watch them.',
      mn: 'Багш хичээл байршуулж, суралцагч худалдан авч үзнэ.',
    },
  },
  {
    id: 'khanz', name: 'Khanz.mn', url: 'https://khanz.mn', plat: ['Web'], kind: ['web'],
    metric: { en: 'Language academy', mn: 'Хэлний академи' },
    desc: {
      en: 'Interactive website for a Chinese language academy.',
      mn: 'Хятад хэлний академийн интерактив вэбсайт.',
    },
  },
  {
    id: 'volunteer', name: 'Volunteer Mongolia', plat: ['iOS'], kind: ['mobile'],
    metric: { en: 'On the App Store', mn: 'App Store дээр' },
    desc: {
      en: 'Volunteer program app, published on the App Store.',
      mn: 'Сайн дурын хөтөлбөрийн апп, App Store дээр нийтлэгдсэн.',
    },
  },
];

export const CORE = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Flutter'];

export const MARQUEE = [
  'Next.js', 'React 19', 'Flutter', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL', 'QPay', 'LiveKit', 'Odoo', 'Gemini', 'Swift', 'Kotlin',
];

export const STACK: { title: L; items: string[] }[] = [
  { title: { en: 'Languages', mn: 'Хэл' }, items: ['TypeScript', 'JavaScript', 'Dart', 'Swift', 'Kotlin', 'SQL'] },
  { title: { en: 'Frontend', mn: 'Frontend' }, items: ['React 19', 'Next.js 16', 'Vite', 'Tailwind 4', 'Zustand', 'SWR', 'Zod', 'next-intl'] },
  { title: { en: 'Mobile', mn: 'Мобайл' }, items: ['Flutter', 'Riverpod', 'go_router', 'Dio', 'Shorebird', 'Expo', 'Capacitor'] },
  { title: { en: 'Backend', mn: 'Backend' }, items: ['Node.js', 'Express', 'REST APIs', 'Clerk auth', 'Upstash rate limiting'] },
  { title: { en: 'Data', mn: 'Өгөгдлийн сан' }, items: ['PostgreSQL (RLS)', 'Supabase', 'MongoDB', 'Mongoose', 'Prisma', 'Redis'] },
  { title: { en: 'Cloud & publishing', mn: 'Cloud, нийтлэл' }, items: ['Firebase', 'Vercel', 'App Store', 'Google Play'] },
  { title: { en: 'Integrations', mn: 'Интеграц' }, items: ['QPay', 'LiveKit', 'Ably', 'Twilio SMS', 'FCM push', 'Mapbox', 'Resend', 'Apple / Google sign-in'] },
  { title: { en: 'AI', mn: 'AI' }, items: ['Vercel AI SDK', 'OpenRouter', 'OpenAI', 'Gemini', 'Claude'] },
  { title: { en: 'ERP & other', mn: 'ERP, бусад' }, items: ['Odoo', 'Tiptap', 'Rust / WASM', 'Vitest'] },
];

export const TIMELINE: { now?: boolean; when: L; title: L; where: L; points: Record<Lang, string[]> }[] = [
  {
    now: true,
    when: { en: 'Oct 2025 — now', mn: '2025.10 — одоо' },
    title: { en: 'Freelance Full-Stack Web & Mobile Developer', mn: 'Freelance Full-Stack Web & Mobile Developer' },
    where: { en: 'Self-employed · Ulaanbaatar', mn: 'Бие даасан хөгжүүлэгч · Улаанбаатар' },
    points: {
      en: [
        'Delivered 9 web and mobile products, handling every stage alone: requirements, design, development, testing, release and handover.',
        'Built and handed over a web service for New Culture Reason.',
        'Delivering Odoo ERP implementation and configuration projects for companies.',
        'Published 5 iOS and 3 Android apps through App Store Connect and Google Play Console.',
        'Integrated QPay payments, LiveKit video calls, Twilio SMS OTP, push notifications and Gemini/OpenAI features.',
      ],
      mn: [
        '9 вэб болон мобайл бүтээгдэхүүнийг шаардлага, дизайн, хөгжүүлэлт, тест, нийтлэл, хүлээлгэн өгөх бүх шатанд ганцаараа гүйцэтгэсэн.',
        '“New Culture Reason” компанид вэб үйлчилгээ хөгжүүлж, бүрэн хүлээлгэн өгсөн.',
        'Байгууллагуудад Odoo ERP нэвтрүүлэх, тохируулах ажлыг гүйцэтгэж байна.',
        'App Store Connect, Google Play Console-оор 5 iOS, 3 Android апп нийтлүүлсэн.',
        'QPay төлбөр, LiveKit видео дуудлага, Twilio SMS OTP, push мэдэгдэл, Gemini/OpenAI интеграц нэвтрүүлсэн.',
      ],
    },
  },
  {
    when: { en: '2021 — 2025', mn: '2021 — 2025' },
    title: { en: 'Self-taught developer', mn: 'Өөрөө суралцсан хөгжүүлэгч' },
    where: { en: 'Started coding at 14', mn: '14 настайгаасаа код бичиж эхэлсэн' },
    points: {
      en: ['Learned web development on my own and built personal projects.'],
      mn: ['Вэб хөгжүүлэлтийг бие даан сурч, хувийн төслүүд хийсэн.'],
    },
  },
];

export const LANGS: Record<Lang, [string, string]>[] = [
  { en: ['Mongolian', 'Native'], mn: ['Монгол', 'Эх хэл'] },
  { en: ['English', 'Conversational (B1–B2)'], mn: ['Англи', 'Ярианы түвшин (B1–B2)'] },
  { en: ['German', 'B2'], mn: ['Герман', 'B2'] },
];

export const EMAIL = 'bmunh95@gmail.com';
