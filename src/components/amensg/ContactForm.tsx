import { useState } from "react";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const N8N_WEBHOOK_URL: string = "REEMPLAZAR_POR_WEBHOOK_REAL";

const schema = z.object({
  nombre: z.string().trim().min(2, "Ingresá tu nombre").max(80),
  empresa: z.string().trim().min(1, "Ingresá tu empresa").max(120),
  email: z.string().trim().email("Email inválido").max(160),
  telefono: z.string().trim().max(40).optional().or(z.literal("")),
  tipo: z.string().min(1, "Seleccioná un tipo"),
  mensaje: z.string().trim().min(10, "Contanos brevemente tu caso").max(1500),
});

type FormState = z.infer<typeof schema>;

const TIPOS = [
  "Automatización de procesos",
  "Agente de IA",
  "Integración de sistemas",
  "Desarrollo de software",
  "Datos / reportes",
  "Otro",
];

const webhookConfigured = N8N_WEBHOOK_URL !== "REEMPLAZAR_POR_WEBHOOK_REAL" && N8N_WEBHOOK_URL.startsWith("http");

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    nombre: "", empresa: "", email: "", telefono: "", tipo: "", mensaje: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const update = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: typeof errors = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as keyof FormState] = i.message; });
      setErrors(errs);
      return;
    }

    if (!webhookConfigured) {
      setStatus("success"); // pretend-submit; alert shown in UI
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, source: "amensg-landing", ts: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error("Network");
      setStatus("success");
      setForm({ nombre: "", empresa: "", email: "", telefono: "", tipo: "", mensaje: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full h-11 px-4 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {!webhookConfigured && (
        <div className="flex items-start gap-2 rounded-lg border border-cyan-bright/40 bg-cyan-bright/5 px-4 py-3 text-xs text-foreground/80">
          <AlertCircle className="h-4 w-4 text-tech-blue mt-0.5 shrink-0" />
          <span>Formulario preparado para integración. Configurar webhook de n8n antes de publicar.</span>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nombre" error={errors.nombre}>
          <input className={inputCls} value={form.nombre} onChange={(e) => update("nombre", e.target.value)} placeholder="Tu nombre" />
        </Field>
        <Field label="Empresa" error={errors.empresa}>
          <input className={inputCls} value={form.empresa} onChange={(e) => update("empresa", e.target.value)} placeholder="Nombre de tu empresa" />
        </Field>
        <Field label="Email" error={errors.email}>
          <input type="email" className={inputCls} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="nombre@empresa.com" />
        </Field>
        <Field label="Teléfono" error={errors.telefono}>
          <input className={inputCls} value={form.telefono} onChange={(e) => update("telefono", e.target.value)} placeholder="Opcional" />
        </Field>
      </div>

      <Field label="Tipo de necesidad" error={errors.tipo}>
        <select className={inputCls} value={form.tipo} onChange={(e) => update("tipo", e.target.value)}>
          <option value="">Seleccionar…</option>
          {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>

      <Field label="Mensaje" error={errors.mensaje}>
        <textarea
          rows={5}
          className={`${inputCls} h-auto py-3 resize-y`}
          value={form.mensaje}
          onChange={(e) => update("mensaje", e.target.value)}
          placeholder="Contanos el proceso, sistemas involucrados y qué te gustaría mejorar."
        />
      </Field>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-7 rounded-full bg-primary text-white font-semibold hover:bg-tech-blue/90 disabled:opacity-60 shadow-[0_10px_30px_-10px_oklch(0.58_0.18_253/0.6)] transition"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        Enviar consulta
      </button>

      {status === "success" && (
        <div className="flex items-start gap-2 rounded-lg border border-teal-accent/40 bg-teal-accent/10 px-4 py-3 text-sm text-foreground">
          <CheckCircle2 className="h-4 w-4 text-teal-accent mt-0.5 shrink-0" />
          <span>
            {webhookConfigured
              ? "Gracias. Recibimos tu mensaje y te respondemos a la brevedad."
              : "Mensaje validado correctamente. (El webhook de n8n aún no está configurado, por lo que no se envió a destino.)"}
          </span>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-foreground">
          <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
          <span>No pudimos enviar el mensaje. Probá nuevamente o escribinos por WhatsApp.</span>
        </div>
      )}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wide">{label}</span>
      {children}
      {error && <span className="block mt-1 text-xs text-destructive">{error}</span>}
    </label>
  );
}
