"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import ProjectShowcase from "@/components/project-showcase";
import { PROJECTS } from "@/data/projects";

interface CapabilityItem {
  n: string;
  title: string;
  desc: string;
  tools: string;
}

const NAV = [
  { label: "INÍCIO", href: "#inicio" },
  { label: "SOBRE", href: "#sobre" },
  { label: "CAPACIDADES", href: "#capacidades" },
  { label: "PROJETOS", href: "#projetos" },
  { label: "CONTATO", href: "#contato" },
];

const STACK = [
  { name: "TYPESCRIPT", tag: "CORE" },
  { name: "NEXT.JS 15", tag: "FRONT-END" },
  { name: "REACT 19", tag: "UI" },
  { name: "NODE.JS", tag: "RUNTIME" },
  { name: "POSTGRESQL", tag: "DATABASE" },
  { name: "DOCKER", tag: "CONTAINERS" },
  { name: "AWS CLOUD", tag: "INFRA" },
  { name: "REDIS", tag: "CACHE" },
  { name: "GRAPHQL", tag: "API" },
  { name: "TAILWIND CSS", tag: "STYLING" },
  { name: "PYTHON", tag: "DATA/ML" },
  { name: "CI/CD PIPELINES", tag: "DEVOPS" },
];

const CAPABILITIES: CapabilityItem[] = [
  {
    n: "01",
    title: "Discovery & Arquitetura",
    desc: "Análise profunda de requisitos, modelagem de banco relacional e vetorial, especificação de contratos de API e escolha de infraestrutura antes da escrita do código.",
    tools: "PostgreSQL · Docker · OpenAPI · Arquitetura Hexagonal",
  },
  {
    n: "02",
    title: "Engenharia Full Stack",
    desc: "Aplicações de ponta a ponta com TypeScript estrito: front-ends responsivos e performáticos em Next.js 15 aliados a back-ends sólidos e desacoplados em Node.js ou Python.",
    tools: "Next.js · React 19 · Node.js · FastAPI",
  },
  {
    n: "03",
    title: "Infraestrutura & CI/CD",
    desc: "Automação contínua com pipelines de teste, linter e build multi-stage. Orquestração em contêineres Docker e deploys em nuvem com alta disponibilidade e zero downtime.",
    tools: "Docker · GitHub Actions · AWS · Redis",
  },
  {
    n: "04",
    title: "Otimização & Alta Concorrência",
    desc: "Auditoria de latência, estratégias de cache multi-camada (Redis + Edge), otimização de queries SQL e renderização fluida a 60fps mesmo sob picos de tráfego.",
    tools: "Redis Cache · pgvector · WebSockets · SQL Tuning",
  },
];

const CONTACT_EMAIL = "victoorres@icloud.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://victortorres.dev/#person",
      name: "Victor Torres",
      jobTitle: "Desenvolvedor Full Stack",
      email: CONTACT_EMAIL,
      url: "https://victortorres.dev",
      sameAs: [
        "https://github.com/iamvictormt",
        "https://linkedin.com/in/iamvictormt",
        "https://instagram.com/iamvictormt",
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "Node.js",
        "PostgreSQL",
        "GraphQL",
        "Docker",
        "AWS",
        "Desenvolvimento Full Stack",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://victortorres.dev/#service",
      name: "Victor Torres Design Studio",
      url: "https://victortorres.dev",
      email: CONTACT_EMAIL,
      areaServed: "BR",
      serviceType: [
        "Desenvolvimento de sites profissionais",
        "Landing pages para trafego pago",
        "Desenvolvimento de sistemas web",
        "Arquitetura de software",
        "APIs e back-end",
      ],
      founder: {
        "@id": "https://victortorres.dev/#person",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://victortorres.dev/#website",
      name: "Victor Torres Design Studio",
      url: "https://victortorres.dev",
      inLanguage: "pt-BR",
      publisher: {
        "@id": "https://victortorres.dev/#person",
      },
    },
    {
      "@type": "ItemList",
      "@id": "https://victortorres.dev/#projects",
      name: "Projetos de Victor Torres",
      itemListElement: PROJECTS.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.desc,
          url: project.link,
          keywords: project.tags,
        },
      })),
    },
  ],
};

