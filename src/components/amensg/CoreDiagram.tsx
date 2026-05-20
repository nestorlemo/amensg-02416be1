import { Database, Server, Globe, MessageSquare, Brain, Workflow, Plug, ShieldCheck, LineChart, Gauge } from "lucide-react";

/**
 * AMENSG flow diagram
 *
 * Left column  : sistemas y canales que ya existen en la empresa.
 * Center stack : el núcleo AMENSG (IA + orquestación + integración).
 * Right column : resultados operativos concretos.
 *
 * Las líneas SVG animadas representan el flujo de datos / acciones
 * entrando al núcleo y saliendo como resultados.
 */
export function CoreDiagram() {
  const inputs = [
    { icon: Server, label: "ERP / SAP" },
    { icon: Database, label: "Bases de datos" },
    { icon: Globe, label: "Plataformas web" },
    { icon: MessageSquare, label: "WhatsApp · Teams" },
  ];
  const outputs = [
    { icon: ShieldCheck, label: "Menos errores" },
    { icon: Gauge, label: "Menos trabajo manual" },
    { icon: LineChart, label: "Trazabilidad" },
    { icon: Workflow, label: "Procesos automatizados" },
  ];
  const core = [
    { icon: Brain, label: "Agentes de IA" },
    { icon: Plug, label: "Integración" },
    { icon: Workflow, label: "Orquestación" },
  ];

  return (
    <div className="relative w-full max-w-[620px] mx-auto">
      {/* SVG flow lines (desktop) */}
      <svg
        viewBox="0 0 620 360"
        className="absolute inset-0 w-full h-full hidden md:block pointer-events-none"
        aria-hidden
      >
        <defs>
          <linearGradient id="flowIn" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.78 0.15 220)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="oklch(0.78 0.15 220)" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="flowOut" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.82 0.15 175)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.82 0.15 175)" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Input lines: 4 nodes on left -> single core point */}
        {[60, 140, 220, 300].map((y, i) => (
          <path
            key={`in-${i}`}
            d={`M 150 ${y} C 230 ${y}, 240 180, 310 180`}
            stroke="url(#flowIn)"
            strokeWidth="1.4"
            fill="none"
            strokeDasharray="5 7"
            className="animate-flow"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}

        {/* Output lines: core point -> 4 nodes on right */}
        {[60, 140, 220, 300].map((y, i) => (
          <path
            key={`out-${i}`}
            d={`M 310 180 C 380 180, 390 ${y}, 470 ${y}`}
            stroke="url(#flowOut)"
            strokeWidth="1.4"
            fill="none"
            strokeDasharray="5 7"
            className="animate-flow"
            style={{ animationDelay: `${0.5 + i * 0.25}s` }}
          />
        ))}
      </svg>

      <div className="relative grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] gap-5 md:gap-8 items-center">
        {/* INPUT */}
        <div className="space-y-2.5">
          <div className="text-[10px] tracking-[0.25em] uppercase text-cyan-bright/80 font-semibold mb-3">
            Lo que ya existe
          </div>
          {inputs.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl glass-card text-white/90"
            >
              <span className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-bright shrink-0">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-[13px] font-medium truncate">{label}</span>
            </div>
          ))}
        </div>

        {/* CORE */}
        <div className="col-span-2 md:col-span-1 order-first md:order-none flex justify-center">
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-tech-blue/30 via-cyan-bright/20 to-teal-accent/20 blur-2xl" />
            <div className="relative w-[220px] rounded-2xl glass-card p-5 text-center shadow-[0_20px_60px_-20px_rgba(23,105,224,0.55)]">
              <div className="text-[10px] tracking-[0.3em] text-cyan-bright font-semibold">AMENSG</div>
              <div className="mt-1 text-2xl font-bold text-white font-display">CORE</div>
              <div className="mt-4 space-y-1.5">
                {core.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[12px] text-white/90"
                  >
                    <Icon className="h-3.5 w-3.5 text-cyan-bright shrink-0" />
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="space-y-2.5">
          <div className="text-[10px] tracking-[0.25em] uppercase text-teal-accent/90 font-semibold mb-3 md:text-right">
            Resultado operativo
          </div>
          {outputs.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl glass-card text-white/90"
            >
              <span className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-teal-accent shrink-0">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-[13px] font-medium truncate">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="relative mt-6 text-center text-[11px] text-white/50 tracking-wide">
        Conectamos los sistemas que ya usás · sumamos IA y automatización · devolvemos resultados operativos
      </p>
    </div>
  );
}
