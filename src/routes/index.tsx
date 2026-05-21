import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  Menu, X, ArrowRight, Workflow, Bot, Network, Layers, Mail, MapPin,
  CheckCircle2, AlertCircle, Search, PenTool, Cog, Sparkles, Rocket, TrendingUp,
  Repeat, GitMerge, FileSpreadsheet, Database, Clock, AlertTriangle, ShieldAlert, Brain,
  Users, Building2, Headphones, Truck, MapPinned, ShoppingCart,
} from "lucide-react";
import { DynamicMockup } from "@/components/amensg/DynamicMockup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AMENSG — Socios en Automatización Inteligente" },
      { name: "description", content: "Automatización, integración de sistemas e IA aplicada a procesos reales de negocio. Desde 2011, en Montevideo, Uruguay." },
      { property: "og:title", content: "AMENSG — Socios en Automatización Inteligente" },
      { property: "og:description", content: "Automatización inteligente para alcanzar objetivos juntos." },
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
    { href: "#propuesta", label: "Propuesta" },
    { href: "#servicios", label: "Servicios" },
    { href: "#caso", label: "Caso" },
    { href: "#proceso", label: "Cómo trabajamos" },
    { href: "#equipo", label: "Equipo" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#06101F]/75 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="shrink-0"><LogoMark /></a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contacto" className="hidden sm:inline-flex h-10 items-center rounded-full bg-white text-[#06101F] px-5 text-sm font-semibold hover:bg-[#19C3FF] transition-colors">
            Agendar diagnóstico
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
              Agendar diagnóstico
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#06101F] pt-32 pb-20 md:pt-40 md:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(25,195,255,0.35), transparent 70%)", animation: "meshFloat 14s ease-in-out infinite" }} />
        <div className="absolute -bottom-40 -left-20 h-[480px] w-[480px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(11,31,58,0.9), transparent 70%)", animation: "meshFloat 18s ease-in-out infinite reverse" }} />
        <div className="absolute top-1/3 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(32,224,178,0.10), transparent 70%)", animation: "meshFloat 22s ease-in-out infinite" }} />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-white/75">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#20E0B2] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#20E0B2]" />
              </span>
              IA APLICADA A PROCESOS REALES
            </div>
            <h1 className="mt-8 font-extrabold text-white tracking-[-0.025em] leading-[1.06]" style={{ fontSize: "clamp(32px, 4.8vw, 56px)" }}>
              Automatización, integración e IA para operaciones reales
            </h1>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/65">
              Nos integramos a tu equipo para automatizar procesos, conectar sistemas e incorporar IA donde genera impacto real.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-medium text-white/55">
              <span>200–300 usuarios</span>
              <span className="text-white/25">·</span>
              <span>4 empresas</span>
              <span className="text-white/25">·</span>
              <span>4 call centers</span>
              <span className="text-white/25">·</span>
              <span>13+ años</span>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#contacto" className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(25,195,255,0.6)] transition-transform hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #1769E0 100%)" }}>
                Agendar diagnóstico <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#caso" className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white hover:bg-white/5 transition-colors">
                Ver caso destacado
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:pl-4">
          <div>
            <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[2px] text-white/40">
              Capacidades AMENSG en acción
            </p>
            <DynamicMockup />
          </div>
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

