export type FinanceStatus = "good" | "warning" | "bad";

export interface FinanceRecord {
  id: string;
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
  status: FinanceStatus;
}

const KEY = "palora_finance_history_v1";

export function getHistory(): FinanceRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveRecord(r: FinanceRecord) {
  const list = [r, ...getHistory()];
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}

export function deleteRecord(id: string) {
  const list = getHistory().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function exportCSV(records: FinanceRecord[]): string {
  const header = "Data;Receita;Despesas;Lucro;Status";
  const rows = records.map(
    (r) =>
      `${new Date(r.date).toLocaleDateString("pt-BR")};${r.revenue.toFixed(2)};${r.expenses.toFixed(2)};${r.profit.toFixed(2)};${r.status}`,
  );
  return [header, ...rows].join("\n");
}

export function statusFor(profit: number, revenue: number): FinanceStatus {
  if (profit < 0) return "bad";
  if (revenue === 0) return "warning";
  const margin = profit / revenue;
  if (margin >= 0.2) return "good";
  return "warning";
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}