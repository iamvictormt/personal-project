"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowDownRight,
  Check,
  Copy,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
import ProjectShowcase from "@/components/project-showcase";
import { PROJECTS } from "@/data/projects";

interface CapabilityItem {
  title: string;
  desc: string;
}

interface ExperienceItem {
  company: string;
  period: string;
  desc: string;
}

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre", index: "01" },
  { label: "Processo", href: "#processo", index: "02" },
  { label: "Experiência", href: "#experiencia", index: "03" },
  { label: "Projetos", href: "#projetos", index: "04" },
  { label: "Contato", href: "#contato", index: "05" },
];

const STACK = [
  "Angular",
  "AWS",
  "Cloud",
  "CSS",
  "Docker",
  "Git",
  "GraphQL",
  "HTML",
  "Ionic",
  "Java",
  "JavaScript",
  "MySQL",
  "NestJS",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "React",
  "React Native",
  "Redis",
  "Spring Boot",
  "Tailwind CSS",
  "TypeScript",
  "VPS",
];

const CAPABILITIES: CapabilityItem[] = [
  {
    title: "Entender",
    desc: "Problema, contexto, usuário e restrições antes de abrir o editor.",
  },
  {
    title: "Desenhar",
    desc: "Fluxo, interface, dados e arquitetura em uma direção simples para executar.",
  },
  {
    title: "Construir",
    desc: "Front-end, back-end, integrações e implantação com código legível.",
  },
  {
    title: "Refinar",
    desc: "Desempenho, estabilidade, responsividade e pequenos detalhes de experiência.",
  },
];

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Stefanini Group",
    period: "2021 - atual",
    desc: "Atuação full stack em projetos da Polícia Federal.",
  },
  {
    company: "Kingspan Isoeste",
    period: "2021",
    desc: "Sistema interno de controle operacional.",
  },
  {
    company: "Fábrica de Tecnologias Turing",
    period: "2018 - 2021",
    desc: "Projeto acadêmico e financeiro com Angular e modelagem de dados.",
  },
];

