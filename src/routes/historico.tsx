import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2, FileSpreadsheet, Download, X } from "lucide-react";
import {
  clearHistory,
  getHistory,
  formatBRL,
  deleteRecord,
  exportCSV,
  type FinanceRecord,
} from "@/lib/finance-storage";

export const Route = createFileRoute("/historico")({
  head: () => ({
    meta: [
      { title: "Histórico — Palora Finance" },
      { name: "description", content: "Acompanhe a evolução financeira da sua empresa em uma planilha simples." },
    ],
  }),
  component: HistoricoPage,
});

const statusBadge: Record<FinanceRecord["status"], { label: string; color: string }> = {
  good: { label: "🟢 Bom", color: "var(--success)" },
  warning: { label: "🟡 Atenção", color: "var(--warning)" },
  bad: { label: "🔴 Prejuízo", color: "var(--destructive)" },
};

function HistoricoPage() {
  const [records, setRecords] = useState<FinanceRecord[]>([]);

  useEffect(() => { setRecords(getHistory()); }, []);

  function handleClear() {
    if (confirm("Deseja realmente limpar todo o histórico?")) {
      clearHistory();
      setRecords([]);
    }
  }

  function handleDelete(id: string) {
    deleteRecord(id);
    setRecords(getHistory());
  }

  function handleExport() {
    const csv = exportCSV(records);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `palora-finance-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const totals = records.reduce(
    (acc, r) => ({
      revenue: acc.revenue + r.revenue,
      expenses: acc.expenses + r.expenses,
      profit: acc.profit + r.profit,
    }),
    { revenue: 0, expenses: 0, profit: 0 },
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-sm text-primary font-medium">Histórico da Empresa</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">Sua planilha financeira</h1>
          <p className="mt-3 text-muted-foreground">Todos os resultados salvos da sua análise.</p>
        </div>
        {records.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button onClick={handleExport} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary hover:bg-secondary/70 text-sm">
              <Download className="w-4 h-4" /> Exportar CSV
            </button>
            <button onClick={handleClear} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary hover:bg-destructive/20 hover:border-destructive/50 text-sm">
              <Trash2 className="w-4 h-4" /> Limpar histórico
            </button>
          </div>
        )}
      </div>

      {records.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {[
            { k: "Receita acumulada", v: totals.revenue, color: "var(--foreground)" },
            { k: "Despesa acumulada", v: totals.expenses, color: "var(--foreground)" },
            { k: "Lucro acumulado", v: totals.profit, color: totals.profit >= 0 ? "var(--success)" : "var(--destructive)" },
          ].map((t) => (
            <div key={t.k} className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="text-xs text-muted-foreground">{t.k}</div>
              <div className="text-2xl font-bold tracking-tight mt-1 tabular-nums" style={{ color: t.color }}>{formatBRL(t.v)}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-2xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
        {records.length === 0 ? (
          <div className="p-16 text-center">
            <FileSpreadsheet className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 font-semibold text-lg">Nenhum registro ainda</h3>
            <p className="text-muted-foreground mt-1">Faça uma análise e salve para começar a acompanhar sua evolução.</p>
            <Link to="/analise" className="inline-flex mt-6 items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              Fazer análise
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-muted-foreground">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">Data</th>
                  <th className="text-right px-6 py-3 font-medium">Receita</th>
                  <th className="text-right px-6 py-3 font-medium">Despesas</th>
                  <th className="text-right px-6 py-3 font-medium">Lucro</th>
                  <th className="text-left px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => {
                  const s = statusBadge[r.status];
                  return (
                    <tr key={r.id} className="border-t border-border hover:bg-secondary/30">
                      <td className="px-6 py-4">{new Date(r.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}</td>
                      <td className="px-6 py-4 text-right tabular-nums">{formatBRL(r.revenue)}</td>
                      <td className="px-6 py-4 text-right tabular-nums">{formatBRL(r.expenses)}</td>
                      <td className="px-6 py-4 text-right tabular-nums font-semibold" style={{ color: s.color }}>{formatBRL(r.profit)}</td>
                      <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-md text-xs" style={{ background: "color-mix(in oklab, " + s.color + " 15%, transparent)", color: s.color }}>{s.label}</span></td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDelete(r.id)} aria-label="Excluir" className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}