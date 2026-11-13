// All money is integer cents, so totals never drift by a cent.
import { findProduct } from "./catalog";

export type CartLine = { id: string; qty: number };

export const SHIPPING_FEE = 490;
export const FREE_SHIPPING_FROM = 5000;

const promoCodes: Record<string, number> = {
  WELCOME10: 10,
};

export const promoPercent = (code: string) => promoCodes[code.trim().toUpperCase()] ?? 0;

export function quote(lines: CartLine[], code = "") {
  const subtotal = lines.reduce((sum, line) => sum + (findProduct(line.id)?.price ?? 0) * line.qty, 0);
  const discount = Math.round((subtotal * promoPercent(code)) / 100);
  const afterDiscount = subtotal - discount;
  const shipping = subtotal === 0 || afterDiscount >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
  return { subtotal, discount, shipping, total: afterDiscount + shipping };
}

export type Quote = ReturnType<typeof quote>;

const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
export const money = (cents: number) => eur.format(cents / 100);
