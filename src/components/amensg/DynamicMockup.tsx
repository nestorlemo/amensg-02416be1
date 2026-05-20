import { useEffect, useRef, useState } from "react";

const TABS = [
  "amensg / workflow.n8n",
  "amensg / agente-ia",
  "amensg / gestión comercial",
  "amensg / integraciones",
];
const BADGES: Array<[string, string]> = [
  ["cy", "RUNNING"],
  ["cy", "ONLINE"],
  ["te", "EN PRODUCCIÓN"],
  ["te", "SINCRONIZANDO"],
];
const LABELS = ["Automatización", "Agentes de IA", "Gestión", "Integración"];

const CONVO: Array<["ai" | "u", string]> = [
  ["ai", "Hola, soy el asistente de operaciones. ¿En qué te ayudo?"],
  ["u", "¿Cuántas activaciones quedaron pendientes hoy?"],
  ["ai", "Hay 312 en curso: 287 dentro del SLA y 25 requieren seguimiento."],
  ["u", "¿Qué tienen las 25?"],
  ["ai", "Documentación incompleta en contratos de Fibra Premium. ¿Genero la lista y aviso a backoffice?"],
  ["u", "Sí, dale."],
  ["ai", "Listo. Reporte generado y 4 operadores notificados."],
];

const SV = ["Fibra Premium", "Plan Móvil", "Fibra Básico", "Plan Familia", "Fibra Total"];
const EN = ["Documentación", "Equipo enviado", "En reparto", "Pendiente", "Entregado"];
const ST: Array<[string, string]> = [["ok", "Activo"], ["pr", "Proceso"], ["wt", "En cola"]];
const R = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];

