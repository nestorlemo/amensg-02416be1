import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, Sparkles, Brain, Workflow, Plug, Code2, Database, FileCheck2,
  Repeat, Network, FileSpreadsheet, BookOpen, ClipboardCheck,
  MessageCircle, Mail, MapPin, Phone, Cpu, ShieldCheck, LineChart,
  Search, PencilRuler, Hammer, Gauge,
} from "lucide-react";
import { Header } from "@/components/amensg/Header";
import { Logo } from "@/components/amensg/Logo";
import { CoreDiagram } from "@/components/amensg/CoreDiagram";
import { ContactForm } from "@/components/amensg/ContactForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AMENSG IT Automation | IA, automatización e integración de sistemas" },
      {
        name: "description",
        content:
          "AMENSG SRL diseña soluciones de automatización inteligente, agentes de IA, integración de sistemas y software empresarial para optimizar procesos reales de negocio.",
      },
      {
        name: "keywords",
        content:
          "automatización, inteligencia artificial, agentes IA, integración de sistemas, software empresarial, Montevideo, Uruguay, n8n, SAP, OpenAI",
      },
      { property: "og:title", content: "AMENSG IT Automation | IA, automatización e integración de sistemas" },
      { property: "og:description", content: "Automatización inteligente, agentes de IA e integración de sistemas para procesos empresariales." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Problems />
        <Services />
        <Architecture />
        <Cases />
        <Sectors />
        <Process />
        <Team />
        <Tech />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ───────────────────────── HERO ───────────────────────── */

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-hero-gradient text-white pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cyan-bright/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-teal-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-medium text-cyan-bright">
            <Sparkles className="h-3.5 w-3.5" /> AI-Powered Automation
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.05] font-bold text-white">
            IA y automatización para{" "}
            <span className="text-gradient-cyan">procesos empresariales</span>{" "}
            que no pueden fallar
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/75 max-w-xl leading-relaxed">
            En AMENSG diseñamos agentes de IA, integraciones y software a medida para
            automatizar procesos operativos, conectar sistemas existentes y reducir tareas
            manuales en empresas.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-navy-deep font-semibold hover:bg-cyan-bright hover:text-navy-deep transition shadow-[0_12px_40px_-12px_rgba(25,195,255,0.6)]"
            >
              Analizar mi proceso <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/25 text-white hover:bg-white/10 transition font-medium"
            >
              Ver servicios
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-px max-w-xl rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04]">
            {[
              { k: "+10", v: "años de experiencia" },
              { k: "100%", v: "integrado con tus sistemas" },
              { k: "24/7", v: "procesos sin intervención" },
            ].map((s) => (
              <div key={s.v} className="bg-navy-deep/40 px-4 py-4">
                <dt className="text-2xl font-bold text-white font-display leading-none">{s.k}</dt>
                <dd className="mt-1.5 text-[11px] text-white/65 leading-snug">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <CoreDiagram />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── PROBLEMS ───────────────────────── */

function Problems() {
  const items = [
    { icon: Repeat, text: "Tareas repetitivas que consumen horas operativas" },
    { icon: Network, text: "Sistemas internos que no se comunican entre sí" },
    { icon: FileSpreadsheet, text: "Datos dispersos en planillas, plataformas y bases de datos" },
    { icon: FileCheck2, text: "Procesos de activación, validación o facturación con errores manuales" },
    { icon: BookOpen, text: "Conocimiento interno difícil de consultar o reutilizar" },
    { icon: ClipboardCheck, text: "Reportes y controles que dependen de personas clave" },
  ];
  return (
    <Section id="problemas" eyebrow="Problemas que resolvemos">
      <SectionHeading>
        Procesos complejos, sistemas desconectados y trabajo manual{" "}
        <span className="text-tech-blue">no deberían frenar la operación</span>
      </SectionHeading>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(({ icon: Icon, text }) => (
          <div key={text} className="group p-6 rounded-2xl border border-border bg-card hover:border-tech-blue/40 hover:shadow-[0_18px_40px_-24px_rgba(23,105,224,0.35)] transition-all">
            <div className="h-11 w-11 rounded-xl bg-surface flex items-center justify-center text-tech-blue group-hover:bg-tech-blue group-hover:text-white transition">
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── SERVICES ───────────────────────── */

function Services() {
  const services = [
    { icon: Workflow, title: "Automatización inteligente de procesos",
      desc: "Automatizamos tareas operativas, administrativas y de control, reduciendo intervención manual y mejorando la trazabilidad." },
    { icon: Brain, title: "Agentes de inteligencia artificial para empresas",
      desc: "Diseñamos asistentes y agentes de IA capaces de consultar conocimiento, responder preguntas, ejecutar flujos y asistir a equipos internos." },
    { icon: Plug, title: "Integración de sistemas empresariales",
      desc: "Conectamos ERP, SAP, APIs, bases de datos, plataformas web y herramientas internas para que la información fluya sin fricción." },
    { icon: Code2, title: "Desarrollo y mantenimiento de software",
      desc: "Construimos y evolucionamos aplicaciones empresariales, plataformas web y soluciones a medida con foco en estabilidad y continuidad operativa." },
    { icon: Database, title: "Gestión y explotación de datos",
      desc: "Estructuramos, procesamos y transformamos datos para generar reportes, controles, análisis y automatizaciones basadas en información confiable." },
    { icon: FileCheck2, title: "Procesos de activación, validación y facturación",
      desc: "Automatizamos flujos operativos de alto volumen vinculados a activaciones, validaciones, conciliaciones y facturación." },
  ];
  return (
    <Section id="servicios" eyebrow="Servicios" tone="surface">
      <SectionHeading>
        Soluciones para automatizar, integrar y{" "}
        <span className="text-tech-blue">escalar operaciones</span>
      </SectionHeading>
      <p className="mt-4 max-w-2xl text-muted-foreground text-[15px]">
        Combinamos automatización, IA, integración y desarrollo para resolver procesos completos, no tareas aisladas.
      </p>

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map(({ icon: Icon, title, desc }) => (
          <article key={title} className="relative p-7 rounded-2xl bg-card border border-border hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-25px_rgba(11,31,58,0.25)] transition-all overflow-hidden">
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-tech-blue/5" />
            <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-tech-blue to-cyan-bright text-white flex items-center justify-center shadow-[0_10px_24px_-10px_rgba(23,105,224,0.6)]">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="relative mt-5 text-lg font-semibold text-foreground leading-snug">{title}</h3>
            <p className="relative mt-2.5 text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── ARCHITECTURE ───────────────────────── */

function Architecture() {
  const layers = [
    { title: "Canales", color: "from-tech-blue to-cyan-bright", icon: MessageCircle,
      items: ["Web", "WhatsApp", "Teams", "Email"] },
    { title: "Orquestación", color: "from-cyan-bright to-teal-accent", icon: Workflow,
      items: ["n8n", "Backend", "APIs"] },
    { title: "Inteligencia", color: "from-teal-accent to-tech-blue", icon: Cpu,
      items: ["OpenAI", "RAG", "Agentes IA", "Embeddings"] },
    { title: "Sistemas", color: "from-tech-blue to-navy", icon: Database,
      items: ["SAP", "Bases de datos", "Plataformas internas", "Archivos", "Reportes"] },
    { title: "Resultado", color: "from-teal-accent to-cyan-bright", icon: ShieldCheck,
      items: ["Automatización", "Trazabilidad", "Menos errores", "Mejor operación"] },
  ];
  return (
    <Section id="arquitectura" eyebrow="Arquitectura" tone="navy">
      <SectionHeading invert>
        Una arquitectura pensada para <span className="text-gradient-cyan">integrarse con la operación real</span>
      </SectionHeading>
      <p className="mt-4 max-w-2xl text-white/70 text-[15px]">
        Nuestras soluciones combinan IA, orquestación, backend e integración para convivir con los sistemas
        que la empresa ya utiliza.
      </p>

      <div className="mt-12 space-y-4">
        {layers.map((l, idx) => {
          const Icon = l.icon;
          return (
            <div key={l.title} className="relative">
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-5 md:p-6 rounded-2xl glass-card">
                <div className="flex items-center gap-4 md:w-64 shrink-0">
                  <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-bright/80 font-semibold">Capa {idx + 1}</div>
                    <div className="text-white font-semibold">{l.title}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {l.items.map((i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/90">{i}</span>
                  ))}
                </div>
              </div>
              {idx < layers.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="h-6 w-px bg-gradient-to-b from-cyan-bright/60 to-transparent" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ───────────────────────── CASES ───────────────────────── */

function Cases() {
  const cases = [
    { title: "Automatización de activaciones y facturación",
      problem: "Procesos manuales de validación, activación y facturación con alto volumen operativo.",
      solution: "Automatización de controles, generación de archivos, validación de inconsistencias e integración con sistemas internos.",
      impact: "Menor carga operativa, reducción de errores y mayor trazabilidad." },
    { title: "Agente de IA para consulta de conocimiento interno",
      problem: "Información dispersa en documentos, reuniones y procedimientos difíciles de consultar.",
      solution: "Agente de IA conectado a una base de conocimiento, capaz de responder preguntas y guiar usuarios.",
      impact: "Mejor acceso al conocimiento, capacitación más rápida y menor dependencia de referentes clave." },
    { title: "Integración de plataformas empresariales",
      problem: "Sistemas aislados, procesos duplicados y planillas manuales.",
      solution: "Integración mediante APIs, bases de datos, automatizaciones y backend de soporte.",
      impact: "Flujo de información más confiable, menos reprocesos y mejor control operativo." },
    { title: "Prototipado funcional desde relevamientos",
      problem: "Las necesidades del negocio tardan en convertirse en soluciones visibles.",
      solution: "Pipeline que transforma relevamientos, reuniones y documentación en prototipos funcionales validables.",
      impact: "Menor tiempo entre idea, validación y evolución de producto." },
  ];

  return (
    <Section id="casos" eyebrow="Casos de uso" tone="surface">
      <SectionHeading>
        Resultados sobre <span className="text-tech-blue">procesos reales</span>
      </SectionHeading>
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {cases.map((c, i) => (
          <article key={c.title} className="p-7 rounded-2xl bg-card border border-border hover:border-tech-blue/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.25em] uppercase text-tech-blue font-semibold">Caso 0{i+1}</span>
              <LineChart className="h-4 w-4 text-tech-blue/60" />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-foreground">{c.title}</h3>
            <dl className="mt-5 space-y-3 text-sm">
              <CaseRow label="Problema" value={c.problem} />
              <CaseRow label="Solución" value={c.solution} />
              <CaseRow label="Impacto" value={c.impact} accent />
            </dl>
          </article>
        ))}
      </div>
    </Section>
  );
}
function CaseRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
      <dt className={`text-[11px] uppercase tracking-wider font-semibold pt-0.5 ${accent ? "text-teal-accent" : "text-muted-foreground"}`}>{label}</dt>
      <dd className="text-foreground/85 leading-relaxed">{value}</dd>
    </div>
  );
}

/* ───────────────────────── SECTORS ───────────────────────── */

function Sectors() {
  const sectors = [
    "Retail", "Servicios corporativos", "Operaciones administrativas",
    "Plataformas web", "Integración de datos", "Procesos de facturación",
    "Back-office", "Logística",
  ];
  return (
    <Section id="experiencia" eyebrow="Áreas de aplicación">
      <SectionHeading>
        Experiencia en procesos críticos y <span className="text-tech-blue">operaciones empresariales</span>
      </SectionHeading>
      <p className="mt-4 max-w-2xl text-muted-foreground text-[15px]">
        Trabajamos sobre procesos administrativos, operativos y de gestión que combinan sistemas,
        datos y personas: activaciones, validaciones, facturación, reportes e integraciones.
      </p>
      <div className="mt-10 flex flex-wrap gap-2.5">
        {sectors.map((s) => (
          <span key={s} className="px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-foreground/80 hover:border-tech-blue hover:text-tech-blue transition">
            {s}
          </span>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── PROCESS ───────────────────────── */

function Process() {
  const steps = [
    { icon: Search, title: "Relevamos el proceso", desc: "Entendemos cómo trabaja hoy la operación, qué sistemas intervienen y dónde están los cuellos de botella." },
    { icon: PencilRuler, title: "Diseñamos la solución", desc: "Definimos automatizaciones, integraciones, agentes IA, datos y componentes técnicos necesarios." },
    { icon: Hammer, title: "Construimos e integramos", desc: "Implementamos soluciones mantenibles, conectadas a los sistemas existentes y preparadas para operar." },
    { icon: Gauge, title: "Medimos y evolucionamos", desc: "Ajustamos, escalamos y mejoramos la solución con foco en resultados operativos." },
  ];
  return (
    <Section id="proceso" eyebrow="Cómo trabajamos" tone="surface">
      <SectionHeading>
        Un método <span className="text-tech-blue">claro, técnico y enfocado</span> en resultados
      </SectionHeading>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <div key={title} className="relative p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-tech-blue to-cyan-bright text-white flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-3xl font-bold text-tech-blue/15 font-display">0{i+1}</span>
            </div>
            <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── TEAM ───────────────────────── */

function Team() {
  const team = [
    {
      name: "Néstor Lemo",
      role: "Director / Ingeniería e Innovación",
      bio: "Ingeniero en Informática y Director de AMENSG IT Automation. Especialista en automatización de procesos, integración de sistemas empresariales y soluciones basadas en inteligencia artificial generativa.",
      tag: null as string | null,
      seed: 1,
    },
    {
      name: "Liber",
      role: "Socio / Tecnología y Proyectos",
      bio: "Perfil técnico orientado al desarrollo, implementación y evolución de soluciones tecnológicas empresariales.",
      tag: "Rol a validar",
      seed: 2,
    },
    {
      name: "Jorge",
      role: "Socio / Operaciones y Gestión",
      bio: "Perfil orientado a gestión operativa, coordinación y continuidad de servicios tecnológicos.",
      tag: "Rol a validar",
      seed: 3,
    },
  ];

  return (
    <Section id="equipo" eyebrow="Equipo">
      <SectionHeading>
        Un equipo técnico con foco en <span className="text-tech-blue">procesos reales</span>
      </SectionHeading>
      <p className="mt-4 max-w-2xl text-muted-foreground text-[15px]">
        AMENSG combina experiencia en ingeniería informática, desarrollo de software, integración, automatización
        e inteligencia artificial aplicada a empresas.
      </p>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {team.map((m) => (
          <article key={m.name} className="p-6 rounded-2xl bg-card border border-border hover:border-tech-blue/40 transition">
            <Avatar seed={m.seed} />
            <h3 className="mt-5 text-lg font-semibold text-foreground">{m.name}</h3>
            <p className="text-sm text-tech-blue font-medium">{m.role}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
            {m.tag && (
              <span className="mt-4 inline-block text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-cyan-bright/10 text-tech-blue border border-cyan-bright/30">
                {m.tag}
              </span>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}

function Avatar({ seed }: { seed: number }) {
  // Abstract geometric avatar — no real photos
  const palettes = [
    ["oklch(0.58 0.18 253)", "oklch(0.78 0.15 220)"],
    ["oklch(0.30 0.09 252)", "oklch(0.82 0.15 175)"],
    ["oklch(0.78 0.15 220)", "oklch(0.82 0.15 175)"],
  ];
  const [c1, c2] = palettes[(seed - 1) % palettes.length];
  return (
    <div className="h-16 w-16 rounded-2xl relative overflow-hidden">
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`g${seed}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c1} />
            <stop offset="1" stopColor={c2} />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill={`url(#g${seed})`} />
        <g fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="1.4">
          <circle cx="22" cy="26" r="6" />
          <circle cx="44" cy="38" r="6" />
          <line x1="22" y1="26" x2="44" y2="38" />
          <line x1="22" y1="26" x2="44" y2="14" />
          <circle cx="44" cy="14" r="3" fill="white" fillOpacity="0.6" stroke="none" />
        </g>
      </svg>
    </div>
  );
}

/* ───────────────────────── TECH ───────────────────────── */

function Tech() {
  const tech = ["OpenAI", "n8n", "SAP", "APIs", "Bases de datos", "Java", "Web Apps", "RAG", "Embeddings", "Qdrant", "Google Workspace", "WhatsApp", "Microsoft Teams"];
  return (
    <Section id="tecnologias" eyebrow="Tecnologías" tone="surface">
      <SectionHeading>
        Stack para <span className="text-tech-blue">soluciones empresariales</span>
      </SectionHeading>
      <div className="mt-10 flex flex-wrap gap-2.5">
        {tech.map((t) => (
          <span key={t} className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground/85 hover:border-tech-blue hover:text-tech-blue transition">
            {t}
          </span>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── FINAL CTA ───────────────────────── */

function FinalCTA() {
  return (
    <section className="py-20 md:py-24 px-5 sm:px-8">
      <div className="relative mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-navy-deep via-navy to-tech-blue/80 text-white p-10 md:p-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan-bright/30 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            ¿Qué proceso de tu empresa <span className="text-gradient-cyan">podríamos automatizar?</span>
          </h2>
          <p className="mt-5 text-white/75 text-[15px] md:text-base leading-relaxed">
            Podemos ayudarte a identificar oportunidades concretas de automatización, integración o
            aplicación de IA en procesos operativos existentes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contacto" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-navy-deep font-semibold hover:bg-cyan-bright transition">
              Solicitar diagnóstico <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/59898809241"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/25 text-white hover:bg-white/10 transition font-medium"
            >
              <MessageCircle className="h-4 w-4" /> Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CONTACT ───────────────────────── */

function Contact() {
  return (
    <Section id="contacto" eyebrow="Contacto">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Conversemos sobre tu <span className="text-tech-blue">proceso</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-[15px] leading-relaxed">
            Contanos qué sistemas usás, qué tareas querés reducir y cómo medís hoy el resultado.
            Te respondemos con una propuesta concreta.
          </p>

          <ul className="mt-8 space-y-4">
            <ContactItem icon={Mail} label="Email" value="nestorlemo@gmail.com" href="mailto:nestorlemo@gmail.com" />
            <ContactItem icon={Phone} label="WhatsApp" value="+598 98 809 241" href="https://wa.me/59898809241" />
            <ContactItem icon={MapPin} label="Ubicación" value="Montevideo, Uruguay" />
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="p-6 md:p-8 rounded-2xl border border-border bg-card shadow-[0_24px_60px_-30px_rgba(11,31,58,0.18)]">
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContactItem({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-4 group">
      <div className="h-11 w-11 rounded-xl bg-surface text-tech-blue flex items-center justify-center group-hover:bg-tech-blue group-hover:text-white transition">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{label}</div>
        <div className="text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
  return <li>{href ? <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a> : inner}</li>;
}

/* ───────────────────────── FOOTER ───────────────────────── */

function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80 pt-16 pb-8 px-5 sm:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="relative mx-auto max-w-7xl grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Logo variant="light" className="h-9 w-auto" />
          <p className="mt-4 text-sm text-white/65 max-w-sm">
            AI-Powered Automation. Automatización inteligente, integración de sistemas y agentes de IA
            para procesos empresariales reales.
          </p>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["#servicios", "Servicios"],
              ["#arquitectura", "Arquitectura"],
              ["#casos", "Casos"],
              ["#proceso", "Cómo trabajamos"],
              ["#equipo", "Equipo"],
              ["#contacto", "Contacto"],
            ].map(([href, label]) => (
              <li key={href}><a href={href} className="text-white/65 hover:text-cyan-bright transition">{label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm text-white/65">
            <li><a href="mailto:nestorlemo@gmail.com" className="hover:text-cyan-bright transition">nestorlemo@gmail.com</a></li>
            <li><a href="https://wa.me/59898809241" className="hover:text-cyan-bright transition">+598 98 809 241</a></li>
            <li>Montevideo, Uruguay</li>
          </ul>
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/50">© 2026 AMENSG SRL. Todos los derechos reservados.</p>
        <p className="text-xs text-white/40">AMENSG IT Automation · AI-Powered Automation</p>
      </div>
    </footer>
  );
}

/* ───────────────────────── PRIMITIVES ───────────────────────── */

function Section({
  id, eyebrow, children, tone = "default",
}: { id?: string; eyebrow?: string; children: React.ReactNode; tone?: "default" | "surface" | "navy" }) {
  const bg =
    tone === "surface" ? "bg-surface"
    : tone === "navy"  ? "bg-navy-deep text-white relative overflow-hidden"
    : "bg-background";
  return (
    <section id={id} className={`${bg} py-20 md:py-28 px-5 sm:px-8`}>
      {tone === "navy" && <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />}
      <div className="relative mx-auto max-w-7xl">
        {eyebrow && (
          <div className={`inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-semibold ${
            tone === "navy" ? "text-cyan-bright" : "text-tech-blue"
          }`}>
            <span className="h-px w-8 bg-current opacity-60" />
            {eyebrow}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function SectionHeading({ children, invert = false }: { children: React.ReactNode; invert?: boolean }) {
  return (
    <h2 className={`mt-4 text-3xl md:text-4xl lg:text-[2.6rem] font-bold leading-[1.15] max-w-3xl ${invert ? "text-white" : "text-foreground"}`}>
      {children}
    </h2>
  );
}
