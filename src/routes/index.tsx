import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  Menu, X, ArrowRight, Workflow, Bot, Network, Mail, MapPin,
  MessageCircle, CheckCircle2, AlertCircle,
} from "lucide-react";
import { DynamicMockup } from "@/components/amensg/DynamicMockup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AMENSG IT Automation — Ingeniería de automatización desde 2011" },
      { name: "description", content: "AMENSG SRL diseña, construye y mantiene sistemas empresariales, integraciones y agentes de IA. Montevideo, Uruguay. Desde 2011." },
      { property: "og:title", content: "AMENSG IT Automation — Ingeniería de automatización desde 2011" },
      { property: "og:description", content: "Sistemas empresariales, integraciones y agentes de IA para empresas en operación." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  component: LandingPage,
});

/* ───────────────────────── Logo ───────────────────────── */
function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 100 110" className="h-7 w-auto text-white">
        <path d="M 50 5 L 93 30 L 93 80 L 50 105 L 7 80 L 7 30 Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
        <line x1="27" y1="73" x2="73" y2="37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="27" cy="73" r="7" fill="currentColor" />
        <circle cx="50" cy="55" r="9" fill="#19C3FF" />
        <circle cx="73" cy="37" r="7" fill="currentColor" />
      </svg>
      <span className="text-[22px] font-extrabold tracking-tight text-white lowercase">amensg</span>
    </span>
  );
}

