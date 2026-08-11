export type Project = {
  slug: string;
  title: string;
  desc: string;
  longDesc?: string;
  status: "Live" | "Building";
  date: string;
  tags: string[];
  features?: string[];
  ribbon?: string;
  accent: "blue" | "teal" | "purple" | "dark";
  link?: string;
  repo?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "carousel",
    title: "AI Carousel Design System",
    image: "/images/carousel.png",
    desc: "Interactive AI design system & reusable carousel component with accessibility controls.",
    longDesc:
      "Unstyled, accessible carousel primitive built for design systems — natural touch and drag scrolling with infinite loop support.",
    status: "Live",
    date: "05.2025 — ∞",
    tags: ["TypeScript", "React", "Tailwind", "A11y"],
    features: [
      "Natural touch scrolling with smooth inertia, mouse drag and scroll for desktop",
      "Infinite loop scrolling",
      "Unstyled core for complete style customization",
      "Full keyboard navigation and type-ahead search",
    ],
    ribbon: "NEW",
    accent: "blue",
    repo: "https://github.com/Aseel012/AI-Carousel-Design-System",
  },
  {
    slug: "removeanything",
    title: "RemoveAnything.in",
    image: "/images/removeanything_banner.png",
    desc: "AI background & object removal platform. 500+ images processed with Docker.",
    longDesc:
      "AI-powered image editing platform for background removal, object erasing, and watermark cleanup, containerized for scale.",
    status: "Live",
    date: "02.2025 — ∞",
    tags: ["Docker", "Python", "AI/ML", "Flask"],
    features: [
      "One-click background and object removal",
      "Batch processing with a Flask + Docker pipeline",
      "500+ images processed in production",
      "V2 rebuild in progress",
    ],
    accent: "dark",
    link: "https://removeanything.in",
  },
  {
    slug: "shareyou",
    image: "/images/shareyou_banner.png",
    title: "ShareYou — Local File Sharing",
    desc: "Flutter app for private, local-network file sharing with a focused, minimal interface.",
    longDesc:
      "Cross-platform Flutter app that shares files instantly across devices on the same network, no cloud upload required.",
    status: "Live",
    date: "01.2025 — ∞",
    tags: ["Flutter", "Dart", "Local Network"],
    features: [
      "Zero-cloud, local network file transfer",
      "Cross-device discovery",
      "Minimal, distraction-free interface",
    ],
    accent: "teal",
  },
  {
    slug: "realestate",
    image: "/images/real_estate_banner.png",
    title: "Real Estate AI",
    desc: "AI calling assistant for real estate — lead notes, property tracking & CRM.",
    longDesc:
      "Voice-AI assistant that calls leads, transcribes conversations into structured notes, and syncs property status into a lightweight CRM.",
    status: "Building",
    date: "06.2026 — ∞",
    tags: ["Twilio", "OpenAI", "React", "Node.js"],
    features: [
      "Automated outbound calling via Twilio",
      "AI-generated call notes and lead scoring",
      "Property + lead tracking dashboard",
    ],
    accent: "purple",
  },
  {
    slug: "receiptapi",
    image: "/images/recepi_banner.png",
    title: "Receipt API",
    desc: "Backend REST API for receipt processing, JWT auth, and CRUD operations.",
    status: "Live",
    date: "11.2024 — ∞",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    features: [
      "JWT-authenticated REST endpoints",
      "Full CRUD for receipts and line items",
      "MongoDB schema for structured expense data",
    ],
    accent: "teal",
  },
  {
    slug: "python-learning",
    image: "/images/python_banner.png",
    title: "Python Learning",
    desc: "A dedicated repository for daily Python learning, experiments, and fun projects.",
    status: "Building",
    date: "2024 — ∞",
    tags: ["Python", "Learning", "Daily"],
    accent: "dark",
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  location: string;
  when: string;
  desc: string;
  tags: string[];
  current?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    role: "Freelance Product Developer",
    org: "Self-Employed",
    location: "Remote",
    when: "May 2026 — Present",
    desc: "Delivering web projects end to end for early clients — a Shopify storefront shipped, and a custom e-commerce build currently in progress.",
    tags: ["Shopify", "Web Development", "E-commerce"],
    current: true,
  },
  {
    role: "Flutter Development Intern",
    org: "Dream Webbies Technologies",
    location: "Remote",
    when: "Jun 2024 — Nov 2024",
    desc: "Learned Flutter app development, backend integration, and AWS cloud deployment while shipping features on live client apps.",
    tags: ["Flutter", "Backend", "AWS"],
  },
];

export const education = {
  degree: "B.Tech, Information Technology",
  school: "SGGSIE&T, Nanded",
  when: "3rd Year · In Progress",
  note: "Diploma in Computer Science completed prior to enrollment.",
};

export type FavItem = {
  name: string;
  desc: string;
  href: string;
  domain: string;
  category: "design" | "dev";
  image?: string;
};

