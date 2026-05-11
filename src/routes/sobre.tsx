import { createFileRoute } from "@tanstack/react-router";
import { Compass, Eye, Heart } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Palora Finance" },
      { name: "description", content: "Missão, visão e valores da Palora Finance." },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <span className="text-sm text-primary font-medium">Sobre nós</span>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">Tecnologia financeira, com propósito.</h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
        A Palora Finance nasceu para democratizar o acesso ao controle financeiro empresarial. Acreditamos que toda empresa — independente do porte — merece tomar decisões com clareza, dados e segurança.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {[
          { icon: Compass, title: "Missão", desc: "Tornar a gestão financeira simples, acessível e estratégica para empresas de todos os tamanhos." },
          { icon: Eye, title: "Visão", desc: "Ser a plataforma de referência em inteligência financeira para empresas no Brasil." },
          { icon: Heart, title: "Valores", desc: "Transparência, simplicidade, segurança, inovação e compromisso com o cliente." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-6">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: "var(--gradient-primary)" }}>
              <Icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-muted-foreground mt-2 text-sm">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border p-10" style={{ background: "var(--gradient-hero)" }}>
        <h2 className="text-2xl font-bold tracking-tight">Nosso propósito</h2>
        <p className="mt-3 text-muted-foreground max-w-3xl">
          Construímos um sistema que une cálculo, análise e histórico em uma experiência fluida — para que empreendedores e gestores entendam, em segundos, como sua empresa está performando e por onde ela pode crescer.
        </p>
      </div>
    </div>
  );
}