function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pos;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    const ids = NAV.map((n) => n.href.replace("#", ""));

    const update = () => {
      const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      if (els.length === 0) return;

      const scrollY = window.scrollY;
      const marker = scrollY + window.innerHeight * 0.35;

      if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        const lastEl = els[els.length - 1];
        if (lastEl) {
          setActive(`#${lastEl.id}`);
        }
        return;
      }

      let current = els[0]!;
      for (const el of els) {
        if (el.offsetTop <= marker) current = el;
        else break;
      }
      setActive(`#${current.id}`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return active;
}

export default function Home() {
  const { x, y } = useMouseParallax();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const activeSection = useActiveSection();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="grain min-h-screen overflow-x-hidden bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* NAV */}
      <header
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-5 py-4 transition-all duration-300 sm:px-6 md:px-14 ${
          scrolled || mobileMenuOpen
            ? "border-b border-border bg-background/90 py-3.5 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <a
          href="#inicio"
          onClick={() => setMobileMenuOpen(false)}
          className="group flex shrink-0 items-center gap-3 select-none"
        >
          <div className="flex flex-col text-left">
            <span className="font-display text-xs sm:text-sm font-black tracking-[-0.02em] leading-none text-foreground transition-colors group-hover:text-foreground/80">
              VICTOR TORRES
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-muted-foreground uppercase mt-0.5">
              ENG. DE SOFTWARE
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex min-w-0 gap-8 font-display text-xs font-semibold tracking-[0.2em]">
          {NAV.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative inline-block after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-full after:bg-foreground after:transition-transform after:duration-300 ${
                  isActive
                    ? "after:scale-x-100"
                    : "after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile / Tablet Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur-md transition-colors hover:bg-foreground hover:text-background lg:hidden cursor-pointer"
        >
          <div className="flex h-3.5 w-4 flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                mobileMenuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </header>

      {/* Mobile / Tablet Drawer */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-background/95 px-6 pt-28 pb-12 backdrop-blur-2xl transition-all duration-500 ease-out lg:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-6"
        }`}
      >
        <div className="space-y-6">
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            [ NAVEGAÇÃO // VT-STUDIO ]
          </p>
          <nav className="flex flex-col">
            {NAV.map((item, idx) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between border-b border-border/60 py-4 transition-colors ${
                    isActive
                      ? "text-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="font-display text-2xl sm:text-3xl font-black tracking-[-0.03em]">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-3">
                    {isActive && <span className="h-2 w-2 rounded-full bg-emerald-500" />}
                    <span className="font-mono text-xs tracking-[0.2em] opacity-40 group-hover:opacity-100">
                      0{idx + 1}
                    </span>
                  </div>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-border/80 pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
              DISPONÍVEL PARA PROJETOS
            </span>
          </div>
          <div className="flex gap-3 text-muted-foreground">
            <a
              href="https://github.com/iamvictormt"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center border border-border/80 bg-card/60 transition-colors hover:border-foreground hover:text-foreground"
            >
              <Github size={18} strokeWidth={1.8} />
            </a>
            <a
              href="https://linkedin.com/in/iamvictormt"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center border border-border/80 bg-card/60 transition-colors hover:border-foreground hover:text-foreground"
            >
              <Linkedin size={18} strokeWidth={1.8} />
            </a>
            <a
              href="https://instagram.com/iamvictormt"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-11 w-11 items-center justify-center border border-border/80 bg-card/60 transition-colors hover:border-foreground hover:text-foreground"
            >
              <Instagram size={18} strokeWidth={1.8} />
            </a>

            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Contato"
              className="inline-flex h-11 w-11 items-center justify-center border border-border/80 bg-card/60 transition-colors hover:border-foreground hover:text-foreground"
            >
              <Mail size={18} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section
        id="inicio"
        className="relative flex min-h-screen items-center px-6 pt-32 pb-20 md:px-14"
      >
        <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 lg:grid-cols-2">
          {/* LEFT: EDITORIAL COPY */}
          <div className="relative z-20 space-y-6">
            <span className="block font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
              [ 01 // INÍCIO ]
            </span>

            <h1 className="font-display text-[13vw] leading-[0.88] font-black tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              full stack
              <br />
              developer.
            </h1>

            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Olá, eu sou <strong>Victor Torres</strong>. Formado em Engenharia de Software,
              construo produtos completos — da interface de alto impacto à arquitetura escalável e
              resiliente.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projetos"
                className="group inline-flex items-center gap-4 font-display text-xs font-semibold tracking-[0.2em]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
                VER PROJETOS
              </a>

              <a
                href="#contato"
                className="inline-flex items-center rounded-full border border-border px-6 py-4 font-display text-xs font-semibold tracking-[0.2em] transition-colors hover:border-foreground"
              >
                FALAR COMIGO
              </a>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <a
                className="transition-colors hover:text-foreground"
                href="https://github.com/iamvictormt"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <span>/</span>
              <a
                className="transition-colors hover:text-foreground"
                href="https://linkedin.com/in/iamvictormt"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <span>/</span>
              <a
                className="transition-colors hover:text-foreground"
                href="https://instagram.com/iamvictormt"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <span>/</span>
              <a className="transition-colors hover:text-foreground" href="#contato">
                Email
              </a>
            </div>
          </div>

          {/* RIGHT: 4-PLANE 3D PARALLAX */}
          <div className="relative flex h-[50vh] items-center justify-center md:h-[80vh] select-none">
            {/* Plane 1: Orbital Blueprint Rings */}
            <div
              className="pointer-events-none absolute aspect-square w-[88%] max-w-[560px] opacity-40 transition-transform duration-200 ease-out"
              style={{ transform: `translate3d(${x * -16}px, ${y * -16}px, 0)` }}
            >
              <svg viewBox="0 0 500 500" className="h-full w-full stroke-foreground fill-none">
                <circle cx="250" cy="250" r="236" strokeWidth="0.8" strokeDasharray="3 6" />
                <circle cx="250" cy="250" r="195" strokeWidth="1" />
                <circle cx="250" cy="250" r="148" strokeWidth="0.75" strokeDasharray="6 6" />

                <line x1="250" y1="6" x2="250" y2="24" strokeWidth="1.5" />
                <line x1="250" y1="476" x2="250" y2="494" strokeWidth="1.5" />
                <line x1="6" y1="250" x2="24" y2="250" strokeWidth="1.5" />
                <line x1="476" y1="250" x2="494" y2="250" strokeWidth="1.5" />

                <circle cx="95" cy="95" r="2.5" fill="currentColor" />
                <circle cx="405" cy="95" r="2.5" fill="currentColor" />
                <circle cx="95" cy="405" r="2.5" fill="currentColor" />
                <circle cx="405" cy="405" r="2.5" fill="currentColor" />

                <text
                  x="250"
                  y="44"
                  textAnchor="middle"
                  className="font-mono text-[9px] tracking-[0.32em] fill-foreground/60"
                >
                  VT // SYSTEM ARCHITECTURE &bull; FULL STACK
                </text>
                <text
                  x="250"
                  y="464"
                  textAnchor="middle"
                  className="font-mono text-[8px] tracking-[0.28em] fill-foreground/45"
                >
                  PRECISION SOFTWARE ENGINEERING &bull; BR
                </text>
              </svg>
            </div>

            {/* Plane 2: Architectural Backdrop Monolith */}
            <div
              className="pointer-events-none absolute aspect-[4/5] w-[74%] max-w-[420px] rounded-[2.5rem] border border-border/80 bg-gradient-to-b from-card/90 via-card/50 to-transparent backdrop-blur-sm shadow-inner transition-transform duration-200 ease-out"
              style={{
                transform: `translate3d(${x * -26}px, ${y * -26}px, 0) rotate(${x * 3.5}deg)`,
              }}
            >
              <div className="absolute top-4 left-5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.22em] text-muted-foreground uppercase">
                  ENGINEERING STUDIO
                </span>
              </div>
              <div className="absolute bottom-4 right-5 font-mono text-[9px] tracking-[0.18em] text-muted-foreground/60">
                [ 001 // SPEC ]
              </div>
            </div>

            {/* Plane 3: The Classical Sculpture */}
            <div
              className="relative z-10 flex h-full w-auto items-center justify-center transition-transform duration-150 ease-out"
              style={{ transform: `translate3d(${x * 22}px, ${y * 22}px, 0)` }}
            >
              <Image
                src="/assets/bust.png"
                alt="Escultura artística representando o trabalho de Victor Torres"
                width={768}
                height={960}
                priority
                className="h-[88%] w-auto max-h-[465px] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>

            {/* Plane 4: Foreground Holographic Chips */}
            <div
              className="pointer-events-none absolute top-[24%] left-[2%] z-20 rounded-xl border border-border/80 bg-background/90 px-3.5 py-2 shadow-lg backdrop-blur-md transition-transform duration-200 ease-out"
              style={{ transform: `translate3d(${x * 46}px, ${y * 46}px, 0)` }}
            >
              <p className="font-mono text-[9px] font-bold tracking-[0.2em] text-muted-foreground">
                CORE STACK
              </p>
              <p className="font-display text-xs font-semibold text-foreground">
                Next.js · Node · Cloud
              </p>
            </div>

            <div
              className="pointer-events-none absolute right-[2%] bottom-[22%] z-20 rounded-xl border border-border/80 bg-background/90 px-3.5 py-2 shadow-lg backdrop-blur-md transition-transform duration-200 ease-out"
              style={{ transform: `translate3d(${x * 52}px, ${y * 52}px, 0)` }}
            >
              <p className="font-mono text-[9px] font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                LATÊNCIA &lt; 14ms
              </p>
              <p className="font-display text-xs font-semibold text-foreground">
                High Availability
              </p>
            </div>
          </div>
        </div>

        <div className="absolute right-6 bottom-16 hidden flex-col items-center gap-4 md:flex">
          <span className="vertical-text font-mono text-[10px] tracking-[0.3em]">SCROLL DOWN</span>
          <span className="h-20 w-px bg-foreground" />
        </div>
      </section>

      {/* REFINED TECHNICAL MARQUEE */}
      <div className="overflow-hidden border-y border-border bg-card/40 py-4 select-none">
        <div className="marquee-track flex w-max font-mono text-xs font-semibold tracking-[0.2em] whitespace-nowrap">
          {[...STACK, ...STACK].map((item, i) => (
            <span key={i} className="flex items-center gap-3 px-6">
              <span className="text-foreground">{item.name}</span>
              <span className="rounded border border-border/80 bg-background px-1.5 py-0.5 text-[8px] text-muted-foreground">
                {item.tag}
              </span>
              <span className="opacity-30 text-foreground">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* SOBRE */}
      <section id="sobre" className="px-6 py-28 md:px-14 border-b border-border/60">
        <div className="mx-auto max-w-[1400px] space-y-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <div className="space-y-4">
                <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
                  [ 02 // TRAJETÓRIA ]
                </span>
                <h2 className="font-display text-5xl leading-[0.9] font-black tracking-[-0.03em] md:text-7xl">
                  sobre
                  <br />
                  mim.
                </h2>
              </div>
            </Reveal>

            <div className="space-y-8">
              <Reveal delay={100}>
                <p className="text-lg leading-relaxed md:text-2xl font-normal">
                  Engenheiro de Software com foco em sistemas de ponta a ponta. Minha abordagem une
                  rigor arquitetural no back-end com interfaces rápidas e produtos que encantam. Não
                  construo apenas telas: arquiteto soluções sólidas prontas para escalar.
                </p>
              </Reveal>

              {/* Swiss Metric Grid */}
              <div className="grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-3">
                {[
                  { k: "7+", v: "anos de código", code: "EXP // 01" },
                  { k: "18+", v: "projetos entregues", code: "PRJ // 02" },
                  { k: "99.9%", v: "uptime em produção", code: "SLA // 03" },
                ].map((s, i) => (
                  <Reveal key={s.k} delay={150 + i * 100}>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-muted-foreground/60 tracking-[0.2em]">
                        {s.code}
                      </span>
                      <p className="font-display text-4xl font-black md:text-6xl">{s.k}</p>
                      <p className="text-xs tracking-[0.15em] text-muted-foreground uppercase">
                        {s.v}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPACIDADES & METODOLOGIA */}
      <section
        id="capacidades"
        className="px-6 py-28 md:px-14 border-b border-border/60 bg-card/20"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <Reveal>
              <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
                [ 03 // COMPETÊNCIAS & FLUXO ]
              </span>
              <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.03em] md:text-6xl">
                capacidades
                <br />
                técnicas.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Do design dos contratos de dados até o deploy automatizado na nuvem, cada etapa é
                orientada a previsibilidade, performance e segurança.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((cap, i) => (
              <Reveal key={cap.n} delay={i * 80}>
                <div className="group h-full flex flex-col justify-between rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-foreground hover:bg-card">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <span className="font-mono text-xs text-muted-foreground">{cap.n}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground opacity-30 group-hover:opacity-100 group-hover:bg-emerald-500 transition-all" />
                    </div>
                    <h3 className="font-display text-xl font-bold tracking-tight">{cap.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{cap.desc}</p>
                  </div>
                  <div className="mt-8 border-t border-border/40 pt-4">
                    <p className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground/70 uppercase">
                      {cap.tools}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="px-6 py-28 md:px-14 border-b border-border/60">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 space-y-3">
            <Reveal>
              <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
                [ 04 // PORTFÓLIO ]
              </span>
              <h2 className="mt-3 font-display text-5xl font-black tracking-[-0.03em] md:text-7xl">
                projetos.
              </h2>
            </Reveal>
          </div>

          <div className="border-t border-border">
            <ProjectShowcase projects={PROJECTS} />
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="relative px-6 py-32 md:px-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-center">
            <Reveal>
              <div className="space-y-6">
                <span className="block font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
                  [ 05 // CONTATO ]
                </span>

                <h2 className="font-display text-5xl font-black tracking-[-0.04em] sm:text-6xl md:text-8xl leading-[0.9]">
                  vamos
                  <br />
                  conversar?
                </h2>

                <p className="max-w-md text-base text-muted-foreground">
                  Tem um produto desafiador ou quer elevar a arquitetura do seu sistema? Estou à
                  disposição para novos projetos e squads de tecnologia.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 font-display text-xs font-semibold tracking-[0.18em] text-background transition-all hover:opacity-90 cursor-pointer"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    {copied ? "E-MAIL COPIADO!" : "COPIAR E-MAIL"}
                  </button>

                  <a
                    href="https://linkedin.com/in/iamvictormt"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-4 font-display text-xs font-semibold tracking-[0.18em] transition-colors hover:border-foreground"
                  >
                    LINKEDIN
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Contact Status Info Card */}
            <Reveal delay={150}>
              <div className="rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-md space-y-6">
                <div className="border-b border-border/60 pb-4">
                  <p className="font-mono text-xs text-muted-foreground tracking-[0.2em]">
                    [ INFORMAÇÕES DE CONTATO ]
                  </p>
                  <p className="mt-2 font-display text-lg font-bold">{CONTACT_EMAIL}</p>
                </div>

                <div className="space-y-3 font-mono text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>FUSO HORÁRIO:</span>
                    <span className="text-foreground">SÃO PAULO (UTC-3)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RESPOSTA:</span>
                    <span className="text-foreground">&lt; 24 HORAS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MODALIDADE:</span>
                    <span className="text-foreground">REMOTO / HÍBRIDO</span>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-4 flex gap-4 text-xs font-mono">
                  <a
                    href="https://github.com/iamvictormt"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground text-muted-foreground transition-colors"
                  >
                    GITHUB →
                  </a>
                  <a
                    href="https://linkedin.com/in/iamvictormt"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground text-muted-foreground transition-colors"
                  >
                    LINKEDIN →
                  </a>
                  <a
                    href="https://instagram.com/iamvictormt"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground text-muted-foreground transition-colors"
                  >
                    INSTAGRAM →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col gap-4 border-t border-border px-6 py-10 font-mono text-[11px] tracking-[0.18em] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-14">
        <span>&copy; {new Date().getFullYear()} VICTOR TORRES // TODOS OS DIREITOS RESERVADOS</span>
        <span>ENG. DE SOFTWARE &bull; NEXT.JS 15 &bull; BRASIL</span>
      </footer>
    </div>
  );
}