export function DynamicMockup() {
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(true);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAuto = () => {
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; }
  };
  const startAuto = () => {
    stopAuto();
    autoRef.current = setInterval(() => setCur((c) => (c + 1) % 4), 6500);
  };

  useEffect(() => {
    if (playing) startAuto(); else stopAuto();
    return stopAuto;
  }, [playing]);

  const goTo = (i: number) => { setCur(((i % 4) + 4) % 4); if (playing) startAuto(); };
  const prev = () => goTo(cur - 1);
  const next = () => goTo(cur + 1);

  const [badgeCls, badgeTxt] = BADGES[cur];

  return (
    <div className="w-full max-w-[720px] mx-auto">
      <div
        className="relative h-[430px] rounded-2xl overflow-hidden border border-white/10 bg-[#0B1F3A]/55 backdrop-blur-xl"
        style={{
          boxShadow: "0 30px 70px -15px rgba(25,195,255,0.22)",
          transform: "perspective(1500px) rotateY(-5deg) rotateX(2deg)",
        }}
      >
        {/* Title bar */}
        <div className="flex h-[38px] items-center gap-1.5 border-b border-white/5 bg-[#0a1626] px-3.5">
          <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11.5px] text-[#8ba3c7] truncate">{TABS[cur]}</span>
          <span
            className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9.5px] font-semibold tracking-[1px] ${
              badgeCls === "cy" ? "bg-[#19C3FF]/10 text-[#19C3FF]" : "bg-[#20E0B2]/10 text-[#20E0B2]"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                badgeCls === "cy" ? "bg-[#19C3FF]" : "bg-[#20E0B2]"
              }`}
            />
            {badgeTxt}
          </span>
        </div>

        <div className="relative h-[calc(100%-38px)]">
          {cur === 0 && <WorkflowScene />}
          {cur === 1 && <ChatScene />}
          {cur === 2 && <AppScene />}
          {cur === 3 && <IntegrationScene />}
        </div>
      </div>

      {/* Transport controls */}
      <div className="mt-5 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={prev}
          aria-label="Escena anterior"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#aebfd6] hover:text-white hover:border-white/20 transition-all"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pausar" : "Reproducir"}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#19C3FF]/30 bg-[#19C3FF]/10 text-[#19C3FF] hover:bg-[#19C3FF]/15 transition-all"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><polygon points="7,5 19,12 7,19" /></svg>
          )}
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Escena siguiente"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#aebfd6] hover:text-white hover:border-white/20 transition-all"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {LABELS.map((l, i) => (
          <button
            key={l}
            type="button"
            onClick={() => goTo(i)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-all ${
              cur === i
                ? "bg-[#19C3FF]/10 border-[#19C3FF]/40 text-white"
                : "bg-white/[0.03] border-white/[0.07] text-[#8ba3c7] hover:text-white"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${cur === i ? "bg-[#19C3FF]" : "bg-[#5a7090]"}`} />
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────── Workflow scene (horizontal n8n) ─────────── */
function WorkflowScene() {
  const [step, setStep] = useState(0);
  const order = ["w0", "w1", "w2", "w3", "w5"];

  useEffect(() => {
    let s = 0;
    const tick = () => {
      s = (s + 1) % (order.length + 2); // pause at the end
      setStep(s);
    };
    setStep(0);
    const id = setInterval(tick, 850);
    return () => clearInterval(id);
  }, []);

  const nodeState = (i: number): "" | "active" | "done" => {
    if (step > order.length) return i < order.length ? "done" : "";
    if (i < step) return "done";
    if (i === step) return "active";
    return "";
  };

  const nodes = [
    { id: "w0", x: 30, y: 96, icon: "⚡", label: "Webhook\nentrada" },
    { id: "w1", x: 135, y: 96, icon: "⚙", label: "Validar\ndatos" },
    { id: "w2", x: 240, y: 96, icon: "◇", label: "Agente\nIA" },
    { id: "w3", x: 345, y: 41, icon: "{ }", label: "Procesar\nrespuesta" },
    { id: "w4", x: 345, y: 161, icon: "↻", label: "Reintentar" },
    { id: "w5", x: 520, y: 96, icon: "↗", label: "Integrar\nsistema" },
  ];

  // map node index in `order` to which edge lights up after entering it
  const litEdges = step; // number of lit edges so far (0..4)

  return (
    <div className="relative h-full p-5">
      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 620 372" preserveAspectRatio="none">
        {[
          "M 70 150 L 175 150",
          "M 175 150 L 280 150",
          "M 280 150 L 385 95",
          "M 280 150 L 385 215",
          "M 470 95 L 560 150",
          "M 470 215 L 560 150",
        ].map((d, i) => (
          <path key={i} d={d} stroke="rgba(255,255,255,0.13)" strokeWidth="1.8" fill="none" />
        ))}
        {["M 70 150 L 175 150", "M 175 150 L 280 150", "M 280 150 L 385 95", "M 470 95 L 560 150"].map((d, i) => (
          <path
            key={`l${i}`}
            d={d}
            stroke="#19C3FF"
            strokeWidth="1.8"
            fill="none"
            style={{
              opacity: i < litEdges ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          />
        ))}
      </svg>

      {nodes.map((n) => {
        const idx = order.indexOf(n.id);
        const state = idx >= 0 ? nodeState(idx) : step >= 4 ? "active" : "";
        const visible = idx >= 0 ? step >= idx : step >= 4; // w4 (branch false) appears with step 3
        const isActive = state === "active";
        const isDone = state === "done";
        return (
          <div
            key={n.id}
            className="absolute w-[78px] transition-all duration-300"
            style={{
              left: n.x,
              top: n.y,
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.8)",
            }}
          >
            <div
              className={`mx-auto flex h-[54px] w-[54px] items-center justify-center rounded-[13px] border text-[21px] transition-all ${
                isActive
                  ? "border-[#19C3FF] bg-[#19C3FF]/12 text-[#19C3FF] shadow-[0_0_22px_-4px_rgba(25,195,255,0.5)]"
                  : isDone
                    ? "border-[#20E0B2]/45 bg-white/5 text-[#20E0B2]"
                    : "border-white/12 bg-white/5 text-[#cfe4f7]"
              }`}
            >
              {n.icon}
            </div>
            <div className="mt-1.5 text-center text-[9.5px] font-medium leading-tight text-[#aebfd6] whitespace-pre-line">
              {n.label}
            </div>
          </div>
        );
      })}

      {/* branch labels */}
      <div
        className="absolute text-[8px] font-semibold px-1.5 py-0.5 rounded text-[#20E0B2] bg-[#20E0B2]/15 transition-opacity"
        style={{ left: 340, top: 74, opacity: step >= 3 ? 1 : 0 }}
      >
        true
      </div>
      <div
        className="absolute text-[8px] font-semibold px-1.5 py-0.5 rounded text-[#7088a8] bg-white/[0.06] transition-opacity"
        style={{ left: 340, top: 200, opacity: step >= 3 ? 1 : 0 }}
      >
        false
      </div>

      {/* sub: OpenAI under w2 */}
      <div
        className="absolute w-12 transition-opacity duration-300"
        style={{ left: 253, top: 215, opacity: step >= 2 ? 1 : 0 }}
      >
        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04] text-sm text-[#7e9fc4]">◎</div>
        <div className="mt-0.5 text-center text-[8px] text-[#7088a8]">OpenAI</div>
      </div>
    </div>
  );
}

/* ─────────── Chat scene ─────────── */
function ChatScene() {
  const [msgs, setMsgs] = useState<Array<{ w: "ai" | "u"; t: string; typing?: boolean }>>([]);
  const iRef = useRef(0);

  useEffect(() => {
    iRef.current = 0;
    setMsgs([]);
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const next = () => {
      if (cancelled) return;
      if (iRef.current >= CONVO.length) {
        timeouts.push(setTimeout(() => { iRef.current = 0; setMsgs([]); next(); }, 2600));
        return;
      }
      const [w, t] = CONVO[iRef.current];
      if (w === "ai") {
        setMsgs((m) => [...m, { w, t: "", typing: true }].slice(-4));
        timeouts.push(setTimeout(() => {
          setMsgs((m) => {
            const c = [...m];
            const last = c[c.length - 1];
            if (last && last.typing) c[c.length - 1] = { w, t };
            return c;
          });
          iRef.current++;
          timeouts.push(setTimeout(next, 1000));
        }, 800));
      } else {
        setMsgs((m) => [...m, { w, t }].slice(-4));
        iRef.current++;
        timeouts.push(setTimeout(next, 850));
      }
    };
    next();
    return () => { cancelled = true; timeouts.forEach(clearTimeout); };
  }, []);

  return (
    <div className="flex h-full flex-col gap-2.5 p-5">
      {msgs.map((m, i) => (
        <div
          key={i}
          className={`flex gap-2.5 items-start animate-[fadeUp_0.4s_ease_both] ${m.w === "u" ? "flex-row-reverse" : ""}`}
        >
          <div
            className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] text-sm ${
              m.w === "ai"
                ? "bg-[#19C3FF]/12 border border-[#19C3FF]/25 text-[#19C3FF]"
                : "bg-white/[0.06] border border-white/12 text-[#aebfd6]"
            }`}
          >
            {m.w === "ai" ? "◇" : "◍"}
          </div>
          <div
            className={`max-w-[78%] rounded-[11px] px-3 py-2 text-[12px] leading-snug ${
              m.w === "ai"
                ? "bg-[#19C3FF]/10 border border-[#19C3FF]/16 text-[#cfeeff]"
                : "bg-white/[0.05] border border-white/10 text-[#e6eefc]"
            }`}
          >
            {m.typing ? (
              <span className="inline-flex gap-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#19C3FF] animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#19C3FF] animate-pulse" style={{ animationDelay: "0.2s" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-[#19C3FF] animate-pulse" style={{ animationDelay: "0.4s" }} />
              </span>
            ) : m.t}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────── App scene ─────────── */
type Row = { s: string; a: string; e: string; st: [string, string] };
const mkRow = (): Row => ({
  s: R(SV),
  a: `${10 + Math.floor(Math.random() * 18)}/03`,
  e: R(EN),
  st: R(ST),
});

function AppScene() {
  const [act, setAct] = useState(1247);
  const [exito, setExito] = useState("98,4%");
  const [entregas, setEntregas] = useState(312);
  const [rows, setRows] = useState<Row[]>([mkRow(), mkRow(), mkRow()]);

  useEffect(() => {
    const id = setInterval(() => {
      setAct((a) => a + Math.floor(Math.random() * 5) + 1);
      setEntregas(300 + Math.floor(Math.random() * 25));
      setExito(`${(97.5 + Math.random() * 1.4).toFixed(1)}%`);
      setRows((rs) => [mkRow(), ...rs].slice(0, 3));
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const stats: Array<[string, string, string]> = [
    [act.toLocaleString("es"), "Activaciones hoy", "text-white"],
    [exito, "Tasa de éxito", "text-[#19C3FF]"],
    [String(entregas), "Entregas en curso", "text-[#20E0B2]"],
  ];

  return (
    <div className="h-full p-5">
      <div className="mb-3 flex gap-2.5">
        {stats.map(([n, l, cls]) => (
          <div key={l} className="flex-1 rounded-[11px] border border-white/10 bg-white/[0.04] p-2.5">
            <div className={`text-[20px] font-bold tabular-nums ${cls}`}>{n}</div>
            <div className="mt-0.5 text-[9px] uppercase tracking-[0.4px] text-[#7088a8]">{l}</div>
          </div>
        ))}
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {["Servicio", "Activación", "Entrega", "Estado"].map((h) => (
              <th key={h} className="border-b border-white/[0.08] px-1.5 py-1.5 text-left text-[9px] font-semibold uppercase tracking-[0.4px] text-[#5a7090]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.s}-${i}`} className={i === 0 ? "animate-[rowin_0.5s_ease]" : ""}>
              <td className="border-b border-white/[0.04] px-1.5 py-1.5 text-[11px] text-[#aebfd6]">{r.s}</td>
              <td className="border-b border-white/[0.04] px-1.5 py-1.5 text-[11px] text-[#aebfd6]">{r.a}</td>
              <td className="border-b border-white/[0.04] px-1.5 py-1.5 text-[11px] text-[#aebfd6]">{r.e}</td>
              <td className="border-b border-white/[0.04] px-1.5 py-1.5">
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                    r.st[0] === "ok" ? "text-[#20E0B2] bg-[#20E0B2]/12"
                      : r.st[0] === "pr" ? "text-[#19C3FF] bg-[#19C3FF]/12"
                        : "text-[#f0b840] bg-[#f0b840]/12"
                  }`}
                >
                  {r.st[1]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`@keyframes rowin{from{opacity:0;transform:translateX(-10px);}to{opacity:1;transform:translateX(0);}}`}</style>
    </div>
  );
}

/* ─────────── Integration scene ─────────── */
function IntegrationScene() {
  const [pinged, setPinged] = useState(-1);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    let k = 0;
    setPinged(0);
    setPulse((p) => p + 1);
    const id = setInterval(() => {
      k = (k + 1) % 4;
      setPinged(k);
      setPulse((p) => p + 1);
    }, 700);
    return () => clearInterval(id);
  }, []);

  const systems = [
    { top: 48, ico: "▤", iconBg: "bg-[#20E0B2]/15 text-[#20E0B2]", name: "ERP" },
    { top: 108, ico: "◍", iconBg: "bg-[#19C3FF]/15 text-[#19C3FF]", name: "CRM" },
    { top: 218, ico: "▦", iconBg: "bg-[#f0b840]/15 text-[#f0b840]", name: "Base de datos" },
    { top: 278, ico: "▣", iconBg: "bg-[#8ba3c7]/15 text-[#8ba3c7]", name: "Sistemas legacy" },
  ];

  const pipes = [
    { d: "M 150 70 C 230 70, 230 186, 268 186", color: "#20E0B2" },
    { d: "M 150 130 C 240 130, 240 186, 268 186", color: "#19C3FF" },
    { d: "M 150 240 C 240 240, 240 186, 268 186", color: "#f0b840" },
    { d: "M 150 300 C 230 300, 230 186, 268 186", color: "#8ba3c7" },
  ];

  return (
    <div className="relative h-full">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 372" preserveAspectRatio="none">
        {pipes.map((p, i) => (
          <path key={`pp${i}`} d={p.d} stroke={p.color} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.25" />
        ))}
        <path d="M 352 186 C 420 186, 430 110, 500 110" stroke="#19C3FF" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.25" />
        <path d="M 352 186 C 420 186, 430 270, 500 270" stroke="#20E0B2" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.25" />
        {pipes.map((p, i) => (
          <path
            key={`pl${i}-${pulse}-${pinged}`}
            d={p.d}
            stroke={p.color}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity={pinged === i ? 0.95 : 0}
            style={{
              strokeDasharray: "14 320",
              animation: pinged === i ? "intpulse 0.9s linear" : "none",
            }}
          />
        ))}
      </svg>

      {systems.map((s, i) => (
        <div
          key={s.name}
          className={`absolute left-3.5 flex w-[118px] items-center gap-2 rounded-[10px] border bg-white/[0.04] px-2.5 py-2 transition-all ${
            pinged === i ? "border-[#19C3FF] shadow-[0_0_18px_-4px_rgba(25,195,255,0.5)]" : "border-white/10"
          }`}
          style={{ top: s.top, zIndex: 1 }}
        >
          <div className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md text-[12px] ${s.iconBg}`}>{s.ico}</div>
          <div className="text-[10px] font-semibold leading-tight text-[#e6eefc]">{s.name}</div>
        </div>
      ))}

      <div
        className="absolute left-1/2 top-1/2 flex h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[18px] bg-[#19C3FF]/13 border border-[#19C3FF]/40"
        style={{ zIndex: 2 }}
      >
        <div className="text-[22px] text-[#19C3FF]">⇄</div>
        <div className="mt-0.5 text-[10px] font-bold text-[#19C3FF]">amensg</div>
      </div>

      <div className="absolute right-3.5 w-[120px] rounded-[10px] border border-white/10 bg-white/[0.04] px-2.5 py-2" style={{ top: 78, zIndex: 1 }}>
        <div className="text-[10px] font-semibold text-[#e6eefc]">Dashboard</div>
        <div className="mt-0.5 text-[8.5px] text-[#7088a8]">analítica en vivo</div>
      </div>
      <div className="absolute right-3.5 w-[120px] rounded-[10px] border border-white/10 bg-white/[0.04] px-2.5 py-2" style={{ top: 238, zIndex: 1 }}>
        <div className="text-[10px] font-semibold text-[#e6eefc]">App / API</div>
        <div className="mt-0.5 text-[8.5px] text-[#7088a8]">datos unificados</div>
      </div>

      <div className="absolute bottom-0.5 left-0 right-0 text-center text-[9px] text-[#7088a8]">
        AUTO-SYNC <b className="text-[#20E0B2]">ON</b> · última sincronización: hace 1 min
      </div>

      <style>{`@keyframes intpulse { from { stroke-dashoffset: 334; } to { stroke-dashoffset: 0; } }`}</style>
    </div>
  );
}
