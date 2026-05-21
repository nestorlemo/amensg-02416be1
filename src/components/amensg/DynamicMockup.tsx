import { useCallback, useEffect, useRef, useState } from "react";

type SceneProps = {
  onCycleComplete?: () => void;
  reduced?: boolean;
};

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
// Tab order requested: Automatización · Integración · Agentes de IA · Gestión
// Scenes by index: 0 Workflow, 1 Chat, 2 App, 3 Integration
const TABS_ORDER: Array<{ label: string; scene: number; desc: string }> = [
  { label: "Automatización", scene: 0, desc: "Automatizamos tareas repetitivas, validaciones y flujos críticos." },
  { label: "Integración", scene: 3, desc: "Conectamos ERP, CRM, APIs y sistemas legacy sin retrabajo." },
  { label: "Agentes de IA", scene: 1, desc: "Agentes conectados al conocimiento, datos y procesos de la empresa." },
  { label: "Gestión", scene: 2, desc: "Plataformas para ventas, backoffice, distribución y operación en campo." },
];

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
  // Index into TABS_ORDER (0..3). Advances ONLY when the active scene reports
  // it has finished its own cycle (onCycleComplete). No fixed-time interval.
  const [tabIdx, setTabIdx] = useState(0);
  // Toggles 0/1 each time we LEAVE the Integration slide so the next visit
  // shows the other pair of internal scenarios.
  const [integrationPairIdx, setIntegrationPairIdx] = useState(0);
  // Bumped on every advance / manual jump so the active scene remounts and
  // restarts its animation from zero.
  const [cycleKey, setCycleKey] = useState(0);
  const [playing, setPlaying] = useState(true);

  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReduced(mq.matches); if (mq.matches) setPlaying(false); };
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Ref so the callback stays stable but always sees latest playing state.
  const playingRef = useRef(playing);
  playingRef.current = playing;

  const handleCycleComplete = useCallback(() => {
    if (!playingRef.current) return;
    setTabIdx((i) => {
      // If we are leaving the Integration scene, toggle which pair to show next.
      if (TABS_ORDER[i].scene === 3) {
        setIntegrationPairIdx((p) => (p + 1) % 2);
      }
      return (i + 1) % TABS_ORDER.length;
    });
    setCycleKey((k) => k + 1);
  }, []);

  const goToTab = (i: number) => {
    const next = ((i % TABS_ORDER.length) + TABS_ORDER.length) % TABS_ORDER.length;
    setTabIdx(next);
    setCycleKey((k) => k + 1);
  };
  const prev = () => goToTab(tabIdx - 1);
  const next = () => goToTab(tabIdx + 1);

  const cur = TABS_ORDER[tabIdx].scene;
  const [badgeCls, badgeTxt] = BADGES[cur];

  // Unique key per (tab, cycle) to force a clean remount each cycle.
  const sceneKey = `${tabIdx}-${cycleKey}`;

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
          {cur === 0 && <WorkflowScene key={sceneKey} onCycleComplete={handleCycleComplete} reduced={reduced} />}
          {cur === 1 && <ChatScene key={sceneKey} onCycleComplete={handleCycleComplete} reduced={reduced} />}
          {cur === 2 && <AppScene key={sceneKey} onCycleComplete={handleCycleComplete} reduced={reduced} />}
          {cur === 3 && (
            <IntegrationScene
              key={sceneKey}
              onCycleComplete={handleCycleComplete}
              reduced={reduced}
              pairIdx={integrationPairIdx}
            />
          )}
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

      <div className="mt-4 flex flex-wrap justify-center gap-2 px-1">
        {TABS_ORDER.map((t, i) => {
          const active = tabIdx === i;
          return (
            <button
              key={t.label}
              type="button"
              onClick={() => goToTab(i)}
              aria-pressed={active}
              className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-[12px] font-semibold transition-all ${
                active
                  ? "bg-[#19C3FF]/20 border-[#19C3FF]/70 text-white shadow-[0_0_0_1px_rgba(25,195,255,0.35)]"
                  : "bg-white/[0.04] border-white/15 text-white/70 hover:text-white hover:border-white/30"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-[#19C3FF]" : "bg-[#5a7090]"}`} />
              {t.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 mb-2 px-2 text-center text-[12.5px] leading-relaxed text-white/65 min-h-[2.2em]">
        {TABS_ORDER[tabIdx].desc}
      </p>
    </div>
  );
}

/* ─────────── Workflow scene (horizontal n8n) ─────────── */
function WorkflowScene({ onCycleComplete, reduced }: SceneProps) {
  const [step, setStep] = useState(0);
  const order = ["w0", "w1", "w2", "w3", "w5"];
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduced) { setStep(order.length); onCycleComplete?.(); return; }
    let s = 0;
    setStep(0);
    doneRef.current = false;
    const total = order.length + 2; // last steps freeze at end state
    const id = setInterval(() => {
      s += 1;
      if (s >= total) {
        clearInterval(id);
        setStep(order.length); // freeze at completed state
        if (!doneRef.current) { doneRef.current = true; onCycleComplete?.(); }
        return;
      }
      setStep(s);
    }, 850);
    return () => clearInterval(id);
  }, [onCycleComplete, reduced]);

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

  // Logical canvas
  const CW = 620;
  const CH = 270;
  const X = (px: number) => `${((px / CW) * 100).toFixed(3)}%`;
  const Y = (py: number) => `${((py / CH) * 100).toFixed(3)}%`;
  const W = (w: number) => `${((w / CW) * 100).toFixed(3)}%`;

  return (
    <div className="flex h-full items-center justify-center px-3">
      <div className="relative w-full max-w-[620px]" style={{ aspectRatio: `${CW} / ${CH}` }}>
      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox={`0 0 ${CW} ${CH}`} preserveAspectRatio="none">
        {(() => {
          const paths = [
            "M 96 123 C 120 123, 150 123, 147 123",
            "M 201 123 C 225 123, 255 123, 252 123",
            "M 306 123 C 335 123, 355 68, 357 68",
            "M 306 123 C 335 123, 355 188, 357 188",
            "M 411 68 C 470 68, 500 123, 532 123",
            "M 411 188 C 470 188, 500 123, 532 123",
          ];
          return (
            <>
              {paths.map((d, i) => (
                <path key={i} d={d} stroke="rgba(255,255,255,0.13)" strokeWidth="1.8" fill="none" vectorEffect="non-scaling-stroke" />
              ))}
              {[paths[0], paths[1], paths[2], paths[4]].map((d, i) => (
                <path
                  key={`l${i}`}
                  d={d}
                  stroke="#19C3FF"
                  strokeWidth="1.8"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  style={{ opacity: i < litEdges ? 1 : 0, transition: "opacity 0.6s ease" }}
                />
              ))}
            </>
          );
        })()}
      </svg>

      {nodes.map((n) => {
        const idx = order.indexOf(n.id);
        const state = idx >= 0 ? nodeState(idx) : step >= 4 ? "active" : "";
        const visible = idx >= 0 ? step >= idx : step >= 4;
        const isActive = state === "active";
        const isDone = state === "done";
        const isAgent = n.id === "w2";
        return (
          <div
            key={n.id}
            className="absolute transition-all duration-300"
            style={{
              left: X(n.x),
              top: Y(n.y),
              width: W(78),
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.8)",
            }}
          >
            <div
              className={`relative mx-auto flex h-[54px] w-[54px] items-center justify-center rounded-[13px] border transition-all ${
                isAgent ? "text-[18px]" : "text-[21px]"
              } ${
                isActive
                  ? "border-[#19C3FF] bg-[#19C3FF]/12 text-[#19C3FF] shadow-[0_0_22px_-4px_rgba(25,195,255,0.5)]"
                  : isDone
                    ? "border-[#20E0B2]/45 bg-white/5 text-[#20E0B2]"
                    : isAgent
                      ? "border-[#a78bfa]/40 bg-[#a78bfa]/8 text-[#c4b5fd]"
                      : "border-white/12 bg-white/5 text-[#cfe4f7]"
              }`}
            >
              {isAgent ? (
                <>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="8" width="16" height="11" rx="2.5" />
                    <path d="M12 3v5" />
                    <circle cx="12" cy="3" r="1.2" fill="currentColor" />
                    <circle cx="9" cy="13" r="1.1" fill="currentColor" />
                    <circle cx="15" cy="13" r="1.1" fill="currentColor" />
                    <path d="M9 16.5h6" />
                  </svg>
                  <span className="absolute -top-1.5 -right-1.5 rounded-[5px] bg-[#a78bfa] px-1 py-[1px] text-[7px] font-bold text-[#1a0f2e] leading-none">AI</span>
                </>
              ) : (
                n.icon
              )}
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
        style={{ left: X(340), top: Y(74), opacity: step >= 3 ? 1 : 0 }}
      >
        true
      </div>
      <div
        className="absolute text-[8px] font-semibold px-1.5 py-0.5 rounded text-[#7088a8] bg-white/[0.06] transition-opacity"
        style={{ left: X(340), top: Y(200), opacity: step >= 3 ? 1 : 0 }}
      >
        false
      </div>

      {/* sub: OpenAI under w2 */}
      <div
        className="absolute transition-opacity duration-300"
        style={{ left: X(253), top: Y(215), width: W(48), opacity: step >= 2 ? 1 : 0 }}
      >
        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04] text-sm text-[#7e9fc4]">◎</div>
        <div className="mt-0.5 text-center text-[8px] text-[#7088a8]">OpenAI</div>
      </div>
      </div>
    </div>
  );
}

/* ─────────── Chat scene ─────────── */
function ChatScene({ onCycleComplete, reduced }: SceneProps) {
  const [msgs, setMsgs] = useState<Array<{ w: "ai" | "u"; t: string; typing?: boolean }>>([]);
  const iRef = useRef(0);

  useEffect(() => {
    iRef.current = 0;
    setMsgs([]);
    if (reduced) { onCycleComplete?.(); return; }
    let cancelled = false;
    let done = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const finish = () => {
      if (done || cancelled) return;
      done = true;
      onCycleComplete?.();
    };

    const next = () => {
      if (cancelled) return;
      if (iRef.current >= CONVO.length) {
        // One full pass. Hold the final state briefly, then signal completion.
        timeouts.push(setTimeout(finish, 1200));
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
          timeouts.push(setTimeout(next, 700));
        }, 600));
      } else {
        setMsgs((m) => [...m, { w, t }].slice(-4));
        iRef.current++;
        timeouts.push(setTimeout(next, 600));
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
type EdgeSpec = { side: "L" | "R"; idx: number; bi: boolean };
type Scenario = {
  pattern: string;
  desc: string;
  leftActive: number[];
  rightActive: number[];
  edges: EdgeSpec[];
};

function IntegrationScene() {
  const LEFT = [
    { name: "ERP", ico: "▤", color: "#20E0B2" },
    { name: "CRM", ico: "◍", color: "#19C3FF" },
    { name: "Operaciones", ico: "▦", color: "#f0b840" },
    { name: "Sistema legacy", ico: "▣", color: "#8ba3c7" },
  ];
  const RIGHT = [
    { name: "Analítica / BI", ico: "▥", color: "#19C3FF" },
    { name: "API pública", ico: "◇", color: "#20E0B2" },
    { name: "SaaS externos", ico: "☁", color: "#a78bfa" },
    { name: "Facturación", ico: "⚡", color: "#a78bfa" },
    { name: "Agente IA", ico: "◆", color: "#c4b5fd" },
  ];

  const SCENARIOS: Scenario[] = [
    {
      pattern: "sync bidireccional",
      desc: "Mantenemos ERP y CRM sincronizados para que finanzas y comercial trabajen sobre la misma información.",
      leftActive: [0, 1],
      rightActive: [0],
      edges: [
        { side: "L", idx: 0, bi: true },
        { side: "L", idx: 1, bi: true },
        { side: "R", idx: 0, bi: false },
      ],
    },
    {
      pattern: "orquestación event-driven",
      desc: "Eventos de tu operación disparan acciones en SaaS externos y facturación electrónica, sin intervención manual.",
      leftActive: [0],
      rightActive: [2, 3],
      edges: [
        { side: "L", idx: 0, bi: false },
        { side: "R", idx: 2, bi: false },
        { side: "R", idx: 3, bi: false },
      ],
    },
    {
      pattern: "fachada de API",
      desc: "Envolvemos tus sistemas heredados y exponemos una API moderna, sin reemplazar lo que ya funciona.",
      leftActive: [3],
      rightActive: [1],
      edges: [
        { side: "L", idx: 3, bi: false },
        { side: "R", idx: 1, bi: false },
      ],
    },
    {
      pattern: "contexto para IA",
      desc: "Unificamos sistemas y datos para que la IA opere con el contexto real de tu negocio.",
      leftActive: [0, 1, 2],
      rightActive: [4],
      edges: [
        { side: "L", idx: 0, bi: false },
        { side: "L", idx: 1, bi: false },
        { side: "L", idx: 2, bi: false },
        { side: "R", idx: 4, bi: false },
      ],
    },
  ];

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const u = () => { setReduced(mq.matches); if (mq.matches) setPlaying(false); };
    u();
    mq.addEventListener?.("change", u);
    return () => mq.removeEventListener?.("change", u);
  }, []);

  useEffect(() => {
    if (!playing || reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % SCENARIOS.length), 4200);
    return () => clearInterval(id);
  }, [playing, reduced, SCENARIOS.length]);

  const scene = SCENARIOS[active];

  // Logical canvas 720 x 352 (extra width so long labels fit)
  const CW = 720;
  const CH = 352;
  const X = (px: number) => `${((px / CW) * 100).toFixed(3)}%`;
  const Y = (py: number) => `${((py / CH) * 100).toFixed(3)}%`;
  const W = (w: number) => `${((w / CW) * 100).toFixed(3)}%`;
  const H = (h: number) => `${((h / CH) * 100).toFixed(3)}%`;

  // Right edge of left-column nodes (anchor) and left edge of right-column nodes (anchor)
  const LEFT_EDGE_X = 160;   // right edge of every left node
  const RIGHT_EDGE_X = 560;  // left edge of every right node

  // Vertical placement
  const leftTops = [40, 110, 180, 250];
  const rightTops = [12, 80, 148, 216, 284];
  const hub = { x: 315, y: 134, w: 90, h: 90, cx: 360, cy: 179 };
  const NODE_H = 38;

  const leftPath = (i: number) => {
    const y = leftTops[i] + NODE_H / 2;
    return `M ${LEFT_EDGE_X} ${y} C 230 ${y}, 250 ${hub.cy}, ${hub.x} ${hub.cy}`;
  };
  const rightPath = (i: number) => {
    const y = rightTops[i] + NODE_H / 2;
    return `M ${hub.x + hub.w} ${hub.cy} C 470 ${hub.cy}, 480 ${y}, ${RIGHT_EDGE_X} ${y}`;
  };

  return (
    <div className="flex h-full items-center justify-center px-2">
      <div className="relative w-full max-w-[720px] h-[352px]">
        {/* Top-left controls: play/pause + pattern label (free of any node) */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            disabled={reduced}
            aria-label={playing ? "Pausar rotación" : "Reanudar rotación"}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-[#aebfd6] hover:text-white hover:border-white/25 transition-all disabled:opacity-30"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><polygon points="7,5 19,12 7,19" /></svg>
            )}
          </button>
          <div
            key={`pat-${active}`}
            className="rounded-md border border-[#19C3FF]/30 bg-[#19C3FF]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.6px] text-[#7DD8FF] animate-[intfade_0.4s_ease] whitespace-nowrap"
          >
            {scene.pattern}
          </div>
        </div>

        <svg
          className="absolute inset-0 h-full w-full pointer-events-none"
          viewBox={`0 0 ${CW} ${CH}`}
          preserveAspectRatio="none"
        >
          <defs>
            <marker id="arrHub" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#19C3FF" />
            </marker>
            <marker id="arrOut" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#19C3FF" />
            </marker>
            <marker id="arrBack" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#19C3FF" />
            </marker>
          </defs>

          {/* All edges dimmed */}
          {LEFT.map((_, i) => (
            <path key={`Lb${i}`} d={leftPath(i)} stroke="#ffffff" strokeWidth="1.4" fill="none" opacity="0.06" vectorEffect="non-scaling-stroke" />
          ))}
          {RIGHT.map((_, i) => (
            <path key={`Rb${i}`} d={rightPath(i)} stroke="#ffffff" strokeWidth="1.4" fill="none" opacity="0.06" vectorEffect="non-scaling-stroke" />
          ))}

          {/* Active edges */}
          {scene.edges.map((e, k) => {
            const d = e.side === "L" ? leftPath(e.idx) : rightPath(e.idx);
            return (
              <g key={`act-${active}-${k}`} className="animate-[intfade_0.4s_ease]">
                <path
                  d={d}
                  stroke="#19C3FF"
                  strokeWidth="1.6"
                  fill="none"
                  opacity="0.45"
                  vectorEffect="non-scaling-stroke"
                  markerEnd={e.side === "R" ? "url(#arrOut)" : "url(#arrHub)"}
                  markerStart={e.bi ? "url(#arrBack)" : undefined}
                />
                {!reduced && (
                  <path
                    d={d}
                    stroke="#19C3FF"
                    strokeWidth="2.4"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      strokeDasharray: "16 260",
                      animation: "intpulseF 1.6s linear infinite",
                    }}
                  />
                )}
                {!reduced && e.bi && (
                  <path
                    d={d}
                    stroke="#20E0B2"
                    strokeWidth="2.4"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      strokeDasharray: "16 260",
                      animation: "intpulseR 1.6s linear infinite",
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Left nodes: anchored by RIGHT edge at x=LEFT_EDGE_X, auto width */}
        {LEFT.map((s, i) => {
          const isOn = scene.leftActive.includes(i);
          return (
            <div
              key={s.name}
              className="absolute flex items-center gap-2 rounded-[10px] border bg-white/[0.04] transition-all duration-400"
              style={{
                right: X(CW - LEFT_EDGE_X),
                top: Y(leftTops[i]),
                height: H(NODE_H),
                width: "auto",
                minWidth: W(72),
                paddingLeft: "12px",
                paddingRight: "12px",
                zIndex: 1,
                opacity: isOn ? 1 : 0.25,
                borderColor: isOn ? s.color : "rgba(255,255,255,0.1)",
                boxShadow: isOn ? `0 0 18px -4px ${s.color}66` : "none",
              }}
            >
              <div
                className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md text-[12px]"
                style={{ background: `${s.color}26`, color: s.color }}
              >
                {s.ico}
              </div>
              <div className="text-[13px] font-semibold leading-tight text-[#e6eefc] whitespace-nowrap">{s.name}</div>
            </div>
          );
        })}

        {/* Hub */}
        <div
          className="absolute flex flex-col items-center justify-center rounded-[18px] bg-[#19C3FF]/15 border-2 border-[#19C3FF]/55"
          style={{
            left: X(hub.x),
            top: Y(hub.y),
            width: W(hub.w),
            height: H(hub.h),
            zIndex: 2,
            boxShadow: "0 0 28px -6px rgba(25,195,255,0.55)",
          }}
        >
          <div className="text-[24px] text-[#19C3FF] leading-none">⇄</div>
          <div className="mt-1 text-[13px] font-bold text-white">amensg</div>
          <div className="text-[10px] text-[#19C3FF] mt-0.5 uppercase tracking-[0.8px]">hub</div>
        </div>

        {/* Right nodes: anchored by LEFT edge at x=RIGHT_EDGE_X, auto width */}
        {RIGHT.map((s, i) => {
          const isOn = scene.rightActive.includes(i);
          return (
            <div
              key={s.name}
              className="absolute flex items-center gap-2 rounded-[10px] border bg-white/[0.04] transition-all duration-400"
              style={{
                left: X(RIGHT_EDGE_X),
                top: Y(rightTops[i]),
                height: H(NODE_H),
                width: "auto",
                minWidth: W(72),
                paddingLeft: "12px",
                paddingRight: "12px",
                zIndex: 1,
                opacity: isOn ? 1 : 0.25,
                borderColor: isOn ? s.color : "rgba(255,255,255,0.1)",
                boxShadow: isOn ? `0 0 18px -4px ${s.color}66` : "none",
              }}
            >
              <div
                className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md text-[11px]"
                style={{ background: `${s.color}26`, color: s.color }}
              >
                {s.ico}
              </div>
              <div className="text-[13px] font-semibold leading-tight text-[#e6eefc] whitespace-nowrap">{s.name}</div>
            </div>
          );
        })}

        {/* Dynamic subtitle */}
        <div
          key={`desc-${active}`}
          className="absolute bottom-1 left-4 right-4 text-center text-[11px] leading-snug text-[#aebfd6] animate-[intfade_0.4s_ease]"
        >
          {scene.desc}
        </div>
      </div>

      <style>{`
        @keyframes intpulseF { from { stroke-dashoffset: 276; } to { stroke-dashoffset: 0; } }
        @keyframes intpulseR { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 276; } }
        @keyframes intfade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
