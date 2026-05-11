import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Calculator, Save, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { saveRecord, statusFor, formatBRL, type FinanceStatus } from "@/lib/finance-storage";

export const Route = createFileRoute("/analise")({
  head: () => ({
    meta: [
      { title: "Análise Financeira — Palora Finance" },
      { name: "description", content: "Calcule o lucro da sua empresa e receba um diagnóstico imediato." },
    ],
  }),
  component: AnalisePage,
});

const statusMeta: Record<FinanceStatus, { label: string; color: string; icon: typeof CheckCircle2; message: string }> = {
  good: { label: "Bom lucro", color: "var(--success)", icon: CheckCircle2, message: "Excelente! Sua empresa apresenta uma margem saudável. Continue reinvestindo com estratégia." },
  warning: { label: "Atenção", color: "var(--warning)", icon: AlertTriangle, message: "Sua margem está apertada. Avalie cortes em despesas e oportunidades de aumentar receita." },
  bad: { label: "Prejuízo", color: "var(--destructive)", icon: XCircle, message: "Resultado negativo. Reveja despesas urgentes e converse com nossa consultoria." },
};

function AnalisePage() {
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [result, setResult] = useState<{ revenue: number; expenses: number; profit: number; status: FinanceStatus } | null>(null);
  const [saved, setSaved] = useState(false);

  function analyze(e: React.FormEvent) {
    e.preventDefault();
    const r = parseFloat(revenue) || 0;
    const ex = parseFloat(expenses) || 0;
    const profit = r - ex;
    setResult({ revenue: r, expenses: ex, profit, status: statusFor(profit, r) });
    setSaved(false);
  }

  function handleSave() {
    if (!result) return;
    saveRecord({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      revenue: result.revenue,
      expenses: result.expenses,
      profit: result.profit,
      status: result.status,
    });
    setSaved(true);
  }

  const meta = result ? statusMeta[result.status] : null;
  const Icon = meta?.icon;

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-sm text-primary font-medium">Análise Financeira</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">Quanto sua empresa lucrou?</h1>
        <p className="mt-4 text-muted-foreground text-lg">Insira receita e despesas — receba um diagnóstico instantâneo.</p>
      </div>

      <form onSubmit={analyze} className="grid md:grid-cols-2 gap-6 mt-12 rounded-2xl border border-border bg-card p-8" style={{ boxShadow: "var(--shadow-card)" }}>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Receita total (R$)</label>
          <input
            type="number" step="0.01" min="0" required
            value={revenue} onChange={(e) => setRevenue(e.target.value)}
            className="mt-2 w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="0,00"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Despesas totais (R$)</label>
          <input
            type="number" step="0.01" min="0" required
            value={expenses} onChange={(e) => setExpenses(e.target.value)}
            className="mt-2 w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="0,00"
          />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-primary-foreground" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
            <Calculator className="w-4 h-4" /> Analisar
          </button>
        </div>
      </form>

      {result && meta && Icon && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-8" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-sm text-muted-foreground">Lucro calculado</div>
              <div className="text-5xl font-bold tracking-tight mt-1" style={{ color: meta.color }}>
                {formatBRL(result.profit)}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Receita {formatBRL(result.revenue)} − Despesas {formatBRL(result.expenses)}
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border" style={{ background: "color-mix(in oklab, " + meta.color + " 12%, transparent)" }}>
              <Icon className="w-6 h-6" style={{ color: meta.color }} />
              <span className="font-semibold" style={{ color: meta.color }}>{meta.label}</span>
            </div>
          </div>
          <p className="mt-6 text-muted-foreground">{meta.message}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={handleSave} disabled={saved} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium border border-border bg-secondary hover:bg-secondary/80 disabled:opacity-60">
              <Save className="w-4 h-4" /> {saved ? "Salvo no histórico" : "Salvar resultado"}
            </button>
            <Link to="/historico" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              Ver histórico
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}