/* ============================================================================
   PORTFOLIO CONTENT CONFIG — Rishav Kumar
   ----------------------------------------------------------------------------
   Populated from real sources: your 2026 résumé, your GitHub, and your project
   READMEs / Claude project memory. Anything I could not fully verify is marked
   ⚠️ CONFIRM. Edit this one file to change the whole site.
   ============================================================================ */

import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Database,
  BrainCircuit,
  Cloud,
  Github,
  Linkedin,
  Mail,
  FileText,
  Sparkles,
  Terminal,
  Layers,
  Code2,
  Gauge,
  GitBranch,
  Link2,
  Workflow,
  ScrollText,
  FileSpreadsheet,
  Stethoscope,
  Award,
  Trophy,
} from "lucide-react";

/* ---------------------------------- Identity ---------------------------------- */
export const PROFILE = {
  name: "Rishav Kumar",
  firstName: "Rishav",
  lastName: "Kumar",
  // Rotated through the terminal typing effect in the Hero:
  roles: [
    "Power BI Developer",
    "Senior Data Analyst",
    "AI Automation Tool Creator",
    "Legal-Tech Engineer",
  ],
  tagline:
    "I turn complex medical, legal & insurance data into decisions — and build the AI-assisted tools that remove the manual work: OCR/NLP pipelines, a browser-based Power BI IDE, and a deterministic DAX compiler.",
  location: "Delhi NCR, India", // ⚠️ CONFIRM — résumé says Noida/Delhi NCR; GitHub says Bangalore
  availability: "Open to Power BI Developer roles",
  email: "kumar98rishav@gmail.com",
  resumeUrl: "/resume.pdf", // lives at public/resume.pdf
  avatarUrl: "", // e.g. "/avatar.jpg" — leave empty for the "RK" monogram fallback
} as const;

export const SOCIALS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "GitHub", href: "https://github.com/kumar98rishav-oss", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rishav98kumar", icon: Linkedin },
  { label: "Email", href: "mailto:kumar98rishav@gmail.com", icon: Mail },
];

/* ------------------------------- Navigation ---------------------------------- */
// `id` must match each <section id="…"> for scrollspy to work.
export const NAV_LINKS: { id: string; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Journey" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------ Marquee ticker -------------------------------- */
export const TECH_TICKER: string[] = [
  "Power BI", "DAX", "Power Query (M)", "SQL Server", "Star Schema", "RLS",
  "Azure", "Power BI Service", "Python", "FastAPI", "React", "TypeScript",
  "Docker", "OCR", "sciSpaCy", "PyMuPDF", "Fabric", "Snowflake", "Git", "Excel / VBA",
];

/* ---------------------------- About / Bento grid ----------------------------- */
export const ABOUT = {
  kicker: "About",
  heading: "A biomedical scientist who taught himself to build",
  intro:
    "I'm a Senior Data Analyst & Power BI Developer with 4+ years turning complex medical, legal, and insurance data into decisions — SQL and Power Query ETL, star-schema modeling, advanced DAX, and row-level security on Azure-hosted Power BI Service. But I didn't stop at dashboards. Using AI as a pair-programmer, I taught myself to design and ship real software: OCR/NLP document pipelines, a PDF hyperlinking system, and a browser-based Power BI IDE that auto-generates DAX. A Gold Medalist in Biomedical Science, I bring scientific rigor — measure it, verify it, don't guess — to everything I build.",
  highlights: [
    "4+ years · medico-legal, healthcare & insurance data",
    "Gold Medalist, M.Sc Biomedical Science",
    "8+ AI-assisted tools shipped to production",
  ],
  nowLearning: ["Microsoft Fabric", "Snowflake", "Azure Data Factory", "Power BI ALM"],
} as const;

export type SkillGroup = {
  key: string;
  title: string;
  icon: LucideIcon;
  blurb: string;
  skills: string[];
  span: string;
  accent: "accent" | "accent-2" | "accent-3";
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    key: "powerbi",
    title: "Power BI & BI",
    icon: BarChart3,
    blurb: "End-to-end delivery — semantic models, advanced DAX, and secured, governed reports on the Service.",
    skills: ["Power BI Desktop & Service", "DAX", "Power Query (M)", "Star Schema", "Bridge Tables", "RLS", "Drill-through", "Tableau"],
    span: "md:col-span-3 md:row-span-2",
    accent: "accent",
  },
  {
    key: "sql",
    title: "Databases & SQL",
    icon: Database,
    blurb: "SQL Server from query to warehouse.",
    skills: ["SQL Server", "Complex Joins", "CTEs", "Stored Procedures", "Query Optimization", "ETL"],
    span: "md:col-span-3",
    accent: "accent-2",
  },
  {
    key: "ai",
    title: "AI & Automation",
    icon: BrainCircuit,
    blurb: "AI-assisted development, OCR/NLP pipelines, and DAG-based workflows.",
    skills: ["AI-Assisted Dev (Claude, ChatGPT)", "LLM Integration", "OCR & NLP", "Prompt Engineering", "DAG Design", "CI/CD"],
    span: "md:col-span-3",
    accent: "accent-3",
  },
  {
    key: "cloud",
    title: "Cloud & Azure",
    icon: Cloud,
    blurb: "Azure-hosted BI with directory-driven security.",
    skills: ["Power BI Service", "Azure AD (RLS)", "Azure SQL", "Azure Data Factory"],
    span: "md:col-span-3",
    accent: "accent",
  },
  {
    key: "code",
    title: "Programming & Tools",
    icon: Code2,
    blurb: "The stack behind the tools I ship.",
    skills: ["Python (Pandas, NumPy)", "React", "TypeScript", "FastAPI", "Docker", "Git"],
    span: "md:col-span-3",
    accent: "accent-2",
  },
];