export const favourites: FavItem[] = [
  { name: "Godly", desc: "Curated showcase of standout websites", href: "https://godly.website", domain: "godly.website", category: "design" },
  { name: "SiteInspire", desc: "Web design inspiration gallery", href: "https://www.siteinspire.com", domain: "siteinspire.com", category: "design" },
  { name: "Mobbin", desc: "Mobile & web app design patterns", href: "https://mobbin.com", domain: "mobbin.com", category: "design" },
  { name: "Pageflows", desc: "Real product flow recordings", href: "https://pageflows.com", domain: "pageflows.com", category: "design" },
  { name: "Lapa Ninja", desc: "Landing page design inspiration", href: "https://www.lapa.ninja", domain: "lapa.ninja", category: "design" },
  { name: "Saasframe", desc: "SaaS product UI screenshots", href: "https://saasframe.io", domain: "saasframe.io", category: "design" },
  { name: "Magic UI", desc: "Animated React component library", href: "https://magicui.design", domain: "magicui.design", category: "design" },
  { name: "Aceternity UI", desc: "Modern animated UI components", href: "https://ui.aceternity.com", domain: "ui.aceternity.com", category: "design" },
  { name: "HyperUI", desc: "Free open-source Tailwind components", href: "https://hyperui.dev", domain: "hyperui.dev", category: "design" },
  { name: "Preline UI", desc: "Open-source Tailwind component library", href: "https://preline.co", domain: "preline.co", category: "design" },
  { name: "Tweakcn", desc: "Theme editor for shadcn/ui", href: "https://tweakcn.com", domain: "tweakcn.com", category: "design" },
  { name: "Taxonomy", desc: "Open-source Next.js reference app", href: "https://tx.shadcn.com", domain: "tx.shadcn.com", category: "design" },
  { name: "Bento Grids", desc: "Bento-style layout inspiration", href: "https://bentogrids.com", domain: "bentogrids.com", category: "design" },
  { name: "Josh Comeau", desc: "CSS & frontend engineering blog", href: "https://www.joshwcomeau.com", domain: "joshwcomeau.com", category: "design" },
  { name: "Smashing Magazine", desc: "Web design & development publication", href: "https://www.smashingmagazine.com", domain: "smashingmagazine.com", category: "design" },
  { name: "ByteByteGo", desc: "System design explained visually", href: "https://bytebytego.com", domain: "bytebytego.com", category: "dev" },
  { name: "Low Level Learning", desc: "Systems programming YouTube channel", href: "https://www.youtube.com/@LowLevelTV", domain: "youtube.com", category: "dev" },
  { name: "Rauno Freiberg", desc: "Interaction design engineer & writer", href: "https://rauno.me", domain: "rauno.me", category: "design" },
  { name: "Julia Evans", desc: "Deep-dive systems & networking zines", href: "https://jvns.ca", domain: "jvns.ca", category: "dev" },
  { name: "Indie Hackers", desc: "Community of bootstrapped founders", href: "https://www.indiehackers.com", domain: "indiehackers.com", category: "dev" },
  { name: "Shu Omi", desc: "Frontend & product build videos", href: "https://www.youtube.com/@ShuOmi", domain: "youtube.com", category: "dev" },
  { name: "Jeremy Keith", desc: "Web standards & progressive enhancement", href: "https://adactio.com", domain: "adactio.com", category: "dev" },
  { name: "Dan Abramov", desc: "React core team engineering blog", href: "https://overreacted.io", domain: "overreacted.io", category: "dev" },
  { name: "shadcn/ui", desc: "Composable component toolkit", href: "https://ui.shadcn.com", domain: "ui.shadcn.com", category: "dev" },
  { name: "Framer Motion", desc: "Production-ready animation library", href: "https://www.framer.com/motion/", domain: "framer.com", category: "dev" },
  { name: "Vercel", desc: "Frontend cloud & deployment platform", href: "https://vercel.com", domain: "vercel.com", category: "dev" },
  { name: "Google Fonts", desc: "Free, open-source web font library", href: "https://fonts.google.com", domain: "fonts.google.com", category: "dev" },
];

export type MediaTile = {
  name: string;
  href: string;
  img: string;
  kind: "character" | "actor" | "movie";
};

export const actors: MediaTile[] = [
  { name: "Jake Gyllenhaal", href: "https://en.wikipedia.org/wiki/Jake_Gyllenhaal", img: "https://i.pinimg.com/1200x/04/d7/02/04d7024ad3d3d49a31511cf43cd3f3c4.jpg", kind: "actor" },
  { name: "Brad Pitt", href: "https://en.wikipedia.org/wiki/Brad_Pitt", img: "https://i.pinimg.com/736x/1e/f9/d3/1ef9d31fed6314ad3e04e81363cadc8d.jpg", kind: "actor" },
  { name: "Ryan Gosling", href: "https://en.wikipedia.org/wiki/Ryan_Gosling", img: "https://i.pinimg.com/736x/a6/45/9f/a6459f1ce23125b86de2e5f42d907049.jpg", kind: "actor" },
];

