import { createFileRoute } from "@tanstack/react-router";
import { TrendingDown, ListChecks, Target, LineChart, PiggyBank, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/dicas")({
  head: () => ({
    meta: [
      { title: "Dicas Financeiras — Palora Finance" },
      { name: "description", content: "Sugestões práticas para melhorar a saúde financeira da sua empresa." },
    ],
  }),
  component: DicasPage,
});

const tips = [
  { icon: TrendingDown, title: "Reduzir gastos", desc: "Mapeie despesas recorrentes e elimine custos que não geram valor real para o negócio." },
  { icon: ListChecks, title: "Melhorar a organização", desc: "Centralize lançamentos e mantenha categorias claras — clareza financeira começa na rotina." },
  { icon: Target, title: "Criar metas financeiras", desc: "Estabeleça objetivos mensuráveis de margem, receita e reservas para guiar decisões." },
  { icon: LineChart, title: "Investir melhor", desc: "Reinvista parte do lucro em ativos produtivos: tecnologia, marketing e capacitação." },
  { icon: PiggyBank, title: "Reserva de emergência", desc: "Tenha pelo menos 3 meses de despesas operacionais protegidas em caixa." },
  { icon: Lightbulb, title: "Decisões com dados", desc: "Use indicadores e relatórios para basear decisões — intuição é apoio, não rota." },
];

function DicasPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-2xl">
        <span className="text-sm text-primary font-medium">Dicas Financeiras</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">Boas práticas para crescer com saúde</h1>
        <p className="mt-4 text-muted-foreground text-lg">Pequenos hábitos que transformam a gestão financeira da sua empresa.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {tips.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
            <h3 className="mt-4 font-semibold text-lg">{title}</h3>
            <p className="text-muted-foreground mt-2 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}