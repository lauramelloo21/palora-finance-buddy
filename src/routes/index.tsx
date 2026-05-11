import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, Zap, ArrowRight, BarChart3, LineChart, Wallet } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Palora Finance — Organize hoje. Cresça amanhã." },
      { name: "description", content: "Plataforma de controle e análise financeira para empresas. Simples, segura e inteligente." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 70% 30%, var(--primary), transparent 60%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-border bg-secondary/50 text-muted-foreground mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Fintech para empresas
            </span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Palora <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>Finance</span>
            </h1>
            <p className="mt-4 text-2xl md:text-3xl text-muted-foreground font-light">Organize hoje. Cresça amanhã.</p>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Controle, analise e planeje a saúde financeira da sua empresa em uma só plataforma — com a clareza que decisões importantes exigem.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/analise" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-primary-foreground transition-transform hover:scale-[1.02]" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
                Analisar finanças <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/servicos" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border border-border bg-secondary/40 hover:bg-secondary transition-colors">
                Ver serviços
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-border bg-card p-6 backdrop-blur" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Resumo financeiro</span>
                <span className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground">Out 2025</span>
              </div>
              <div className="text-4xl font-bold tracking-tight">R$ 184.250<span className="text-lg text-muted-foreground">,00</span></div>
              <div className="text-sm" style={{ color: "var(--success)" }}>+12,4% em relação ao mês anterior</div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[["Receita", "R$ 312k"], ["Despesas", "R$ 128k"], ["Margem", "59%"]].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-secondary/60 p-3">
                    <div className="text-xs text-muted-foreground">{k}</div>
                    <div className="font-semibold mt-1">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-24 rounded-lg flex items-end gap-1 p-2 bg-secondary/40">
                {[40, 65, 50, 80, 60, 90, 75, 95, 70, 110, 88, 120].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 0.7}%`, background: "var(--gradient-primary)" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Simples", desc: "Interface intuitiva. Comece a usar em minutos, sem treinamento." },
            { icon: ShieldCheck, title: "Seguro", desc: "Seus dados ficam no seu navegador, com privacidade total." },
            { icon: Sparkles, title: "Inteligente", desc: "Análises automáticas que orientam decisões estratégicas." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl p-6 border border-border bg-card hover:border-primary/50 transition-colors">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: "var(--gradient-primary)" }}>
                <Icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-2xl p-10 border border-border" style={{ background: "var(--gradient-hero)" }}>
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Pronto para entender suas finanças?</h2>
              <p className="text-muted-foreground mt-2">Faça uma análise gratuita em segundos e salve seu histórico.</p>
            </div>
            <Link to="/analise" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              Começar análise <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: Wallet, k: "Controle" },
              { icon: LineChart, k: "Planejamento" },
              { icon: BarChart3, k: "Análises" },
            ].map(({ icon: Icon, k }) => (
              <div key={k} className="flex items-center gap-3 rounded-lg bg-card/60 border border-border p-4">
                <Icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{k}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