/* --------------------------------- Metrics ----------------------------------- */
export type Metric = { value: number; suffix?: string; prefix?: string; label: string };
export const METRICS: Metric[] = [
  { value: 4, suffix: "+", label: "Years in analytics" },
  { value: 14, suffix: "+", label: "Power BI dashboards shipped" },
  { value: 8, suffix: "+", label: "Tools built & deployed" },
  { value: 60, suffix: "%", label: "Manual effort removed" },
];

/* -------------------------------- Projects ----------------------------------- */
export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  architecture: string[]; // node labels for the animated pipeline diagram
  gradient: string;
  icon: LucideIcon;
  links: { demo?: string; github?: string };
  previewImage?: string; // real UI screenshot (README) — shown in the detail view
  /** Paged interface screenshots. A claim like "verified on the real engine" is
   * abstract until a visitor can see it happening, so the flagship carries a
   * gallery rather than one image. */
  shots?: { src: string; title: string; caption: string }[];
  featured?: boolean;
};

/**
 * The single project highlighted above all others in the Projects section.
 * Everything else collapses under "Other projects". Change this id to
 * promote a different project.
 */
export const FLAGSHIP_PROJECT_ID = "dax-workbench";

export const PROJECTS: Project[] = [
  {
    id: "dax-workbench",
    title: "DAX Workbench",
    category: "Power BI External Tool",
    year: "2026",
    summary: "A Power BI External Tool that writes, proves and optimises DAX against your live model.",
    description:
      "A Power BI External Tool that launches from Desktop's own ribbon and works against the model you already have open, through a private .NET 8 bridge speaking TOM and ADOMD to the embedded Analysis Services engine. It turns plain-English intent into production-grade DAX, shows the real value from Microsoft's engine over the full data before anything is committed, rewrites slow measures and proves the gain by benchmarking both versions cold-cache, analyses VertiPaq storage to show which columns consume the model's memory, maps every dependency so nothing is deleted that a report still uses, and deploys measures and calculated tables straight back. One self-contained executable — nothing to install, and no data leaves the machine.",
    stack: ["React", "TypeScript", "Zustand", "C# / .NET 8", "ADOMD / TOM", "XMLA"],
    metrics: [
      { label: "Automated tests", value: "107" },
      { label: "Bridge endpoints", value: "11" },
      { label: "DAX functions", value: "229" },
    ],
    architecture: ["Power BI Desktop", "AS Engine", ".NET Bridge", "REST + CORS", "React SPA", "DAX / KPI / Optimizer"],
    gradient: "from-cyan-500/30 via-sky-500/10 to-transparent",
    icon: Terminal,
    links: { demo: "https://dax-workbench.onrender.com", github: "https://github.com/kumar98rishav-oss/DAX-Workbench" },
    shots: [
      {
        src: "/shots/dax-editor.png",
        title: "DAX + live value",
        caption:
          "The measure and its real number in one place. The badge reads live · full data — that value came from Microsoft's own engine over every row, not a sample, and it appears before anything is saved to the model.",
      },
      {
        src: "/shots/optimizer.png",
        title: "Optimizer",
        caption:
          "It rewrites a slow measure into the shape the engine executes best, then benchmarks both versions cold-cache and compares their results. When the difference is inside the noise it says so instead of claiming a win.",
      },
      {
        src: "/shots/kpi-board.png",
        title: "KPI board",
        caption:
          "Every measure becomes a live answer without building a single visual. Twelve cards fill from one engine query; text measures and blanks are handled honestly rather than shown as zero.",
      },
      {
        src: "/shots/storage.png",
        title: "VertiPaq storage",
        caption:
          "Column-level size, cardinality and encoding, so you can see what is actually consuming the model's memory — and a ranked list of what is worth fixing, with keys the model needs excluded from the advice.",
      },
      {
        src: "/shots/cleanup.png",
        title: "Dependency & cleanup",
        caption:
          "What references what, across measures, columns and tables. Nothing is called unused without evidence from the report layer, so a measure living on a visual can never be offered for deletion.",
      },
    ],
    featured: true,
  },
  {
    id: "bi-visual-design",
    title: "BI Visual Design",
    category: "Desktop App · Power BI Tool",
    year: "2026",
    summary: "Captures Power BI's real rendered visuals over the Chrome DevTools Protocol.",
    description:
      "An Electron desktop app and Power BI External Tool that drives Power BI Desktop over the Chrome DevTools Protocol to capture exact, per-visual pixels keyed to their PBIR ids — no calibration, at any resolution. It mirrors a report straight from its PBIR JSON, edits theme, style, layout, and lint (a 'Model Doctor'), and deploys every change through one atomic transaction with version history. Reverse-engineering Power BI's own rendering is what turned me from a report author into a tool builder.",
    stack: ["Electron", "React", "TypeScript", "Chrome DevTools Protocol", "PBIR / PBIP", "Node.js"],
    metrics: [
      { label: "Capture fidelity", value: "2.0× px/unit" },
      { label: "Pages / sweep", value: "12" },
      { label: "Test harnesses", value: "15" },
    ],
    architecture: ["PBIR JSON", "Mirror Model", "CDP Capture", "Doctor / Lint", "Atomic Deploy", "Power BI Desktop"],
    gradient: "from-violet-500/30 via-fuchsia-500/10 to-transparent",
    icon: Layers,
    links: { demo: "https://bi-visual-design-02.onrender.com/" }, // repo is private
    featured: true,
  },
  {
    id: "mednex",
    title: "MEDNEX",
    category: "Document AI · ML Pipeline",
    year: "2024",
    summary: "Multimodal medical-document intelligence — OCR + NLP that cut processing 6 min → 40 s.",
    description:
      "My flagship ML build. A 3-DAG concurrent architecture (Triage → Vision → Intelligence) routes every page to the cheapest processing strategy that still gets the answer right — cutting per-record processing from ~6 minutes to ~40 seconds across an edge tier (Tesseract, OpenCV, offline) and a cloud tier (Qwen-3.5 vision-LLM). Biomedical NLP with sciSpaCy NER, NegEx negation, temporal timelines, and ontology mapping to SNOMED CT / RxNorm / CPT, plus a golden-dataset evaluation harness scoring precision / recall / F1. Containerized with Docker.",
    stack: ["Python", "FastAPI", "Tesseract / OpenCV", "sciSpaCy / medspaCy", "Qwen-3.5 (NIM)", "Docker"],
    metrics: [
      { label: "Processing", value: "6 min → 40 s" },
      { label: "Architecture", value: "3-DAG" },
      { label: "Ontologies", value: "SNOMED · RxNorm" },
    ],
    architecture: ["PDF Pages", "Triage DAG", "Vision DAG (OCR)", "Intelligence DAG (NLP)", "Ontology Map", "Structured Report"],
    gradient: "from-pink-500/30 via-rose-500/10 to-transparent",
    icon: BrainCircuit,
    links: {}, // private client tooling — capability shown, no patient data
    featured: true,
  },
  {
    id: "dax-architect",
    title: "DAX Architect",
    category: "Power BI · DAX Compiler",
    year: "2025",
    summary: "Plain English to correctly-structured DAX — deterministic, offline, no AI.",
    description:
      "The learning bench that became DAX Workbench. A compiler — not a chatbot — that reads your semantic model and decomposes a plain-English requirement into a chain of reusable, branched measures the way an experienced developer would (Total Sales → Total Profit → Profit Margin % → Margin YoY %). Deterministic output, no hallucinated columns, model-aware validation, and an interactive dependency graph. Runs 100% in the browser with a full compiler pipeline: intent parser → schema resolver → relationship engine → dependency graph → best-practice + performance analysis → DAX.",
    stack: ["HTML5", "CSS3", "Vanilla JS", "SVG", "Compiler design"],
    metrics: [
      { label: "Analytical patterns", value: "20+" },
      { label: "Runs", value: "100% offline" },
      { label: "Hallucinations", value: "0" },
    ],
    architecture: ["Plain English", "Intent Parser", "Schema Resolver", "Dependency Graph", "Validation", "DAX + Graph"],
    gradient: "from-emerald-500/30 via-teal-500/10 to-transparent",
    icon: Workflow,
    links: { demo: "https://dax-architect.onrender.com", github: "https://github.com/kumar98rishav-oss/dax-architect" },
    featured: true,
  },
  {
    id: "schemaforge",
    title: "SchemaForge",
    category: "Full-Stack · Data Platform",
    year: "2025",
    summary: "Turn messy spreadsheets into typed, auditable, reproducible code.",
    description:
      "A schema-first data platform. Upload an Excel/CSV file and it runs deterministic type inference, lets you review the inferred schema, validates and fail-fast enforces the types, then generates production-ready Python / SQL / Power BI (M) code — each with a SHA-256 integrity check baked in so the output is reproducible and auditable.",
    stack: ["FastAPI", "React", "pandas", "SQLite", "Docker"],
    metrics: [
      { label: "Generates", value: "Python · SQL · M" },
      { label: "Integrity", value: "SHA-256" },
      { label: "Types", value: "inferred + enforced" },
    ],
    architecture: ["Upload Excel/CSV", "Infer Schema", "Review", "Validate", "Enforce Types", "Generate Code"],
    gradient: "from-cyan-500/30 via-sky-500/10 to-transparent",
    icon: FileSpreadsheet,
    links: { demo: "https://excel-python-tool.onrender.com", github: "https://github.com/kumar98rishav-oss/Excel-Python-tool" },
    previewImage: "https://raw.githubusercontent.com/kumar98rishav-oss/Excel-Python-tool/main/docs/preview.svg",
    featured: true,
  },
  {
    id: "hyperpdf",
    title: "Hyper_PDF Studio",
    category: "Legal-Tech · PDF Engine",
    year: "2023",
    summary: "Automate medico-legal PDF hyperlinking instantly.",
    description:
      "The tool that started everything. Give it a summary PDF and the medical records, and it detects page ranges, computes offsets, and inserts precise clickable GoTo hyperlinks in seconds — in both Bundle and Source modes. Tired of hyperlinking hundreds of pages by hand, I built this as my first real piece of software; every tool since grew out of it.",
    stack: ["Flask", "PyMuPDF", "gunicorn", "Docker"],
    metrics: [
      { label: "Modes", value: "Bundle · Source" },
      { label: "Links", value: "clickable GoTo" },
      { label: "Speed", value: "seconds" },
    ],
    architecture: ["Upload PDFs", "Detect Page Ranges", "Compute Offsets", "Locate Targets", "Insert GoTo Links", "Download"],
    gradient: "from-indigo-500/30 via-violet-500/10 to-transparent",
    icon: Link2,
    links: { demo: "https://hyper-pdf-8jnk.onrender.com", github: "https://github.com/kumar98rishav-oss/Hyper_PDF-engine" },
    previewImage: "https://raw.githubusercontent.com/kumar98rishav-oss/Hyper_PDF-engine/main/docs/preview.svg",
    featured: true,
  },
  {
    id: "medannotate",
    title: "MedAnnotate AI",
    category: "Document AI · Medical",
    year: "2024",
    summary: "Mark visits, auto-suggest fields, build court-ready records.",
    description:
      "A local-first medical-PDF workflow. It extracts per-page text (native or Tesseract OCR), suggests visit fields via regex, a learned-facility matcher, and OpenAI, then builds either one combined bookmarked PDF or a split ZIP foldered by facility. Human-in-the-loop annotation with AI doing the tedious first pass.",
    stack: ["FastAPI", "React", "Tesseract OCR", "OpenAI", "PyMuPDF"],
    metrics: [
      { label: "Text", value: "native · OCR" },
      { label: "Suggest", value: "regex · AI" },
      { label: "Output", value: "Combined · Split" },
    ],
    architecture: ["Upload", "OCR / Text Extract", "Annotate Visits", "Deduplicate", "Build (Combined / Split)", "Download"],
    gradient: "from-pink-500/30 via-rose-500/10 to-transparent",
    icon: Stethoscope,
    links: { demo: "https://medical-pdf-annotator.onrender.com", github: "https://github.com/kumar98rishav-oss/Medical-PDF-annotator" },
    previewImage: "https://raw.githubusercontent.com/kumar98rishav-oss/Medical-PDF-annotator/main/docs/preview.svg",
    featured: true,
  },
  {
    id: "exhibit-builder",
    title: "Exhibit Builder",
    category: "Legal-Tech · Exhibit Pipeline",
    year: "2024",
    summary: "Turn a raw case folder into a court-ready, exhibit-numbered PDF.",
    description:
      "Scans a case folder, parses filenames, classifies each document as Bill vs Medical, groups by facility, sorts chronologically, assigns dynamic exhibit numbers, and merges everything into one exhibit PDF with titled separator pages. A split app — FastAPI backend plus a static site — that turns hours of manual assembly into seconds.",
    stack: ["FastAPI", "PyMuPDF", "Vanilla JS", "Docker"],
    metrics: [
      { label: "Classifies", value: "Bill · Medical" },
      { label: "Numbering", value: "dynamic" },
      { label: "Output", value: "court-ready" },
    ],
    architecture: ["Upload Case Folder", "Scan", "Classify", "Group by Facility", "Sort Chronologically", "Build Tree", "Generate PDF"],
    gradient: "from-emerald-500/30 via-teal-500/10 to-transparent",
    icon: ScrollText,
    links: { demo: "https://exhibit-builder-web.onrender.com", github: "https://github.com/kumar98rishav-oss/exhibit-builder" },
    previewImage: "https://raw.githubusercontent.com/kumar98rishav-oss/exhibit-builder/main/docs/preview.svg",
    featured: true,
  },
  {
    id: "medlegal-analytics",
    title: "Medical-Legal Claims Analytics",
    category: "Power BI Report",
    year: "2025",
    summary: "End-to-end Power BI solution on medical-legal data, secured with dynamic RLS.",
    description:
      "A complete BI solution built on synthetic medical-legal data: SQL Server views and stored procedures → Power Query ETL → a star schema with a bridge table → 40+ DAX measures → 6 report pages plus an executive dashboard, published to Power BI Service. Advanced DAX includes time intelligence, RANKX leaderboards, an Nth-largest-value measure driven by a disconnected parameter table, and a dynamic measure selector. USERPRINCIPALNAME()-based row-level security means each law firm sees only its own data — scalable to new firms with zero model changes.",
    stack: ["Power BI", "DAX", "SQL Server", "Power Query", "RLS", "Star Schema"],
    metrics: [
      { label: "DAX measures", value: "40+" },
      { label: "Report pages", value: "6 + exec" },
      { label: "Security", value: "dynamic RLS" },
    ],
    architecture: ["SQL Server", "Power Query ETL", "Star Schema + Bridge", "40+ DAX", "6 Report Pages", "RLS + Service"],
    gradient: "from-amber-500/30 via-orange-500/10 to-transparent",
    icon: BarChart3,
    links: {},
    featured: false,
  },
];