const CONTACT_EMAIL = "victorres@icloud.com";
const WHATSAPP_URL =
  "https://wa.me/5562985329181?text=Ol%C3%A1%2C%20Victor!%20Vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar%20sobre%20um%20projeto.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://victortorres.dev/#person",
      name: "Victor Monteiro Torres",
      jobTitle: "Software Developer",
      email: CONTACT_EMAIL,
      url: "https://victortorres.dev",
      sameAs: [
        "https://github.com/iamvictormt",
        "https://linkedin.com/in/iamvictormt",
        "https://instagram.com/iamvictormt",
      ],
      knowsAbout: [
        "Angular",
        "AWS",
        "Docker",
        "GraphQL",
        "Ionic",
        "Java",
        "JavaScript",
        "MySQL",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "React",
        "React Native",
        "Spring Boot",
        "TypeScript",
        "VPS",
        "Desenvolvimento Full Stack",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://victortorres.dev/#service",
      name: "Victor Monteiro Torres",
      url: "https://victortorres.dev",
      email: CONTACT_EMAIL,
      areaServed: "BR",
      serviceType: [
        "Desenvolvimento de sites profissionais",
        "Landing pages para tráfego pago",
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
      name: "Victor Monteiro Torres",
      url: "https://victortorres.dev",
      inLanguage: "pt-BR",
      publisher: {
        "@id": "https://victortorres.dev/#person",
      },
    },
    {
      "@type": "ItemList",
      "@id": "https://victortorres.dev/#projects",
      name: "Projetos de Victor Monteiro Torres",
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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShown(true);
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
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
      const marker = window.scrollY + window.innerHeight * 0.38;
      let current = els[0];

      for (const el of els) {
        if (el.offsetTop <= marker) current = el;
      }

      if (current) setActive(`#${current.id}`);
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

function usePointerField() {
  const [field, setField] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setField({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return field;
}

function SectionShell({
  id,
  index,
  label,
  title,
  note,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section-shell">
      <div className="section-grid">
        <Reveal>
          <div className="section-kicker">
            <span>{index}</span>
            <span>{label}</span>
          </div>
        </Reveal>
        <div className="space-y-12">
          <Reveal delay={70}>
            <div className="section-heading">
              <h2>{title}</h2>
              <p>{note}</p>
            </div>
          </Reveal>
          {children}
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
  );
}

function BrazilFlagIcon({ width = 16 }: { width?: number }) {
  return (
    <svg
      aria-label="Brasil"
      role="img"
      width={width}
      height={Math.round(width * 0.696)}
      viewBox="0 0 55.2 38.4"
      xmlns="http://www.w3.org/2000/svg"
      className="brazil-flag"
    >
      <path
        fill="#009B3A"
        d="M3.03 0h49.13c1.67 0 3.03 1.36 3.03 3.03v32.33c0 1.67-1.36 3.03-3.03 3.03H3.03C1.36 38.4 0 37.04 0 35.37V3.03C0 1.36 1.36 0 3.03 0Z"
      />
      <path fill="#FEDF00" d="M4.24 19.2 27.6 34.11 50.96 19.2 27.6 4.29 4.24 19.2Z" />
      <path
        fill="#002776"
        d="M27.6 9.35c5.44 0 9.85 4.41 9.85 9.85s-4.41 9.85-9.85 9.85-9.85-4.41-9.85-9.85 4.41-9.85 9.85-9.85Z"
      />
      <path
        fill="#fff"
        d="M18.59 15.22c1.1-.16 2.23-.24 3.38-.24 5.86 0 11.22 2.11 15.38 5.6-.07.54-.19 1.06-.35 1.56-3.98-3.58-9.25-5.76-15.03-5.76-1.33 0-2.64.12-3.91.34.14-.52.32-1.02.53-1.5Z"
      />
    </svg>
  );
}

export default function Home() {
  const activeSection = useActiveSection();
  const { x, y } = usePointerField();
  const parallaxX = (x - 50) / 50;
  const parallaxY = (y - 50) / 50;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <main
      className="min-h-screen overflow-x-hidden bg-background text-foreground"
      style={
        {
          "--pointer-x": `${x}%`,
          "--pointer-y": `${y}%`,
        } as React.CSSProperties
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="pointer-field" aria-hidden="true" />

      <header className={`site-header ${scrolled || mobileMenuOpen ? "site-header-scrolled" : ""}`}>
        <div className="site-header-inner">
          <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="brand-link">
            <span>Victor M. Torres</span>
            <small>Software Engineer</small>
          </a>

          <nav className="header-nav" aria-label="Navegação principal">
            {NAV.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <span className="header-meta">
            <BrazilFlagIcon />
            Brasil / Remoto
          </span>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            className="menu-button"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            <span>{mobileMenuOpen ? "fechar" : "menu"}</span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background px-5 pt-24 pb-8 transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="grid border-t border-border">
          {NAV.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between border-b border-border py-5 ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span className="font-display text-3xl font-semibold tracking-[-0.04em]">
                  {item.label}
                </span>
                {item.index ? (
                  <span className="font-mono text-[10px] tracking-[0.2em]">{item.index}</span>
                ) : null}
              </a>
            );
          })}
        </nav>
      </div>

      <section
        id="inicio"
        className="relative flex min-h-[100svh] items-end border-b border-border px-5 pt-24 pb-10 md:px-10 md:pb-14 lg:items-center lg:pt-28 lg:pb-8"
      >
        <div className="mx-auto grid w-full max-w-[1360px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] lg:items-end">
          <div className="max-w-[58rem]">
            <Reveal>
              <p className="mb-8 max-w-sm font-mono text-[10px] leading-relaxed tracking-[0.22em] text-muted-foreground uppercase">
                Desenvolvedor de software no Brasil. Produtos digitais, sistemas web e interfaces com
                intenção.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="font-display text-[clamp(4.2rem,16vw,11.5rem)] leading-[0.82] font-semibold tracking-[-0.065em]">
                Victor
                <br />
                Torres
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#projetos" className="minimal-action">
                  <ArrowDownRight size={18} strokeWidth={1.7} />
                  Ver projetos
                </a>
                <button type="button" onClick={handleCopyEmail} className="minimal-action-muted">
                  {copied ? (
                    <Check size={17} strokeWidth={1.8} />
                  ) : (
                    <Copy size={17} strokeWidth={1.8} />
                  )}
                  {copied ? "Email copiado" : CONTACT_EMAIL}
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <aside className="hero-note">
              <div
                className="hero-portrait"
                style={
                  {
                    "--portrait-x": `${parallaxX * 8}px`,
                    "--portrait-y": `${parallaxY * 6}px`,
                    "--study-x": `${parallaxX * -14}px`,
                    "--study-y": `${parallaxY * -10}px`,
                  } as React.CSSProperties
                }
              >
                <svg
                  className="renaissance-study"
                  viewBox="0 0 360 460"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle cx="180" cy="220" r="148" />
                  <circle cx="180" cy="220" r="91" />
                  <circle cx="180" cy="220" r="56" />
                  <path className="study-axis" d="M180 54v332M38 220h284" />
                  <path className="study-axis" d="M64 116h232M64 324h232" />
                  <path className="study-arc" d="M78 274c24 54 63 81 116 81 46 0 84-22 114-66" />
                  <path className="study-arc" d="M75 171c28-46 66-69 113-69 42 0 78 18 106 55" />
                  <path
                    className="golden-spiral"
                    d="M262 99c47 39 51 111 6 157-44 46-119 43-159-4-39-46-29-113 16-145 44-31 104-22 134 19 29 41 18 94-20 119-37 25-85 14-106-19-20-32-10-71 20-89 29-18 66-8 81 18 15 25 5 54-18 67-22 12-49 4-59-16"
                  />
                  <g className="study-marks">
                    <path d="M57 220h28M275 220h28M180 61v28M180 351v28" />
                    <path d="M94 116v24M266 116v24M94 300v24M266 300v24" />
                    <path d="M121 84h118M121 356h118" />
                  </g>
                  <text x="66" y="153">
                    proportio
                  </text>
                  <text x="238" y="307">
                    aurea
                  </text>
                </svg>
                <Image
                  src="/assets/bust.png"
                  alt="Representação visual do estúdio de Victor Torres"
                  width={520}
                  height={650}
                  priority
                  className="h-full w-full object-contain object-bottom"
                />
              </div>
              <p>
                Sou formado em Engenharia de Software pela UniEVANGÉLICA e atuo em desenvolvimento
                web com front-end, back-end e arquitetura de sistemas.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      <div className="stack-marquee" aria-label="Stack principal">
        <div className="stack-marquee-track">
          {[...STACK, ...STACK, ...STACK].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <SectionShell
        id="sobre"
        index="01"
        label="Sobre"
        title="Engenharia, interface e produto."
        note="Minha base vem da engenharia de software; minha entrega combina código, clareza e experiência."
      >
        <Reveal>
          <div className="statement-grid">
            <p className="break-words">
              Sou Victor Monteiro Torres, desenvolvedor de software formado pela UniEVANGÉLICA.
              Trabalho com aplicações web de ponta a ponta, conectando interfaces objetivas,
              serviços de back-end bem organizados e decisões técnicas que sustentam o produto
              depois do lançamento.
            </p>
            <div className="facts-grid">
              {[
                ["2021", "formação em engenharia"],
                ["9+", "anos de desenvolvimento"],
                ["18+", "projetos digitais"],
              ].map(([value, label]) => (
                <div key={value} className="fact-item">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        id="processo"
        index="02"
        label="Processo"
        title="Como construo."
        note="Um fluxo simples para transformar uma ideia em produto utilizável."
      >
        <div className="process-list">
          {CAPABILITIES.map((cap, index) => (
            <Reveal key={cap.title} delay={index * 80}>
              <article className="process-row">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{cap.title}</h3>
                <p>{cap.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="experiencia"
        index="03"
        label="Experiência"
        title="Onde atuei."
        note="Um recorte curto da minha trajetória profissional."
      >
        <Reveal>
          <div className="experience-list">
            {EXPERIENCES.map((experience) => (
              <article key={experience.company} className="experience-row">
                <span>{experience.period}</span>
                <strong>{experience.company}</strong>
                <p>{experience.desc}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        id="projetos"
        index="04"
        label="Projetos"
        title="Meus trabalhos."
        note="Uma seleção de sistemas, plataformas e páginas que mostram diferentes tipos de desafio."
      >
        <Reveal>
          <ProjectShowcase projects={PROJECTS} />
        </Reveal>
      </SectionShell>

      <SectionShell
        id="contato"
        index="05"
        label="Contato"
        title="Vamos conversar."
        note="Vamos tirar uma ideia do papel, redesenhar um produto ou melhorar um sistema existente."
      >
        <Reveal>
          <div className="contact-panel">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="contact-link">
              Iniciar conversa
              <WhatsAppIcon size={18} />
            </a>
          </div>
        </Reveal>
      </SectionShell>

      <footer className="border-t border-border px-5 py-8 md:px-10">
        <div className="footer-grid">
          <span>&copy; {new Date().getFullYear()} Victor Monteiro Torres</span>
          <div className="social-row">
            <a
              href="https://github.com/iamvictormt"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={18} strokeWidth={1.7} />
            </a>
            <a
              href="https://linkedin.com/in/iamvictormt"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} strokeWidth={1.7} />
            </a>
            <a
              href="https://instagram.com/iamvictormt"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={18} strokeWidth={1.7} />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon size={18} />
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email">
              <Mail size={18} strokeWidth={1.7} />
            </a>
          </div>
          <span>Next.js 15 / Brasil</span>
        </div>
      </footer>
    </main>
  );
}
