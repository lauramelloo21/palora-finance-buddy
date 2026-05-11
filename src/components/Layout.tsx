import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, TrendingUp } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/servicos", label: "Serviços" },
  { to: "/analise", label: "Análise" },
  { to: "/historico", label: "Histórico" },
  { to: "/dicas", label: "Dicas" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">Palora<span className="text-primary"> Finance</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  pathname === l.to ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button className="lg:hidden p-2 rounded-md hover:bg-secondary" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open && (
          <nav className="lg:hidden border-t border-border bg-background/95 px-6 py-3 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm ${
                  pathname === l.to ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md" style={{ background: "var(--gradient-primary)" }} />
              <span className="font-semibold">Palora Finance</span>
            </div>
            <p className="text-muted-foreground">Organize hoje. Cresça amanhã.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Navegação</h4>
            <ul className="space-y-1 text-muted-foreground">
              {navLinks.map((l) => (
                <li key={l.to}><Link to={l.to} className="hover:text-primary">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contato</h4>
            <p className="text-muted-foreground">contato@palora.finance</p>
            <p className="text-muted-foreground">+55 (11) 4002-8922</p>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Palora Finance. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}