/* ------------------------------- Experience ---------------------------------- */
export type TimelineItem = {
  id: string;
  period: string;
  title: string;
  org: string;
  location?: string;
  description: string;
  tags: string[];
};

export const EXPERIENCE: TimelineItem[] = [
  {
    id: "exp-1",
    period: "Dec 2022 — Present",
    title: "Senior Data Analyst & Power BI Developer",
    org: "Jacoby & Meyers (Bolster Legal)",
    location: "US Medico-Legal Firm · Remote (India)",
    description:
      "Own end-to-end Power BI for a US medico-legal firm: 14+ dashboards on Azure-hosted Power BI Service (+40% operational visibility), advanced DAX over star-schema models, SQL + Power Query ETL from databases, APIs and FTP, and Azure AD row-level security across 500+ active cases. Built the firm's internal AI-assisted automation suite — OCR/NLP extraction, PDF hyperlinking, and schema-driven code generation — cutting manual document and reporting work by up to 60%.",
    tags: ["Power BI", "DAX", "Azure", "RLS", "SQL", "Automation"],
  },
  {
    id: "exp-2",
    period: "Aug 2021 — Nov 2022",
    title: "Claims Analyst — Team Lead",
    org: "Amable Consultancy Services Pvt. Ltd",
    location: "Mohali, India",
    description:
      "Led a team of 5 analysts processing and validating insurance claims data at 99%+ accuracy and full regulatory compliance. Built reports for claim-volume tracking, TAT analysis, and financial reconciliation, and streamlined data-quality processes to cut error rates by 35%.",
    tags: ["Excel / VBA", "Data Validation", "Team Lead", "Reporting"],
  },
];