export const movies: MediaTile[] = [
  { name: "Seven", href: "https://www.imdb.com/title/tt1119646/", img: "https://i.pinimg.com/1200x/0d/24/a6/0d24a61d40c14dee758cad33e5c10fc4.jpg", kind: "movie" },
  { name: "Night Crawler", href: "https://www.imdb.com/title/tt1119646/", img: "https://i.pinimg.com/1200x/e8/e6/d9/e8e6d98672e4e84e991ff9eec9f8984e.jpg", kind: "movie" },
  { name: "Taxi Driver", href: "https://www.imdb.com/title/tt1119646/", img: "https://i.pinimg.com/736x/41/b2/fa/41b2faf3640461f22e263a980bb5ffc5.jpg", kind: "movie" },
  { name: "Interstellar", href: "https://www.imdb.com/title/tt0816692/", img: "/images/interstellar.jpg", kind: "movie" },
  { name: "The Dark Knight", href: "https://www.imdb.com/title/tt0468569/", img: "https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg", kind: "movie" },
  { name: "Inception", href: "https://www.imdb.com/title/tt1375666/", img: "https://image.tmdb.org/t/p/w342/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", kind: "movie" },
  { name: "Oppenheimer", href: "https://www.imdb.com/title/tt15398776/", img: "https://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", kind: "movie" },
  { name: "The Notebook", href: "https://www.imdb.com/title/tt0332280/", img: "https://i.pinimg.com/1200x/38/1e/5c/381e5cc4048786230d5045b43d4f89fd.jpg", kind: "movie" },
  { name: "Fight Club", href: "https://www.imdb.com/title/tt0137523/", img: "https://image.tmdb.org/t/p/w342/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", kind: "movie" },
  { name: "Zodiac", href: "https://www.imdb.com/title/tt1119646/", img: "https://i.pinimg.com/736x/b4/a0/c8/b4a0c8a5c015e744c86736459a82ed5f.jpg", kind: "movie" },
  { name: "Shutter Island", href: "https://www.imdb.com/title/tt0120737/", img: "https://i.pinimg.com/1200x/be/42/79/be42798ae9f2053ce10dd4e4a33d091f.jpg", kind: "movie" },
  { name: "Breaking Bad", href: "https://www.imdb.com/title/tt0816692/", img: "https://i.pinimg.com/1200x/37/62/75/37627587496965efcc0ae42ac9dff525.jpg", kind: "movie" },
];

export type IdeTile = { name: string; emoji: string; pinned?: boolean };

export const codeEditors: IdeTile[] = [
  { name: "VS Code", emoji: "🟦", pinned: true },
  { name: "Cursor", emoji: "🤖" },
  { name: "Zed", emoji: "⚡" },
  { name: "PyCharm", emoji: "🐍" },
];
export const designTools: IdeTile[] = [
  { name: "Figma", emoji: "🎨" },
  { name: "Canva", emoji: "🖼️" },
  { name: "Photopea", emoji: "📸" },
];
export const devTools: IdeTile[] = [
  { name: "Docker", emoji: "🐳" },
  { name: "Vercel", emoji: "▲" },
  { name: "Postman", emoji: "🔺" },
  { name: "MongoDB Atlas", emoji: "💾" },
];

export const skills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"],
  backend: ["Node.js", "Express", "Flask", "FastAPI", "Python"],
  tools: ["Docker", "Git", "GitHub Actions", "AWS", "Vercel", "Figma", "Postman"],
};

export const socials = {
  github: "https://github.com/Aseel012",
  linkedin: "https://www.linkedin.com/in/shaikh-md-aseel-29091b27b/",
  twitter: "https://x.com/ShaikhMdAseel25",
  medium: "https://medium.com/@shaikhmdaseel",
  email: "shaikhmdaseel@gmail.com",
  resume: "https://drive.google.com/file/d/1C0lAHvQhzsmQEJ0Tq-01jlQJ_eqFolQ9/view",
};

export const highlights = [
  {
    title: "AI Carousel Design System",
    href: "https://github.com/Aseel012/AI-Carousel-Design-System",
    desc: "Shipped a smooth, accessible AI-driven design system and custom carousel component with native keyboard and touch gestures.",
  },
  {
    title: "Technical Blogs on Medium",
    href: "https://medium.com/@shaikhmdaseel",
    desc: "Publishing articles covering frontend architecture, design engineering, and practical AI integrations for software developers.",
  },
  {
    title: "RemoveAnything.in — AI Image Tool",
    href: "https://removeanything.in",
    desc: "Built and containerized an AI background & object removal platform using Docker and Flask. 500+ images processed with V2 coming soon.",
  },
];