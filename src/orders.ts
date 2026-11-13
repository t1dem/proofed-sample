// No backend in the demo: orders live in this browser only.
import type { CartLine } from "./pricing";

export type Order = { id: string; email: string; total: number; lines: CartLine[] };

const key = (id: string) => `tostado-order-${id}`;

export function saveOrder(order: Omit<Order, "id">) {
  const id = `TS-${Math.floor(1000 + Math.random() * 9000)}`;
  try {
    localStorage.setItem(key(id), JSON.stringify({ ...order, id }));
  } catch {
    // Without storage the confirmation page just can't show details.
  }
  return id;
}

export function loadOrder(id: string): Order | undefined {
  try {
    const raw = localStorage.getItem(key(id));
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}
