/* ============================================================
   EDIT THIS FILE. It is the only file most people need to touch.
   Everything on the page comes from here.
   Pick a look with `theme` (a file in /themes, without .css).
   Preview any theme without editing: yourpage.com/?theme=terminal
   ============================================================ */
window.LINKTREE = {
  theme: "receipt",   // receipt · terminal · dark · library · starter
  themes: ["receipt", "terminal", "dark", "library", "starter"],   // used by the optional picker

  profile: {
    name: "Bunifulab",
    highlight: "Bunifu",               
    owner: "Mark Mgharo",
    avatar: "assets/avatar.svg",         // optional profile picture (square works best). "" = none
    tagline: "Independent builder · Mombasa, KE",
    intro: "I turn practical problems into useful software. Here’s what’s on your tab:"
  },

  /* optional small text rows (themes may style or hide them) */
  meta: { ref: "RCPT", lines: ["Cashier: Mark Mgharo", "Till 001"] },

  links: [
    { title: "Mauzo", color: "#d65a52", tag: "LIVE", cta: "OPEN APP →",
      // image: "assets/mauzo.png",      // optional project picture (16:9 works best)
      desc: "Sales and stock for everyday retail. One place for sales, inventory and workflows.",
      url: "https://bunifulab.pythonanywhere.com/accounts/login/" },
    { title: "UremboPro", color: "#5b8def", tag: "DEMO", cta: "OPEN DEMO →",
      desc: "Salon management demo: services, retail stock, clients and sales, on sample data.",
      url: "https://techiemak.pythonanywhere.com/" },
    { title: "Chakula Chetu", color: "#f2a93b", tag: "LIVE", cta: "OPEN WEB APP →",
      desc: "Baby-weaning planner with local Kenyan foods, plus a sensory-friendly feeding guide.",
      url: "https://chakula-chetu.vercel.app/" },
    { title: "Toyota ERC Unlock", color: "#7ac143", tag: "LIVE", cta: "OPEN TOOL →",
      desc: "Unlock codes for compatible Toyota Japanese head units.",
      url: "https://erc-unlock.vercel.app/" },
    { title: "SlipDrop", color: "#a78bfa", tag: "SRC", cta: "VIEW CODE →",
      desc: "Smoother, nicer POS receipts. (Yes, you’re holding one.)",
      url: "https://github.com/stickmanKE/slipdrop" },
    { title: "Pi Media Server", color: "#2fb3a6", tag: "OSS", cta: "EXPLORE →",
      desc: "Self-hosted Jellyfin, Sonarr and Radarr on a Raspberry Pi.",
      url: "https://github.com/stickmanKE" }
  ],

  summary: [
    { label: "Items shipped", value: "6" },
    { label: "Bugs (claimed)", value: "0" },
    { label: "Chai", value: "∞" }
  ],
  total: { label: "TOTAL", value: "useful things" },

  connect: {
    intro: "Payment method: say hello. Collaborations, practical problems and feedback welcome.",
    socials: [
      { label: "GitHub ↗", url: "https://github.com/stickmanKE" },
      { label: "TikTok ↗", url: "https://www.tiktok.com/@bunifulab" }
    ]
  },

  /* contact form: WhatsApp number in international format, no "+" */
  contact: {
    recipient: "Mark",
    whatsapp: "254715197114",
    email: "",
    dm: { label: "DM on TikTok ↗", url: "https://www.tiktok.com/@bunifulab" },
    heading: "Say hello.",
    blurb: "Stub no. 001 · Tell me what you need built.",
    stub: "- - - KEEP THIS STUB - - -"
  },

  thanks: { title: "Asante, karibu tena.", text: "Keep this receipt. No refunds, only updates." },
  stamp: { top: "MOMBASA", main: "PAID", bottom: "KENYA" },   // themes decide whether to show it
  footer: "© 2026 Mark Mgharo / Bunifulab · Made with intent in Mombasa",

  features: {
    tear: true,     // false = contact form is simply open, no tear strip
    picker: true    // shows a theme switcher at the bottom: great for demos, turn off on your real page
  }
};