/* ------------------------ Learning journey (the "how") ----------------------- */
// Reframed per your request: the path that built your capability, in order,
// with what motivated each step and what it taught you.
export const EDUCATION: TimelineItem[] = [
  {
    id: "edu-0",
    period: "2018 — 2020",
    title: "M.Sc Biomedical Science — 🏅 Gold Medalist",
    org: "Panjab University, Chandigarh",
    description:
      "Where the rigor started — stem cell & tissue engineering, the scientific method, and a habit of chasing correctness and measuring everything. The code came later; the discipline came first.",
    tags: ["Gold Medalist", "Research", "Foundation"],
  },
  {
    id: "edu-1",
    period: "2023 · HyperPDF",
    title: "First build — automating the tedious",
    org: "Self-taught, on the job",
    description:
      "Manually hyperlinking hundreds of PDF pages was killing my week, so I built a tool to do it. My first real software — I learned Python, PDF internals, and the biggest lesson of all: with AI as a pair-programmer, I could ship real tools.",
    tags: ["Python", "First tool", "Motivation"],
  },
  {
    id: "edu-2",
    period: "2024 · MEDNEX + suite",
    title: "Leveling up to real machine learning",
    org: "Self-taught",
    description:
      "One tool became a suite. MEDNEX pushed me into OCR, computer vision, biomedical NLP, concurrent DAG architecture, FastAPI and Docker — and evaluation harnesses that prove whether the AI is actually right, not just plausible.",
    tags: ["OCR / NLP", "ML pipelines", "FastAPI"],
  },
  {
    id: "edu-3",
    period: "2025 · DAX Architect",
    title: "Engineering rigor, applied to DAX",
    org: "Self-taught",
    description:
      "I wanted DAX generation that could never hallucinate a column. Building a deterministic compiler — intent parser → schema resolver → dependency graph — taught me to think in pipelines and guarantees, not prompts.",
    tags: ["Compilers", "DAX", "Determinism"],
  },
  {
    id: "edu-4",
    period: "2025 · BI Visual Design",
    title: "Reverse-engineering Power BI itself",
    org: "Self-taught",
    description:
      "To capture Power BI's real visuals I had to go deep: PBIR JSON, the Chrome DevTools Protocol, Electron. Learning the platform's internals is what turned me from a report author into a genuine tool builder.",
    tags: ["Power BI internals", "CDP", "Electron"],
  },
  {
    id: "edu-5",
    period: "2026 · DAX Workbench",
    title: "Everything, synthesized into the MVP",
    org: "Self-taught",
    description:
      "The culmination: a live-model DAX workbench connecting to Power BI through a .NET bridge (TOM/ADOMD/XMLA), previewing against the real engine and optimizing DAX. Every earlier tool taught a piece of this one.",
    tags: ["Full-stack", ".NET", "Flagship"],
  },
];

