import { useSyncExternalStore } from "react";
import type { CartLine } from "./pricing";

type CartState = { lines: CartLine[]; code: string };

const KEY = "tostado-cart";
const empty: CartState = { lines: [], code: "" };

function load(): CartState {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

let state = load();
const listeners = new Set<() => void>();

function set(next: CartState) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode: the cart still works for this tab.
  }
  listeners.forEach((l) => l());
}

export const cart = {
  add(id: string) {
    const existing = state.lines.find((l) => l.id === id);
    set({
      ...state,
      lines: existing
        ? state.lines.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
        : [...state.lines, { id, qty: 1 }],
    });
  },
  setQty(id: string, qty: number) {
    set({
      ...state,
      lines: qty <= 0 ? state.lines.filter((l) => l.id !== id) : state.lines.map((l) => (l.id === id ? { ...l, qty } : l)),
    });
  },
  applyCode(code: string) {
    set({ ...state, code });
  },
  clear() {
    set(empty);
  },
};

export function useCart() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
  );
}
