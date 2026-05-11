import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Palora Finance" },
      { name: "description", content: "Fale com a Palora Finance. Estamos prontos para ajudar sua empresa." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-2xl">
        <span className="text-sm text-primary font-medium">Contato</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">Vamos conversar</h1>
        <p className="mt-4 text-muted-foreground text-lg">Tem dúvidas, sugestões ou quer conhecer melhor a plataforma? Estamos por aqui.</p>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 mt-12">
        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-8 space-y-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Nome</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Seu nome" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="voce@empresa.com" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Mensagem</label>
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Como podemos ajudar?" />
          </div>
          <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-primary-foreground" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
            <Send className="w-4 h-4" /> Enviar mensagem
          </button>
          {sent && (
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--success)" }}>
              <CheckCircle2 className="w-4 h-4" /> Mensagem enviada (simulação). Em breve entraremos em contato!
            </div>
          )}
        </form>

        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "contato@palora.finance" },
            { icon: Phone, label: "Telefone", value: "+55 (11) 4002-8922" },
            { icon: MapPin, label: "Endereço", value: "Av. Paulista, 1000 — São Paulo, SP" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                <Icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="font-medium">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}