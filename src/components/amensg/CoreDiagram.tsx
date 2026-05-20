import {
  Database, Cable, Globe, MessageSquare, Workflow, FileBarChart2, Users, Server,
} from "lucide-react";

const NODES = [
  { label: "SAP / ERP", icon: Server,        angle: -90 },
  { label: "APIs",      icon: Cable,         angle: -45 },
  { label: "Bases de datos", icon: Database, angle: 0   },
  { label: "Web Apps",  icon: Globe,         angle: 45  },
  { label: "WhatsApp / Teams", icon: MessageSquare, angle: 90 },
  { label: "Procesos",  icon: Workflow,      angle: 135 },
  { label: "Reportes",  icon: FileBarChart2, angle: 180 },
  { label: "Usuarios",  icon: Users,         angle: -135 },
];

export function CoreDiagram() {
  // SVG canvas 560x560, center 280,280, radius 220 for nodes
  const cx = 280, cy = 280, r = 215;
  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-square">
      <svg viewBox="0 0 560 560" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.78 0.15 220)" stopOpacity="0.85" />
            <stop offset="60%" stopColor="oklch(0.58 0.18 253)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.22 0.07 252)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.15 220)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.82 0.15 175)" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* outer rings */}
        <circle cx={cx} cy={cy} r={r}     fill="none" stroke="oklch(1 0 0 / 0.08)" />
        <circle cx={cx} cy={cy} r={r-60}  fill="none" stroke="oklch(1 0 0 / 0.06)" />
        <circle cx={cx} cy={cy} r={r-120} fill="none" stroke="oklch(1 0 0 / 0.05)" />

        {/* glow */}
        <circle cx={cx} cy={cy} r={150} fill="url(#coreGrad)" />

        {/* connecting lines */}
        {NODES.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = cx + Math.cos(rad) * r;
          const y = cy + Math.sin(rad) * r;
          return (
            <g key={i}>
              <line
                x1={cx} y1={cy} x2={x} y2={y}
                stroke="url(#lineGrad)"
                strokeWidth={1.2}
                strokeDasharray="4 6"
                className="animate-flow"
                style={{ animationDelay: `${i * 0.25}s` }}
              />
              <circle cx={x} cy={y} r={4} fill="oklch(0.82 0.15 175)" className="animate-pulse-dot" style={{ animationDelay: `${i*0.2}s` }} />
            </g>
          );
        })}
      </svg>

      {/* Center core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="px-6 py-5 rounded-2xl glass-card text-center shadow-[0_20px_60px_-20px_rgba(23,105,224,0.5)]">
          <div className="text-[10px] tracking-[0.3em] text-cyan-bright/90 font-semibold">AMENSG</div>
          <div className="mt-1 text-2xl font-bold text-white">CORE</div>
          <div className="mt-1 text-[11px] text-white/70 whitespace-nowrap">
            IA · Integración · Automatización
          </div>
        </div>
      </div>

      {/* Node labels */}
      {NODES.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = 50 + (Math.cos(rad) * r * 100) / 560;
        const y = 50 + (Math.sin(rad) * r * 100) / 560;
        const Icon = n.icon;
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className="flex flex-col items-center gap-1.5">
              <div className="h-11 w-11 rounded-xl glass-card flex items-center justify-center text-cyan-bright shadow-lg">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-[11px] font-medium text-white/85 whitespace-nowrap bg-navy-deep/40 backdrop-blur px-2 py-0.5 rounded">
                {n.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
