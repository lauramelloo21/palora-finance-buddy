import { useState, useEffect, FormEvent } from "react";
import { Lock } from "lucide-react";

const PASSWORD = "palora2026";
const STORAGE_KEY = "palora_auth_ok";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setOk(true);
    } catch {}
    setReady(true);
  }, []);

  if (!ready) return null;
  if (ok) return <>{children}</>;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      setOk(true);
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-2xl">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
          <Lock className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-1">Palora <span className="text-primary">Finance</span></h1>
        <p className="text-sm text-muted-foreground mb-6">Acesso restrito. Digite a senha para continuar.</p>
        <input
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(""); }}
          placeholder="Senha"
          autoFocus
          className="w-full h-11 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        <button type="submit" className="mt-4 w-full h-11 rounded-lg font-medium text-primary-foreground transition-opacity hover:opacity-90" style={{ background: "var(--gradient-primary)" }}>
          Entrar
        </button>
      </form>
    </div>
  );
}