/* ───────────────────── Scroll reveal hook ─────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, cls: shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4" };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, cls } = useReveal();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-700 ease-out ${cls} ${className}`}>
      {children}
    </div>
  );
}

/* ──────────────────────── Header ──────────────────────── */
function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#servicios", label: "Servicios" },
    { href: "#casos", label: "Casos" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#06101F]/70 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="shrink-0"><LogoMark /></a>
        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contacto" className="hidden sm:inline-flex h-10 items-center rounded-full bg-white text-[#06101F] px-5 text-sm font-semibold hover:bg-[#19C3FF] transition-colors">
            Agendar reunión
          </a>
          <button aria-label="Menú" onClick={() => setOpen((v) => !v)} className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#06101F]/95 backdrop-blur-xl">
          <nav className="flex flex-col px-5 py-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-white/80 hover:text-white">
                {l.label}
              </a>
            ))}
            <a href="#contacto" onClick={() => setOpen(false)} className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-white text-[#06101F] text-sm font-semibold">
              Agendar reunión
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────── Hero mockup is now DynamicMockup ───────────────── */


/* ───────────────────────── Hero ───────────────────────── */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#06101F] pt-32 pb-20 md:pt-40 md:pb-28">
      {/* animated mesh gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(25,195,255,0.35), transparent 70%)", animation: "meshFloat 14s ease-in-out infinite" }} />
        <div className="absolute -bottom-40 -left-20 h-[480px] w-[480px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(11,31,58,0.9), transparent 70%)", animation: "meshFloat 18s ease-in-out infinite reverse" }} />
        <div className="absolute top-1/3 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(32,224,178,0.10), transparent 70%)", animation: "meshFloat 22s ease-in-out infinite" }} />
      </div>
      {/* dot grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-white/75">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#20E0B2] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#20E0B2]" />
              </span>
              DESDE 2011 · MONTEVIDEO, URUGUAY
            </div>
            <p className="mt-7 text-[11px] font-semibold uppercase tracking-[2.2px] text-[#19C3FF]">— AI-POWERED AUTOMATION</p>
            <h1 className="mt-3 font-extrabold text-white tracking-[-0.025em] leading-[1.02]" style={{ fontSize: "clamp(44px, 6.4vw, 80px)" }}>
              Ingeniería de automatización para empresas en operación.
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/65">
              Diseñamos, construimos y mantenemos sistemas empresariales, integraciones y agentes de inteligencia artificial. Desde 2011.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#servicios" className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(25,195,255,0.6)] transition-transform hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #1769E0 100%)" }}>
                Conocer servicios <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#casos" className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white hover:bg-white/5 transition-colors">
                Ver casos
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:pl-4">
          <DynamicMockup />
        </Reveal>
      </div>

      <style>{`
        @keyframes meshFloat {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,-20px) scale(1.08); }
        }
      `}</style>
    </section>
  );
}

/* ──────────────────────── Servicios ───────────────────── */
function Servicios() {
  const items = [
    { icon: Workflow, title: "Automatización de procesos",
      text: "Automatizamos tareas operativas e integración entre sistemas, de RPA a orquestadores con IA." },
    { icon: Bot, title: "Agentes de IA",
      text: "Asistentes conversacionales, agentes de voz y soluciones de IA generativa para procesos reales." },
    { icon: Network, title: "Integración de sistemas",
      text: "Conectamos ERPs, bases de datos, APIs y plataformas corporativas en flujos mantenibles." },
  ];
  return (
    <section id="servicios" className="bg-[#F5F7FA] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="font-extrabold tracking-[-0.025em] text-[#0B1F3A]" style={{ fontSize: "clamp(34px,4.4vw,56px)" }}>
            Lo que hacemos.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 90}>
              <div className="flex h-full flex-col rounded-2xl border border-[#0B1F3A]/10 bg-white p-8 transition-all hover:-translate-y-1 hover:border-[#19C3FF]/40 hover:shadow-[0_20px_40px_-20px_rgba(11,31,58,0.18)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#0B1F3A]/10 text-[#0B1F3A]">
                  <it.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-[#0B1F3A]">{it.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#5a6a82]">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── Casos ─────────────────────── */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/75">
      {children}
    </span>
  );
}

function Casos() {
  return (
    <section id="casos" className="relative bg-[#06101F] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-3xl font-extrabold tracking-[-0.025em] text-white" style={{ fontSize: "clamp(34px,4.4vw,56px)" }}>
            Proyectos donde la ingeniería sostuvo el negocio.
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-14">
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-12 backdrop-blur-sm transition-colors hover:border-[#19C3FF]/30">
            <span className="text-[11px] font-semibold uppercase tracking-[1.6px] text-[#19C3FF]">
              SECTOR TELECOMUNICACIONES · 13+ AÑOS EN PRODUCCIÓN
            </span>
            <h3 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-white">
              Plataforma de gestión comercial para venta de servicios de telefonía móvil.
            </h3>
            <p className="mt-5 max-w-4xl text-[15px] leading-relaxed text-white/65">
              Plataforma integral que gestiona el ciclo completo de venta de servicios de telefonía móvil por call center: captación y gestión de ventas, administración de contratos, envío de documentación y entrega de equipos a los clientes. Integra los sistemas corporativos del operador y orquesta los procesos de activación, distribución y control. En producción desde hace más de una década.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Chip>Integraciones corporativas</Chip>
              <Chip>13+ años en producción</Chip>
            </div>
          </article>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            {
              eyebrow: "SECTOR ENERGÍA",
              title: "Agente de IA para gestión de conocimiento.",
              text: "Agente inteligente con IA generativa para consulta de conocimiento interno, complementado con agentes de voz y chat para consultas de gestión y obtención de datos en tiempo real.",
              chips: ["n8n + OpenAI", "RAG", "Voz y chat", "Tiempo real"],
            },
            {
              eyebrow: "AUTOMATIZACIÓN · URUGUAY Y PARAGUAY",
              title: "Robots de automatización de procesos.",
              text: "Robots para extracción de datos, activación de servicios de telefonía móvil y análisis de riesgo crediticio en Uruguay y Paraguay, integrados a los flujos operativos del cliente.",
              chips: ["RPA multi-país", "Extracción de datos", "Procesos críticos"],
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors hover:border-[#19C3FF]/30">
                <span className="text-[11px] font-semibold uppercase tracking-[1.6px] text-[#19C3FF]">{c.eyebrow}</span>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-white">{c.title}</h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-white/65">{c.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.chips.map((ch) => <Chip key={ch}>{ch}</Chip>)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Nosotros ───────────────────── */
function Nosotros() {
  const stats = [
    { n: "2011", l: "Fundación" },
    { n: "13+", l: "Años" },
    { n: "2", l: "Países" },
    { n: "6+", l: "Sectores" },
  ];
  const partners = [
    { initials: "NL", name: "Néstor Lemo", role: "Director / Cofundador",
      bio: "Ingeniero en Informática, lidera estrategia comercial y análisis de negocio." },
    { initials: "LB", name: "Liber Batalla", role: "Ingeniero de Sistemas / Director Técnico / Cofundador",
      bio: "Arquitecto de software, lidera arquitectura de integraciones y desarrollo backend." },
  ];
  return (
    <section id="nosotros" className="bg-[#F5F7FA] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-4xl font-extrabold tracking-[-0.025em] text-[#0B1F3A]" style={{ fontSize: "clamp(34px,4.4vw,56px)" }}>
            Ingeniería al servicio del negocio, desde 2011.
          </h2>
          <p className="mt-7 max-w-3xl text-[17px] leading-relaxed text-[#5a6a82]">
            Desde 2011 diseñamos, construimos y mantenemos sistemas empresariales para empresas medianas y grandes. Empezamos automatizando procesos con RPA, evolucionamos hacia plataformas en producción de largo plazo, y hoy incorporamos inteligencia artificial como evolución natural. Ingeniería con continuidad y compromiso de largo plazo.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 grid grid-cols-2 gap-y-10 border-y border-[#0B1F3A]/10 py-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l}>
                <div className="font-extrabold tracking-[-0.03em] text-[#0B1F3A]" style={{ fontSize: "clamp(36px,4vw,56px)" }}>{s.n}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[1.4px] text-[#5a6a82]">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <div className="flex h-full gap-5 rounded-2xl border border-[#0B1F3A]/10 bg-white p-7">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white font-bold"
                  style={{ background: "linear-gradient(135deg,#0B1F3A,#1769E0)" }}>
                  {p.initials}
                </div>
                <div>
                  <div className="text-base font-bold text-[#0B1F3A]">{p.name} <span className="font-medium text-[#5a6a82]">— {p.role}</span></div>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[#5a6a82]">{p.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Contact Form (client-side) ───────── */
function ContactBlock() {
  const [f, setF] = useState({ nombre: "", empresa: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (f.nombre.trim().length < 2) e.nombre = "Ingresá tu nombre.";
    if (f.empresa.trim().length < 1) e.empresa = "Ingresá tu empresa.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Email inválido.";
    if (f.mensaje.trim().length < 10) e.mensaje = "Contanos brevemente tu caso.";
    return e;
  }
  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSent(true);
      setF({ nombre: "", empresa: "", email: "", mensaje: "" });
    }
  }

  const inp = "w-full h-11 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#19C3FF] focus:ring-2 focus:ring-[#19C3FF]/30 transition";
  const lbl = "block text-[11px] font-semibold uppercase tracking-[1.2px] text-white/60 mb-1.5";

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <form onSubmit={submit} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={lbl}>Nombre</span>
            <input className={inp} value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} placeholder="Tu nombre" />
            {errors.nombre && <span className="mt-1 block text-xs text-red-400">{errors.nombre}</span>}
          </label>
          <label className="block">
            <span className={lbl}>Empresa</span>
            <input className={inp} value={f.empresa} onChange={(e) => setF({ ...f, empresa: e.target.value })} placeholder="Tu empresa" />
            {errors.empresa && <span className="mt-1 block text-xs text-red-400">{errors.empresa}</span>}
          </label>
        </div>
        <label className="block">
          <span className={lbl}>Email</span>
          <input type="email" className={inp} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="nombre@empresa.com" />
          {errors.email && <span className="mt-1 block text-xs text-red-400">{errors.email}</span>}
        </label>
        <label className="block">
          <span className={lbl}>Mensaje</span>
          <textarea rows={5} className={`${inp} h-auto py-3 resize-y`} value={f.mensaje} onChange={(e) => setF({ ...f, mensaje: e.target.value })}
            placeholder="Contanos brevemente tu caso." />
          {errors.mensaje && <span className="mt-1 block text-xs text-red-400">{errors.mensaje}</span>}
        </label>
        <button type="submit"
          className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(25,195,255,0.6)] hover:-translate-y-0.5 transition-transform"
          style={{ background: "linear-gradient(135deg,#0B1F3A 0%, #1769E0 100%)" }}>
          Enviar consulta
        </button>
        {sent && (
          <div className="flex items-start gap-2 rounded-lg border border-[#20E0B2]/40 bg-[#20E0B2]/10 px-4 py-3 text-sm text-white">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#20E0B2]" />
            Gracias. Recibimos tu mensaje y te respondemos a la brevedad.
          </div>
        )}
        {!sent && Object.keys(errors).length > 0 && (
          <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-xs text-white/70">
            <AlertCircle className="mt-0.5 h-4 w-4 text-red-400" />
            Revisá los campos marcados.
          </div>
        )}
      </form>

      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white">Hablemos.</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-white/65">
            Contanos qué proceso querés mejorar. Te respondemos en menos de 24 horas hábiles.
          </p>
        </div>
        <div className="space-y-3">
          <a href="mailto:contacto@amensg.com" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:border-[#19C3FF]/40 transition-colors">
            <Mail className="h-5 w-5 text-[#19C3FF]" />
            <span className="text-sm text-white">contacto@amensg.com</span>
          </a>
          <a href="https://wa.me/59898809241" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:border-[#19C3FF]/40 transition-colors">
            <MessageCircle className="h-5 w-5 text-[#20E0B2]" />
            <span className="text-sm text-white">WhatsApp +598 98 809 241</span>
          </a>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
            <MapPin className="h-5 w-5 text-white/60" />
            <span className="text-sm text-white/80">Montevideo, Uruguay</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Tecnologías + Contacto + Footer ──────── */
function TechContactFooter() {
  const techs = ["Java", "PostgreSQL", "n8n", "OpenAI", "Claude", "AWS", "GitHub", "APIs REST", "SQL/NoSQL"];
  return (
    <section id="contacto" className="bg-[#06101F] pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#19C3FF]">— TECNOLOGÍAS</p>
          <h2 className="mt-3 font-extrabold tracking-[-0.025em] text-white" style={{ fontSize: "clamp(28px,3.4vw,44px)" }}>
            El stack con el que construimos.
          </h2>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {techs.map((t) => (
              <span key={t} className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80">
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-20 md:mt-28">
          <Reveal>
            <ContactBlock />
          </Reveal>
        </div>
      </div>

      <footer className="mt-24 border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 md:flex-row md:items-center md:px-8">
          <LogoMark />
          <p className="text-xs text-white/50">© 2026 AMENSG SRL — Montevideo, Uruguay. Desde 2011.</p>
        </div>
      </footer>
    </section>
  );
}

/* ──────────────────────── Landing ─────────────────────── */
function LandingPage() {
  return (
    <div className="min-h-screen bg-[#06101F]" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <SiteHeader />
      <main>
        <Hero />
        <Servicios />
        <Casos />
        <Nosotros />
        <TechContactFooter />
      </main>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/59898809241"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.7)] hover:scale-105 transition-transform"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
