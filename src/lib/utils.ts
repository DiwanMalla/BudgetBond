import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(dateObj);
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function calculateTotal(
  items: { price: number; quantity: number }[]
): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function splitBillEqually(total: number, members: number): number {
  return total / members;
}

export function splitBillByShares(
  total: number,
  shares: Record<string, number>
): Record<string, number> {
  const totalShares = Object.values(shares).reduce(
    (sum, share) => sum + share,
    0
  );
  const result: Record<string, number> = {};

  for (const [userId, share] of Object.entries(shares)) {
    result[userId] = (total * share) / totalShares;
  }

  return result;
}

export function getItemStatusColor(status: string): string {
  switch (status) {
    case "To Buy":
      return "#EF4444";
    case "At Home":
      return "#10B981";
    case "Purchased":
      return "#3B82F6";
    case "Postponed":
      return "#6B7280";
    default:
      return "#9CA3AF";
  }
}

export function calculateGroupBalance(
  payments: { fromUser: string; toUser: string; amount: number }[]
): Record<string, number> {
  const balances: Record<string, number> = {};

  payments.forEach((payment) => {
    balances[payment.fromUser] =
      (balances[payment.fromUser] || 0) - payment.amount;
    balances[payment.toUser] = (balances[payment.toUser] || 0) + payment.amount;
  });

  return balances;
}

export function optimizePayments(
  balances: Record<string, number>
): { from: string; to: string; amount: number }[] {
  const creditors = Object.entries(balances).filter(
    ([, balance]) => balance > 0
  );
  const debtors = Object.entries(balances).filter(([, balance]) => balance < 0);
  const payments: { from: string; to: string; amount: number }[] = [];

  let creditorIndex = 0;
  let debtorIndex = 0;

  while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
    const [creditorId, creditorBalance] = creditors[creditorIndex];
    const [debtorId, debtorBalance] = debtors[debtorIndex];

    const amount = Math.min(creditorBalance, Math.abs(debtorBalance));

    payments.push({
      from: debtorId,
      to: creditorId,
      amount: Number(amount.toFixed(2)),
    });

    creditors[creditorIndex][1] -= amount;
    debtors[debtorIndex][1] += amount;

    if (creditors[creditorIndex][1] === 0) creditorIndex++;
    if (debtors[debtorIndex][1] === 0) debtorIndex++;
  }

  return payments;
}
