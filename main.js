(() => {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- content ---------------- */

  const T = {
    en: {
      skip: "Skip to work",
      "nav.work": "Work", "nav.stack": "Stack", "nav.path": "Path", "nav.contact": "Contact",
      "nav.hire": "Start a project",
      "hero.status": "Taking new projects · Ulaanbaatar",
      "hero.role": "Full-stack web & mobile developer",
      "hero.lede": "I take products from the first idea to the App Store, Google Play and the client's hands. Payments, video calls, SMS login and AI assistants included.",
      "hero.cta1": "See shipped work", "hero.cta2": "Download CV",
      "hero.hint": "Every dot in orbit is a product I shipped. Hover one.",
      "hero.hintTouch": "Every dot in orbit is a product I shipped. Tap one.",
      "results.title": "Key results",
      "work.title": "Shipped work",
      "work.sub": "Built for clients, used by real people. Most of it alone, end to end.",
      "stack.title": "The toolkit",
      "stack.sub": "Main stack first. Everything else is what the product needed.",
      "path.title": "The path so far",
      "edu.title": "Education", "lang.title": "Languages",
      "contact.title": "Have a product in mind? Let's build it.",
      "contact.sub": "Web, iOS, Android or Odoo ERP. Tell me what you need and I'll reply within a day.",
      "contact.copy": "Copy email", "contact.copied": "Email copied", "contact.phone": "Phone",
      footer: "Made in Ulaanbaatar",
      visit: "Visit site",
      all: "All",
      name: ["Munkhbaatar", "Dorjsuren"],
      cv: "assets/cv-en.pdf",
    },
    mn: {
      skip: "Төслүүд рүү очих",
      "nav.work": "Төслүүд", "nav.stack": "Ур чадвар", "nav.path": "Туршлага", "nav.contact": "Холбоо барих",
      "nav.hire": "Төсөл эхлүүлэх",
      "hero.status": "Шинэ төсөл авч байна · Улаанбаатар",
      "hero.role": "Full-stack вэб ба мобайл хөгжүүлэгч",
      "hero.lede": "Бүтээгдэхүүнийг санаанаас нь эхлээд App Store, Google Play-д гаргаж, захиалагчид хүлээлгэн өгөх хүртэл бүрэн хариуцна. QPay төлбөр, видео дуудлага, SMS нэвтрэлт, AI туслах бүгд багтана.",
      "hero.cta1": "Хийсэн ажлууд", "hero.cta2": "CV татах",
      "hero.hint": "Тойрог зам дахь цэг бүр миний гаргасан бүтээгдэхүүн. Хулганаа аваачаад үзээрэй.",
      "hero.hintTouch": "Тойрог зам дахь цэг бүр миний гаргасан бүтээгдэхүүн. Аль нэг дээр нь дараарай.",
      "results.title": "Гол үр дүн",
      "work.title": "Хүлээлгэн өгсөн ажлууд",
      "work.sub": "Захиалагчдад зориулж хийсэн, бодит хэрэглэгчтэй. Ихэнхийг нь ганцаараа, эхнээс нь дуустал.",
      "stack.title": "Ур чадвар",
      "stack.sub": "Эхэнд нь үндсэн stack. Бусад нь бүтээгдэхүүн шаардсан технологиуд.",
      "path.title": "Туулсан зам",
      "edu.title": "Боловсрол", "lang.title": "Хэл",
      "contact.title": "Санаа байна уу? Хамт бүтээе.",
      "contact.sub": "Вэб, iOS, Android эсвэл Odoo ERP. Юу хэрэгтэйгээ бичээрэй, нэг өдрийн дотор хариулна.",
      "contact.copy": "Имэйл хуулах", "contact.copied": "Имэйл хуулагдлаа", "contact.phone": "Утас",
      footer: "Улаанбаатарт бүтээв",
      visit: "Сайт үзэх",
      all: "Бүгд",
      name: ["Мөнхбаатар", "Доржсүрэн"],
      cv: "assets/cv-mn.pdf",
    },
  };

  const STATS = [
    { n: 9, s: "", en: "products delivered to clients", mn: "хүлээлгэн өгсөн бүтээгдэхүүн" },
    { n: 8, s: "", en: "live apps: 5 iOS, 3 Android", mn: "live апп: 5 iOS, 3 Android" },
    { n: 126, s: "K", en: "Newsac.mn users in 2 months", mn: "Newsac.mn хэрэглэгч, 2 сард" },
    { n: 622, s: "K", en: "Newsac.mn page views in 2 months", mn: "Newsac.mn хуудас үзэлт, 2 сард" },
    { n: 200, s: "+", en: "orders on Soyol Shop", mn: "Soyol Shop захиалга" },
    { n: 100, s: "+", en: "bookings on Achira", mn: "Achira цаг захиалга" },
  ];

  // kind: web | mobile — used by filters and the orbit colors
  const PROJECTS = [
    {
      id: "newsac", name: "Newsac.mn", size: "big", url: "https://newsac.mn", plat: ["Web"], kind: ["web"],
      metric: { en: "126K users · 622K views in 2 months", mn: "126K хэрэглэгч · 622K үзэлт, 2 сард" },
      desc: {
        en: "Built solo, end to end: a media platform with news, video and reels, an online shop, QR concert tickets and an admin CMS.",
        mn: "Ганцаараа бүрэн хийсэн медиа платформ: мэдээ, видео ба reels, онлайн дэлгүүр, QR концертын тасалбар, админ CMS.",
      },
    },
    {
      id: "soyol", name: "Soyol Shop", plat: ["iOS", "Android"], kind: ["mobile"],
      metric: { en: "200+ orders", mn: "200+ захиалга" },
      desc: {
        en: "E-commerce app with live video shopping, SMS OTP login and a Gemini AI shopping assistant.",
        mn: "Шууд видео худалдаа, SMS OTP нэвтрэлт, Gemini AI худалдааны туслахтай онлайн дэлгүүр.",
      },
    },
    {
      id: "achira", name: "Achira", url: "https://achira.mn", plat: ["Web", "iOS"], kind: ["web", "mobile"],
      metric: { en: "100+ bookings", mn: "100+ цаг захиалга" },
      desc: {
        en: "Barber booking by barber and time slot, customer accounts and a product shop.",
        mn: "Үсчин болон цагийн сонголтоор захиалга авах систем, хэрэглэгчийн бүртгэл, бүтээгдэхүүний дэлгүүр.",
      },
    },
    {
      id: "gevabal", name: "Gevabal", plat: ["iOS", "Android"], kind: ["mobile"],
      metric: { en: "QPay · LiveKit video", mn: "QPay · LiveKit видео" },
      desc: {
        en: "Video consultation platform: booking, QPay payments, LiveKit video calls and chat.",
        mn: "Зөвлөхтэй видео зөвлөгөөний платформ: цаг захиалга, QPay төлбөр, видео дуудлага, чат.",
      },
    },
    {
      id: "aupair", name: "Aupair Mongolia", plat: ["Web", "iOS", "Android"], kind: ["web", "mobile"],
      metric: { en: "Multilingual matching", mn: "Олон хэлтэй" },
      desc: {
        en: "Au pair agency website and matching app: profiles, video interviews, multiple languages.",
        mn: "Au pair агентлагийн вэб болон тохируулах апп: профайл, видео ярилцлага, олон хэл.",
      },
    },
    {
      id: "trails", name: "Mongoltrails.com", url: "https://mongoltrails.com", plat: ["Web"], kind: ["web"],
      metric: { en: "20+ tour packages", mn: "20+ аяллын багц" },
      desc: {
        en: "Travel platform with GPX route maps, reviews and a blog editor.",
        mn: "Аялал жуулчлалын платформ: GPX маршрутын газрын зураг, сэтгэгдэл, блог засварлагч.",
      },
    },
    {
      id: "dcapital", name: "DCapital.mn", url: "https://dcapital.mn", plat: ["Web"], kind: ["web"],
      metric: { en: "Course marketplace", mn: "Сургалтын маркетплейс" },
      desc: {
        en: "Instructors upload lessons, learners buy and watch them.",
        mn: "Багш хичээл байршуулж, суралцагч худалдан авч үзнэ.",
      },
    },
    {
      id: "khanz", name: "Khanz.mn", url: "https://khanz.mn", plat: ["Web"], kind: ["web"],
      metric: { en: "Language academy", mn: "Хэлний академи" },
      desc: {
        en: "Interactive website for a Chinese language academy.",
        mn: "Хятад хэлний академийн интерактив вэбсайт.",
      },
    },
    {
      id: "volunteer", name: "Volunteer Mongolia", plat: ["iOS"], kind: ["mobile"],
      metric: { en: "On the App Store", mn: "App Store дээр" },
      desc: {
        en: "Volunteer program app, published on the App Store.",
        mn: "Сайн дурын хөтөлбөрийн апп, App Store дээр нийтлэгдсэн.",
      },
    },
  ];

  const FILTERS = [
    { id: "all" },
    { id: "web", en: "Web", mn: "Вэб" },
    { id: "mobile", en: "iOS / Android", mn: "iOS / Android" },
  ];

  const CORE = ["Next.js", "React", "TypeScript", "Node.js", "Flutter"];
  const STACK = [
    { en: "Languages", mn: "Хэл", items: ["TypeScript", "JavaScript", "Dart", "Swift", "Kotlin", "SQL"] },
    { en: "Frontend", mn: "Frontend", items: ["React 19", "Next.js 16", "Vite", "Tailwind 4", "Zustand", "SWR", "Zod", "next-intl"] },
    { en: "Mobile", mn: "Мобайл", items: ["Flutter", "Riverpod", "go_router", "Dio", "Shorebird", "Expo", "Capacitor"] },
    { en: "Backend", mn: "Backend", items: ["Node.js", "Express", "REST APIs", "Clerk auth", "Upstash rate limiting"] },
    { en: "Data", mn: "Өгөгдлийн сан", items: ["PostgreSQL (RLS)", "Supabase", "MongoDB", "Mongoose", "Prisma", "Redis"] },
    { en: "Cloud & publishing", mn: "Cloud, нийтлэл", items: ["Firebase", "Vercel", "App Store", "Google Play"] },
    { en: "Integrations", mn: "Интеграц", items: ["QPay", "LiveKit", "Ably", "Twilio SMS", "FCM push", "Mapbox", "Resend", "Apple / Google sign-in"] },
    { en: "AI", mn: "AI", items: ["Vercel AI SDK", "OpenRouter", "OpenAI", "Gemini", "Claude"] },
    { en: "ERP & other", mn: "ERP, бусад", items: ["Odoo", "Tiptap", "Rust / WASM", "Vitest"] },
  ];

  const TIMELINE = [
    {
      now: true,
      when: { en: "Oct 2025 — now", mn: "2025.10 — одоо" },
      title: "Freelance Full-Stack Web & Mobile Developer",
      where: { en: "Self-employed · Ulaanbaatar", mn: "Бие даасан хөгжүүлэгч · Улаанбаатар" },
      points: {
        en: [
          "Delivered 9 web and mobile products, handling every stage alone: requirements, design, development, testing, release and handover.",
          "Built and handed over a web service for New Culture Reason.",
          "Delivering Odoo ERP implementation and configuration projects for companies.",
          "Published 5 iOS and 3 Android apps through App Store Connect and Google Play Console.",
          "Integrated QPay payments, LiveKit video calls, Twilio SMS OTP, push notifications and Gemini/OpenAI features.",
        ],
        mn: [
          "9 вэб болон мобайл бүтээгдэхүүнийг шаардлага, дизайн, хөгжүүлэлт, тест, нийтлэл, хүлээлгэн өгөх бүх шатанд ганцаараа гүйцэтгэсэн.",
          "“New Culture Reason” компанид вэб үйлчилгээ хөгжүүлж, бүрэн хүлээлгэн өгсөн.",
          "Байгууллагуудад Odoo ERP нэвтрүүлэх, тохируулах ажлыг гүйцэтгэж байна.",
          "App Store Connect, Google Play Console-оор 5 iOS, 3 Android апп нийтлүүлсэн.",
          "QPay төлбөр, LiveKit видео дуудлага, Twilio SMS OTP, push мэдэгдэл, Gemini/OpenAI интеграц нэвтрүүлсэн.",
        ],
      },
    },
    {
      when: { en: "2021 — 2025", mn: "2021 — 2025" },
      title: { en: "Self-taught developer", mn: "Өөрөө суралцсан хөгжүүлэгч" },
      where: { en: "Started coding at 14", mn: "14 настайгаасаа код бичиж эхэлсэн" },
      points: {
        en: ["Learned web development on my own and built personal projects."],
        mn: ["Вэб хөгжүүлэлтийг бие даан сурч, хувийн төслүүд хийсэн."],
      },
    },
  ];

  const LANGS = [
    { en: ["Mongolian", "Native"], mn: ["Монгол", "Эх хэл"] },
    { en: ["English", "Conversational (B1–B2)"], mn: ["Англи", "Ярианы түвшин (B1–B2)"] },
    { en: ["German", "B2"], mn: ["Герман", "B2"] },
  ];

  /* ---------------- helpers ---------------- */

  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pick = (v, l) => (v && typeof v === "object" && !Array.isArray(v) ? v[l] : v);

  let lang = "en";
  let filter = "all";

  /* ---------------- render ---------------- */

  function renderStats() {
    $("#stats").innerHTML = STATS.map((s) =>
      `<li><span class="num" data-n="${s.n}" data-s="${s.s}">${s.n}${s.s}</span><span class="lbl">${esc(s[lang])}</span></li>`
    ).join("");
  }

  const bigArt = `<svg class="big-art" viewBox="0 0 200 200" aria-hidden="true" fill="none" stroke="currentColor">
    <g stroke="#8ff3ff" stroke-opacity=".5"><ellipse cx="100" cy="100" rx="96" ry="34" transform="rotate(-20 100 100)"/>
    <ellipse cx="100" cy="100" rx="70" ry="24" transform="rotate(30 100 100)"/>
    <ellipse cx="100" cy="100" rx="40" ry="40" stroke-dasharray="2 6"/></g>
    <circle cx="100" cy="100" r="12" fill="#ffb547" stroke="none"/></svg>`;

  function renderProjects() {
    $("#filters").innerHTML = FILTERS.map((f) =>
      `<button type="button" data-f="${f.id}" aria-pressed="${f.id === filter}">${esc(f.id === "all" ? T[lang].all : f[lang])}</button>`
    ).join("");

    $("#projects").innerHTML = PROJECTS.map((p) => {
      const plat = p.plat.map((x) => `<span>${x}</span>`).join("");
      const visit = p.url ? `<a class="visit" href="${p.url}" target="_blank" rel="noopener">${T[lang].visit}: ${p.url.replace("https://", "")}</a>` : "";
      const dim = filter !== "all" && !p.kind.includes(filter) ? " dim" : "";
      if (p.size === "big") {
        return `<article class="proj big${dim}" id="p-${p.id}">${bigArt}
          <div class="proj-top"><h3>${p.name}</h3><div class="plat">${plat}</div></div>
          <div class="big-figs"><div><b>126K</b><span>${lang === "en" ? "users" : "хэрэглэгч"}</span></div>
          <div><b>622K</b><span>${lang === "en" ? "page views" : "хуудас үзэлт"}</span></div></div>
          <p class="metric">${lang === "en" ? "In the first 2 months" : "Эхний 2 сард"}</p>
          <p class="desc">${esc(p.desc[lang])}</p>${visit}</article>`;
      }
      return `<article class="proj${p.size === "wide" ? " wide" : ""}${dim}" id="p-${p.id}">
        <div class="proj-top"><h3>${p.name}</h3><div class="plat">${plat}</div></div>
        <p class="metric">${esc(p.metric[lang])}</p>
        <p class="desc">${esc(p.desc[lang])}</p>${visit}</article>`;
    }).join("");
  }

  function renderStack() {
    $("#core").innerHTML = CORE.map((c) => `<span>${c}</span>`).join("");
    $("#stackGrid").innerHTML = STACK.map((g) =>
      `<div class="grp"><h3>${esc(g[lang])}</h3><ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`
    ).join("");
  }

  function renderPath() {
    $("#timeline").innerHTML = TIMELINE.map((t) =>
      `<li class="${t.now ? "now" : ""}"><div class="when">${esc(t.when[lang])}</div>
        <div><h3>${esc(pick(t.title, lang))}</h3><p class="where">${esc(t.where[lang])}</p>
        <ul>${t.points[lang].map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></li>`
    ).join("");
    $("#langs").innerHTML = LANGS.map((l) => `<li>${esc(l[lang][0])}<span>${esc(l[lang][1])}</span></li>`).join("");
  }

  function setLang(l, animate) {
    lang = T[l] ? l : "en";
    root.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) { /* storage unavailable */ }
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = T[lang][el.dataset.i18n];
      if (v) el.textContent = v;
    });
    document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    $("#cvLink").href = T[lang].cv;
    if (matchMedia("(hover: none)").matches) $(".orbit-hint").textContent = T[lang]["hero.hintTouch"];
    renderStats();
    renderProjects();
    renderStack();
    renderPath();
    scramble($("#name1"), T[lang].name[0], animate);
    scramble($("#name2"), T[lang].name[1], animate);
    statsSeen = false;
    observeStats();
  }

  /* ---------------- name decode ---------------- */

  const GLYPHS = "01<>/{}#*+=ΔΣΩЖӨҮ";
  function scramble(el, text, animate) {
    if (!animate || reduced) { el.textContent = text; return; }
    const start = performance.now();
    const dur = 900 + text.length * 40;
    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      const settled = Math.floor(t * text.length);
      let html = esc(text.slice(0, settled));
      for (let i = settled; i < text.length; i++) {
        html += `<span class="glyph">${esc(GLYPHS[(Math.random() * GLYPHS.length) | 0])}</span>`;
      }
      el.innerHTML = html;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = text;
    }
    requestAnimationFrame(frame);
  }

  /* ---------------- counters ---------------- */

  let statsSeen = false;
  let statsObserver;
  function observeStats() {
    if (statsObserver) statsObserver.disconnect();
    if (reduced || !("IntersectionObserver" in window)) return;
    statsObserver = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting) || statsSeen) return;
      statsSeen = true;
      document.querySelectorAll(".stats .num").forEach((el) => {
        const n = +el.dataset.n, s = el.dataset.s, t0 = performance.now();
        const tick = (now) => {
          const k = Math.min(1, (now - t0) / 1400);
          el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))) + s;
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    statsObserver.observe($("#stats"));
  }

  /* ---------------- orbit canvas ---------------- */

  function orbit() {
    const cv = $("#orbit");
    const ctx = cv.getContext("2d");
    const tip = $("#orbitTip");
    const hero = cv.parentElement;
    let w, h, dpr, cx, cy, R;
    let mouse = { x: -1e4, y: -1e4, inside: false };
    let hovered = null;
    let tilt = { x: 0, y: 0 };

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + 0.2, a: Math.random() * 0.6 + 0.15, p: Math.random() * 6.28,
    }));

    // three rings, products spread across them
    const rings = [
      { r: 0.42, incl: 1.12, rot: -0.35, speed: 0.16 },
      { r: 0.68, incl: 1.2, rot: 0.25, speed: -0.1 },
      { r: 0.95, incl: 1.26, rot: -0.12, speed: 0.065 },
    ];
    const nodes = PROJECTS.map((p, i) => ({
      p, ring: rings[i % 3], phase: (i / PROJECTS.length) * Math.PI * 2 + (i % 3) * 0.7,
      color: p.kind.includes("mobile") && p.kind.includes("web") ? "#ffffff" : p.kind.includes("mobile") ? "#ffb547" : "#8ff3ff",
      sx: 0, sy: 0, depth: 0, size: 0,
    }));

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth; h = hero.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const narrow = w < 820;
      cx = narrow ? w * 0.58 : w * 0.74;
      cy = narrow ? h * 0.2 : h * 0.52;
      R = narrow ? Math.min(w * 0.55, h * 0.22) : Math.min(w * 0.26, h * 0.42);
    }

    function project(ring, angle) {
      // point on a circle, inclined then rotated, simple perspective
      const x0 = Math.cos(angle) * ring.r * R;
      const z0 = Math.sin(angle) * ring.r * R;
      const incl = ring.incl + tilt.y * 0.25;
      const y1 = z0 * Math.cos(incl);
      const z1 = z0 * Math.sin(incl);
      const rot = ring.rot + tilt.x * 0.15;
      const x2 = x0 * Math.cos(rot) - y1 * Math.sin(rot);
      const y2 = x0 * Math.sin(rot) + y1 * Math.cos(rot);
      const persp = 1 + z1 / (R * 3);
      return { x: cx + x2 * persp, y: cy + y2 * persp, z: z1 };
    }

    let last = performance.now();
    let time = 0;
    function draw(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!hovered) time += dt;
      ctx.clearRect(0, 0, w, h);

      // stars
      for (const s of stars) {
        const tw = reduced ? 1 : 0.6 + 0.4 * Math.sin(time * 1.4 + s.p);
        ctx.fillStyle = `rgba(200,215,255,${s.a * tw})`;
        ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, 6.283); ctx.fill();
      }

      // rings
      for (const ring of rings) {
        ctx.beginPath();
        for (let a = 0; a <= 6.3; a += 0.05) {
          const q = project(ring, a);
          a === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y);
        }
        ctx.strokeStyle = "rgba(143,165,255,0.22)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // nodes
      for (const n of nodes) {
        const a = n.phase + time * n.ring.speed;
        const q = project(n.ring, a);
        n.sx = q.x; n.sy = q.y; n.depth = q.z;
        n.size = 4 + (q.z / R + 1) * 2.4;
      }
      const behind = nodes.filter((n) => n.depth < 0);
      const front = nodes.filter((n) => n.depth >= 0);
      behind.forEach(drawNode);
      drawCore();
      front.forEach(drawNode);

      requestAnimationFrame(draw);
    }

    function drawCore() {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.32);
      g.addColorStop(0, "rgba(255,214,140,1)");
      g.addColorStop(0.12, "rgba(255,181,71,0.95)");
      g.addColorStop(0.35, "rgba(255,140,60,0.25)");
      g.addColorStop(1, "rgba(76,125,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.32, 0, 6.283); ctx.fill();
      ctx.fillStyle = "#05071a";
      ctx.font = `700 ${Math.max(12, R * 0.07)}px Unbounded, sans-serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("MD", cx, cy + 1);
    }

    function drawNode(n) {
      const active = hovered === n;
      const dim = filter !== "all" && !n.p.kind.includes(filter);
      const alpha = (dim ? 0.18 : 1) * (n.depth < 0 ? 0.55 : 1);
      ctx.globalAlpha = alpha;
      const glow = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, n.size * 5);
      glow.addColorStop(0, n.color + "88");
      glow.addColorStop(1, n.color + "00");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(n.sx, n.sy, n.size * 5, 0, 6.283); ctx.fill();
      ctx.fillStyle = n.color;
      ctx.beginPath(); ctx.arc(n.sx, n.sy, active ? n.size * 1.6 : n.size, 0, 6.283); ctx.fill();
      if (active) {
        ctx.strokeStyle = n.color; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(n.sx, n.sy, n.size * 3.2, 0, 6.283); ctx.stroke();
      }
      if (w >= 820 && !dim) {
        ctx.fillStyle = `rgba(233,237,255,${n.depth < 0 ? 0.45 : 0.85})`;
        ctx.font = `500 12px Onest, sans-serif`;
        ctx.textAlign = "left"; ctx.textBaseline = "middle";
        ctx.fillText(n.p.name, n.sx + n.size + 8, n.sy);
      }
      ctx.globalAlpha = 1;
    }

    function hit(x, y) {
      let best = null, bd = 22 * 22;
      for (const n of nodes) {
        const d = (n.sx - x) ** 2 + (n.sy - y) ** 2;
        if (d < bd) { bd = d; best = n; }
      }
      return best;
    }

    function showTip(n) {
      if (!n) { tip.hidden = true; return; }
      tip.innerHTML = `<b>${esc(n.p.name)}</b><span>${esc(n.p.metric[lang])}</span> · ${n.p.plat.join(", ")}`;
      tip.style.left = n.sx + "px";
      tip.style.top = n.sy + "px";
      tip.hidden = false;
    }

    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      if (!reduced) {
        tilt.x = (mouse.x / w - 0.5);
        tilt.y = (mouse.y / h - 0.5);
      }
      if (e.target.closest(".hero-copy a, .hero-copy button")) { hovered = null; showTip(null); return; }
      hovered = hit(mouse.x, mouse.y);
      hero.style.cursor = hovered ? "pointer" : "";
      showTip(hovered);
    });
    hero.addEventListener("pointerleave", () => { hovered = null; showTip(null); hero.style.cursor = ""; });
    hero.addEventListener("click", (e) => {
      if (e.target.closest("a, button")) return;
      const r = hero.getBoundingClientRect();
      const n = hit(e.clientX - r.left, e.clientY - r.top);
      if (!n) return;
      const card = document.getElementById("p-" + n.p.id);
      card.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      card.classList.add("flash");
      setTimeout(() => card.classList.remove("flash"), 1800);
    });

    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(draw);
  }

  /* ---------------- interactions ---------------- */

  function wire() {
    document.querySelectorAll(".lang button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang, true)));

    $("#filters").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      filter = b.dataset.f;
      renderProjects();
    });

    // cursor spotlight on project panels
    $("#projects").addEventListener("pointermove", (e) => {
      const card = e.target.closest(".proj");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });

    const toast = $("#toast");
    $("#copyMail").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("bmunh95@gmail.com");
        toast.textContent = T[lang]["contact.copied"];
      } catch (e) {
        toast.textContent = "bmunh95@gmail.com";
      }
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1800);
    });

    // highlight the nav link of the section in view
    const links = [...document.querySelectorAll(".links a")];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["work", "stack", "path", "contact"].forEach((id) => io.observe(document.getElementById(id)));

    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------------- boot ---------------- */

  let initial = new URLSearchParams(location.search).get("lang");
  if (!initial) {
    try { initial = localStorage.getItem("lang"); } catch (e) { /* storage unavailable */ }
  }
  if (!initial) initial = (navigator.language || "").toLowerCase().startsWith("mn") ? "mn" : "en";

  wire();
  setLang(initial, true);
  orbit();
  requestAnimationFrame(() => root.classList.add("ready"));
})();