/* ----------------------------- Certifications -------------------------------- */
export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  icon: LucideIcon;
};

export const CERTIFICATIONS: Certification[] = [
  { id: "c1", name: "Power BI Data Analyst (PL-300)", issuer: "Microsoft", year: "Expected Jul 2026", credentialUrl: "#", icon: BarChart3 },
  { id: "c2", name: "SQL for Data Analysis", issuer: "Coursera / Udemy", year: "", credentialUrl: "#", icon: Database },
  { id: "c3", name: "Gold Medalist — M.Sc Biomedical Science", issuer: "Panjab University", year: "2020", credentialUrl: "#", icon: Trophy },
  { id: "c4", name: "Star Performer Award", issuer: "3 Consecutive Years", year: "", credentialUrl: "#", icon: Award },
  { id: "c5", name: "Excellence in Project Delivery", issuer: "Client Recognition", year: "", credentialUrl: "#", icon: Sparkles },
  { id: "c6", name: "Process Improvement Champion", issuer: "60% efficiency gain", year: "", credentialUrl: "#", icon: Gauge },
];

/* -------------------------------- GitHub ------------------------------------- */
export const GITHUB = {
  username: "kumar98rishav-oss",
  profileUrl: "https://github.com/kumar98rishav-oss",
  // ⚠️ CONFIRM — contribution/star counts are illustrative; update if you want exact numbers.
  stats: [
    { label: "Public repos", value: "10+" },
    { label: "Live web apps", value: "2" },
    { label: "Tools shipped", value: "8+" },
    { label: "Focus", value: "BI · AI" },
  ],
  pinned: [
    { name: "DAX-Workbench", description: "Browser-based Power BI IDE — auto-DAX, live-model bridge, optimizer & PBIP export.", language: "TypeScript", stars: 0, forks: 0, color: "#3178c6" },
    { name: "dax-architect", description: "Deterministic, offline DAX compiler — plain English to production-ready DAX.", language: "JavaScript", stars: 0, forks: 0, color: "#f1e05a" },
    { name: "Excel-Python-tool", description: "SchemaForge — schema-first platform: Excel/CSV to typed Python / SQL / M code.", language: "Python", stars: 0, forks: 0, color: "#3572A5" },
    { name: "Hyper_PDF-engine", description: "Medico-legal PDF hyperlinking engine — clickable GoTo links in seconds.", language: "Python", stars: 0, forks: 0, color: "#3572A5" },
    { name: "Medical-PDF-annotator", description: "MedAnnotate AI — local-first medical-PDF annotation & court-ready record builder.", language: "Python", stars: 0, forks: 0, color: "#3572A5" },
    { name: "exhibit-builder", description: "Legal-tech PDF exhibit generation system — court-ready packages in seconds.", language: "Python", stars: 0, forks: 0, color: "#3572A5" },
  ],
};

/* --------------------------------- Contact ----------------------------------- */
export const CONTACT = {
  kicker: "Contact",
  heading: "Let's turn your data into decisions",
  blurb:
    "I'm open to Power BI Developer roles and interesting data / BI-tooling problems. The fastest way to reach me is email or LinkedIn.",
  email: PROFILE.email,
  cta: "Start a conversation",
} as const;

export const FOOTER = {
  columns: [
    { title: "Sitemap", links: NAV_LINKS.map((l) => ({ label: l.label, href: `#${l.id}` })) },
    {
      title: "Elsewhere",
      links: [
        { label: "GitHub", href: "https://github.com/kumar98rishav-oss" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/rishav98kumar" },
        { label: "DAX Workbench", href: "https://dax-workbench.onrender.com" },
        { label: "DAX Architect", href: "https://dax-architect.onrender.com" },
      ],
    },
  ],
  note: "Built with Next.js, Tailwind & Framer Motion.",
} as const;

export const ICONS = { FileText, Terminal, Mail, Sparkles, GitBranch };
