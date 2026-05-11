import { createFileRoute } from "@tanstack/react-router";
import { Wallet, Target, PieChart, Briefcase } from "lucide-react";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Palora Finance" },
      { name: "description", content: "Controle financeiro digital, planejamento, análise de lucro e consultoria especializada." },
    ],
  }),
  component: ServicosPage,
});

const services = [
  { icon: Wallet, title: "Controle financeiro digital", desc: "Centralize receitas, despesas e fluxo de caixa em uma plataforma única e moderna." },
  { icon: Target, title: "Planejamento financeiro", desc: "Defina metas, projete cenários e construa um plano financeiro alinhado ao crescimento." },
  { icon: PieChart, title: "Análise de lucro e despesas", desc: "Indicadores claros para identificar onde sua empresa ganha — e onde está perdendo." },
  { icon: Briefcase, title: "Consultoria financeira", desc: "Especialistas para apoiar decisões estratégicas e estruturar a saúde financeira do negócio." },
];

function ServicosPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-2xl">
        <span className="text-sm text-primary font-medium">Nossos serviços</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">Soluções para cada etapa do seu negócio</h1>
        <p className="mt-4 text-muted-foreground text-lg">Da rotina financeira ao planejamento estratégico — tudo o que sua empresa precisa em um só lugar.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {services.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-8 hover:border-primary/60 hover:-translate-y-1 transition-all" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ background: "var(--gradient-primary)" }}>
              <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground mt-2">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}