/* ───────────── Section header helpers ───────────── */
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[2.2px] ${light ? "text-[#1769E0]" : "text-[#19C3FF]"}`}>
      — {children}
    </p>
  );
}

/* ─────────────── 2. PROPUESTA DE VALOR ─────────────── */
function Propuesta() {
  const steps = [
    { icon: Search, label: "Diagnóstico\ndel proceso" },
    { icon: PenTool, label: "Diseño\nde solución" },
    { icon: Cog, label: "Automatización\ne integración" },
    { icon: Sparkles, label: "IA\naplicada" },
    { icon: Rocket, label: "Puesta\nen producción" },
    { icon: TrendingUp, label: "Evolución\ncontinua" },
  ];
  return (
    <section id="propuesta" className="bg-[#F5F7FA] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Eyebrow light>Propuesta de valor</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-extrabold tracking-[-0.025em] text-[#0B1F3A]" style={{ fontSize: "clamp(32px,4.2vw,52px)" }}>
            Tecnología aplicada a objetivos reales de negocio.
          </h2>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#5a6a82]">
            Trabajamos junto a nuestros clientes para identificar oportunidades, automatizar procesos, integrar sistemas e incorporar inteligencia artificial donde realmente genera impacto operativo.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 grid grid-cols-2 gap-y-10 gap-x-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-2">
            {steps.map((s, i) => (
              <div key={s.label} className="relative flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0B1F3A]/10 bg-white text-[#1769E0] shadow-[0_8px_20px_-12px_rgba(11,31,58,0.25)]">
                  <s.icon className="h-6 w-6" strokeWidth={1.6} />
                </div>
                <span className="mt-3 whitespace-pre-line text-[12.5px] font-semibold leading-tight text-[#0B1F3A]">
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div aria-hidden className="absolute right-[-8px] top-7 hidden h-px w-4 bg-gradient-to-r from-[#1769E0]/40 to-[#1769E0]/0 lg:block" />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── 3. PROBLEMAS ─────────────── */
function Problemas() {
  const items = [
    { icon: Repeat, t: "Procesos manuales repetitivos", d: "Automatizamos tareas operativas con reglas claras y trazabilidad." },
    { icon: GitMerge, t: "Sistemas que no se comunican", d: "Conectamos plataformas, bases de datos y APIs para eliminar retrabajo." },
    { icon: FileSpreadsheet, t: "Uso excesivo de planillas", d: "Reemplazamos planillas por flujos operativos sostenibles." },
    { icon: Database, t: "Datos dispersos entre áreas", d: "Centralizamos información para decisiones más rápidas." },
    { icon: Clock, t: "Tiempos operativos altos", d: "Reducimos cuellos de botella y aceleramos el ciclo de trabajo." },
    { icon: AlertTriangle, t: "Errores por carga manual", d: "Validaciones automáticas que mejoran la calidad del dato." },
    { icon: ShieldAlert, t: "Automatizaciones frágiles", d: "Construimos soluciones mantenibles, monitoreadas y en producción real." },
    { icon: Brain, t: "IA difícil de aplicar al negocio", d: "Llevamos la IA al proceso real, no como capa aislada." },
  ];
  return (
    <section className="bg-[#06101F] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Eyebrow>Problemas que resolvemos</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-extrabold tracking-[-0.025em] text-white" style={{ fontSize: "clamp(32px,4.2vw,52px)" }}>
            Convertimos procesos en ventajas reales.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 60}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-[#19C3FF]/30 hover:bg-white/[0.05]">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#19C3FF]">
                  <it.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 text-[15.5px] font-bold leading-snug text-white">{it.t}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 4. SERVICIOS ─────────────── */
function Servicios() {
  const items = [
    { icon: Workflow, t: "Automatización de procesos",
      d: "Diseñamos automatizaciones que reducen tareas manuales, aceleran procesos y mejoran la trazabilidad operativa." },
    { icon: Network, t: "Integración de sistemas",
      d: "Conectamos sistemas empresariales, APIs, bases de datos y plataformas existentes para eliminar silos de información." },
    { icon: Bot, t: "Agentes de IA aplicados",
      d: "Creamos agentes conectados al conocimiento, los datos y los procesos de la empresa para asistir, responder y ejecutar tareas con contexto." },
    { icon: Layers, t: "Plataformas empresariales",
      d: "Desarrollamos aplicaciones web y sistemas de gestión sostenibles, pensados para operación diaria y evolución continua." },
  ];
  return (
    <section id="servicios" className="bg-[#F5F7FA] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Eyebrow light>Lo que hacemos</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-extrabold tracking-[-0.025em] text-[#0B1F3A]" style={{ fontSize: "clamp(32px,4.2vw,52px)" }}>
            Automatización, integración e IA para operaciones reales.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-[#0B1F3A]/10 bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#19C3FF]/40 hover:shadow-[0_20px_40px_-20px_rgba(11,31,58,0.18)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#0B1F3A]/10 text-[#1769E0]">
                  <it.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-[18px] font-bold tracking-tight text-[#0B1F3A]">{it.t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#5a6a82]">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 5. CASO DESTACADO ─────────────── */
function CasoDestacado() {
  const metrics = [
    { n: "200–300", l: "usuarios" },
    { n: "4", l: "empresas" },
    { n: "4", l: "call centers" },
    { n: "13+", l: "años en producción" },
  ];
  const flow = [
    { icon: Headphones, label: "Call Center" },
    { icon: ShoppingCart, label: "Venta" },
    { icon: Building2, label: "Backoffice" },
    { icon: Truck, label: "Distribución" },
    { icon: MapPinned, label: "Cadete" },
    { icon: Users, label: "Cliente" },
  ];

  const [lit, setLit] = useState(-1);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let i = 0;
        const id = setInterval(() => {
          setLit(i);
          i++;
          if (i > flow.length + 2) i = 0;
        }, 700);
        io.disconnect();
        return () => clearInterval(id);
      }
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="caso" className="bg-[#06101F] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Eyebrow>Caso destacado</Eyebrow>
          <h2 className="mt-3 max-w-4xl font-extrabold tracking-[-0.025em] text-white" style={{ fontSize: "clamp(30px,4vw,48px)" }}>
            Plataforma central de gestión comercial y operativa.
          </h2>
          <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-white/65">
            Una solución empresarial en producción real, utilizada por cientos de usuarios y conectada con procesos críticos del negocio.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-12 backdrop-blur-sm">
            <p className="max-w-4xl text-[15.5px] leading-relaxed text-white/70">
              AMENSG desarrolló y mantiene una aplicación central de gestión utilizada por entre <strong className="text-white">200 y 300 usuarios</strong>, distribuidos en <strong className="text-white">4 empresas</strong>, cada una con su propio call center. La plataforma soporta procesos críticos de ventas, backoffice, distribución, gestión de puntos de venta y entregas en campo mediante una web móvil utilizada por cadetes.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-y-8 border-y border-white/10 py-8 md:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.l}>
                  <div className="font-extrabold tracking-[-0.03em] text-white" style={{ fontSize: "clamp(30px,3.4vw,46px)" }}>{m.n}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[1.4px] text-[#7088a8]">{m.l}</div>
                </div>
              ))}
            </div>

            {/* Flujo operativo animado */}
            <div ref={ref} className="mt-12">
              <div className="text-[11px] font-semibold uppercase tracking-[1.6px] text-[#19C3FF]">Flujo operativo</div>
              <div className="mt-5 grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-2">
                {flow.map((f, i) => {
                  const active = lit === i;
                  const done = lit > i && lit <= flow.length;
                  return (
                    <div key={f.label} className="relative flex flex-col items-center text-center">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500 ${
                        active
                          ? "border-[#19C3FF] bg-[#19C3FF]/12 text-[#19C3FF] shadow-[0_0_28px_-4px_rgba(25,195,255,0.6)] scale-105"
                          : done
                          ? "border-[#20E0B2]/40 bg-white/5 text-[#20E0B2]"
                          : "border-white/12 bg-white/5 text-white/55"
                      }`}>
                        <f.icon className="h-6 w-6" strokeWidth={1.6} />
                      </div>
                      <span className="mt-3 text-[12px] font-semibold text-white/80">{f.label}</span>
                      {i < flow.length - 1 && (
                        <div aria-hidden className="absolute right-[-8px] top-7 hidden h-px w-4 bg-gradient-to-r from-[#19C3FF]/40 to-[#19C3FF]/0 lg:block" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="mt-12 max-w-3xl text-[15px] italic leading-relaxed text-white/55">
              Este caso refleja nuestra capacidad de construir, mantener y evolucionar soluciones críticas que conectan personas, procesos y sistemas en la operación diaria.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── 6. IA APLICADA ─────────────── */
function IAAplicada() {
  const bullets = [
    "Agentes conectados al conocimiento de la empresa",
    "Automatizaciones integradas con APIs y sistemas internos",
    "RAG sobre documentación y datos corporativos",
    "Asistentes conversacionales internos o para clientes",
    "Flujos con n8n, OpenAI, Claude y otras tecnologías",
    "Integración con web, email, WhatsApp o sistemas internos",
  ];
  const layers = [
    { t: "Datos · Documentos · Sistemas", c: "from-[#1769E0]/30 to-[#1769E0]/5" },
    { t: "Capa de integración", c: "from-[#19C3FF]/30 to-[#19C3FF]/5" },
    { t: "Agente IA", c: "from-[#a78bfa]/30 to-[#a78bfa]/5" },
    { t: "Usuarios · Procesos · Canales", c: "from-[#20E0B2]/30 to-[#20E0B2]/5" },
  ];
  return (
    <section className="bg-[#F5F7FA] py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div>
            <Eyebrow light>IA aplicada, no IA aislada</Eyebrow>
            <h2 className="mt-3 font-extrabold tracking-[-0.025em] text-[#0B1F3A]" style={{ fontSize: "clamp(30px,3.8vw,48px)" }}>
              IA aplicada sobre procesos reales.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-[#5a6a82]">
              No incorporamos inteligencia artificial como una capa aislada. La integramos con sistemas, datos, reglas de negocio y procesos existentes para que genere valor operativo concreto.
            </p>
            <ul className="mt-8 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px] text-[#0B1F3A]/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1769E0]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative space-y-3 rounded-2xl border border-[#0B1F3A]/10 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(11,31,58,0.25)]">
            <div className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[#5a6a82]">Arquitectura simplificada</div>
            {layers.map((l, i) => (
              <div key={l.t} className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: `${i * 120}ms` }}>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B1F3A] text-[11px] font-bold text-white">{i + 1}</div>
                <div className={`flex-1 rounded-xl border border-[#0B1F3A]/10 bg-gradient-to-r ${l.c} px-5 py-4 text-[14px] font-semibold text-[#0B1F3A]`}>
                  {l.t}
                </div>
              </div>
            ))}
            <div className="mt-4 text-center text-[11px] text-[#5a6a82]/70">
              Cada capa se construye con tecnología existente del cliente.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── 7. TECNOLOGÍAS ─────────────── */
function Tecnologias() {
  const groups = [
    { t: "Core empresarial", items: ["Java", "PostgreSQL", "APIs REST", "SQL / NoSQL"] },
    { t: "Automatización e integración", items: ["n8n", "RPA", "Webhooks", "Integraciones corporativas"] },
    { t: "IA aplicada", items: ["OpenAI", "Claude", "RAG", "Agentes conversacionales", "Voz y chat"] },
    { t: "Operación y evolución", items: ["AWS", "GitHub", "Monitoreo", "Mantenimiento evolutivo"] },
  ];
  return (
    <section className="bg-[#06101F] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Eyebrow>Tecnologías</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-extrabold tracking-[-0.025em] text-white" style={{ fontSize: "clamp(30px,3.8vw,48px)" }}>
            Tecnologías que conectan estrategia, operación e inteligencia.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <Reveal key={g.t} delay={i * 100}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[1.6px] text-[#19C3FF]">Capa {i + 1}</div>
                <h3 className="mt-2 text-[16px] font-bold text-white">{g.t}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span key={it} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[12.5px] font-medium text-white/80">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 8. CÓMO TRABAJAMOS ─────────────── */
function Proceso() {
  const steps = [
    "Entendemos el objetivo",
    "Relevamos el proceso real",
    "Diseñamos una solución viable",
    "Construimos e integramos",
    "Acompañamos la puesta en producción",
    "Evolucionamos junto al negocio",
  ];
  return (
    <section id="proceso" className="bg-[#F5F7FA] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Eyebrow light>Cómo trabajamos</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-extrabold tracking-[-0.025em] text-[#0B1F3A]" style={{ fontSize: "clamp(30px,3.8vw,48px)" }}>
            Trabajamos junto a tu empresa.
          </h2>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#5a6a82]">
            Nos involucramos en el proceso, entendemos la operación y construimos soluciones sostenibles junto a los equipos del cliente. Nuestro objetivo no es solo entregar software, sino ayudar a alcanzar resultados concretos.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s} delay={i * 70}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-[#0B1F3A]/10 bg-white p-6 transition-all hover:border-[#19C3FF]/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1F3A] text-[14px] font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="mt-1.5 text-[15px] font-semibold leading-snug text-[#0B1F3A]">{s}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-14 max-w-3xl text-[18px] font-medium italic leading-relaxed text-[#0B1F3A]">
            “Más que entregar tecnología, acompañamos la evolución operativa de nuestros clientes.”
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── 9. POR QUÉ AMENSG ─────────────── */
function PorQue() {
  const reasons = [
    "Experiencia desde 2011",
    "Soluciones reales en producción",
    "Conocimiento de procesos empresariales",
    "Capacidad de integrar sistemas existentes",
    "Automatización con visión de negocio",
    "IA aplicada con criterio operativo",
    "Relación cercana y de largo plazo",
  ];
  return (
    <section className="bg-[#06101F] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Eyebrow>Por qué elegir AMENSG</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-extrabold tracking-[-0.025em] text-white" style={{ fontSize: "clamp(30px,3.8vw,48px)" }}>
            Socios tecnológicos.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r} delay={i * 60}>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#19C3FF]" />
                <span className="text-[14.5px] font-medium text-white/85">{r}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 9.5 EQUIPO ─────────────── */
function Equipo() {
  const team = [
    {
      initials: "NL",
      name: "Néstor Lemo",
      role: "Director Comercial · Cofundador",
      area: "Procesos, negocio y relación con clientes.",
      bio: "Ingeniero de Sistemas. Lidera la relación comercial y la definición de soluciones junto al negocio.",
    },
    {
      initials: "LB",
      name: "Liber Batalla",
      role: "Director Técnico · Cofundador",
      area: "Arquitectura, integración y plataformas en producción.",
      bio: "Ingeniero de Sistemas. Lidera la arquitectura de integración, el backend y la evolución de plataformas empresariales.",
    },
  ];
  return (
    <section id="equipo" className="bg-[#F5F7FA] py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <Eyebrow light>Equipo</Eyebrow>
          <h2 className="mt-2 font-extrabold tracking-[-0.025em] text-[#0B1F3A]" style={{ fontSize: "clamp(26px,3.2vw,40px)" }}>
            Equipo fundador
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#5a6a82]">
            Perfiles complementarios en negocio, procesos, arquitectura e integración de sistemas empresariales.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {team.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-[#0B1F3A]/10 bg-white p-6 transition-all hover:border-[#19C3FF]/40">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg,#0B1F3A 0%, #1769E0 100%)" }}
                  >
                    {p.initials}
                  </div>
                  <div className="min-w-1 flex-1">
                    <h3 className="text-[15px] font-medium tracking-tight text-[#0B1F3A]">{p.name}</h3>
                    <p className="text-[12px] font-medium text-[#1769E0]">{p.role}</p>
                  </div>
                </<div>

/* ─────────────── 10. CONTACTO ─────────────── */
function ContactBlock() {
  const [f, setF] = useState({ nombre: "", empresa: "", email: "", telefono: "", proceso: "", mensaje: "" });
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
      setF({ nombre: "", empresa: "", email: "", telefono: "", proceso: "", mensaje: "" });
    }
  }

  const inp = "w-full h-11 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#19C3FF] focus:ring-2 focus:ring-[#19C3FF]/30 transition";
  const lbl = "block text-[11px] font-semibold uppercase tracking-[1.2px] text-white/60 mb-1.5";

  return (
    <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
      <form onSubmit={submit} className="space-y-4 lg:col-span-3" noValidate>
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
          <label className="block">
            <span className={lbl}>Email</span>
            <input type="email" className={inp} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="nombre@empresa.com" />
            {errors.email && <span className="mt-1 block text-xs text-red-400">{errors.email}</span>}
          </label>
          <label className="block">
            <span className={lbl}>Teléfono</span>
            <input className={inp} value={f.telefono} onChange={(e) => setF({ ...f, telefono: e.target.value })} placeholder="Opcional" />
          </label>
        </div>
        <label className="block">
          <span className={lbl}>¿Qué proceso te gustaría mejorar?</span>
          <input className={inp} value={f.proceso} onChange={(e) => setF({ ...f, proceso: e.target.value })} placeholder="Ej: gestión de ventas, integración entre sistemas, agente de soporte…" />
        </label>
        <label className="block">
          <span className={lbl}>Mensaje</span>
          <textarea rows={5} className={`${inp} h-auto py-3 resize-y`} value={f.mensaje} onChange={(e) => setF({ ...f, mensaje: e.target.value })}
            placeholder="Contanos el proceso, sistemas involucrados y qué te gustaría mejorar." />
          {errors.mensaje && <span className="mt-1 block text-xs text-red-400">{errors.mensaje}</span>}
        </label>
        <button type="submit"
          className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(25,195,255,0.6)] hover:-translate-y-0.5 transition-transform"
          style={{ background: "linear-gradient(135deg,#0B1F3A 0%, #1769E0 100%)" }}>
          Agendar diagnóstico de automatización
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

      <div className="space-y-6 lg:col-span-2">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white">Hablemos.</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-white/65">
            Coordinemos una primera conversación para analizar procesos, sistemas involucrados y oportunidades concretas de automatización e IA.
          </p>
        </div>
        <div className="space-y-3">
          <a href="mailto:contacto@amensg.com" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:border-[#19C3FF]/40 transition-colors">
            <Mail className="h-5 w-5 text-[#19C3FF]" />
            <span className="text-sm text-white">contacto@amensg.com</span>
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

function Contacto() {
  return (
    <section id="contacto" className="bg-[#06101F] pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Eyebrow>Contacto</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-extrabold tracking-[-0.025em] text-white" style={{ fontSize: "clamp(30px,3.8vw,48px)" }}>
            Identifiquemos juntos oportunidades de automatización.
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/65">
            Te respondemos en menos de 24 horas hábiles.
          </p>
        </Reveal>

        <div className="mt-16">
          <Reveal><ContactBlock /></Reveal>
        </div>
      </div>

      <footer className="mt-24 border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 md:flex-row md:items-center md:px-8">
          <LogoMark />
          <p className="text-xs text-white/50">© 2026 AMENSG SRL — Socios en Automatización Inteligente · Montevideo, Uruguay · Desde 2011.</p>
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
        <Propuesta />
        <Problemas />
        <Servicios />
        <CasoDestacado />
        <IAAplicada />
        <Tecnologias />
        <Proceso />
        <PorQue />
        <Equipo />
        <Contacto />
      </main>
    </div>
  );
}
