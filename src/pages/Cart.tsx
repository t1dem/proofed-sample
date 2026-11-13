import { useState } from "react";
import { findProduct } from "../catalog";
import { cart, useCart } from "../cart";
import { money, promoPercent, quote } from "../pricing";
import { linkTo } from "../router";
import { Summary } from "./Summary";

export function Cart() {
  const { lines, code } = useCart();
  const [draft, setDraft] = useState(code);
  const [rejected, setRejected] = useState(false);

  if (lines.length === 0) {
    return (
      <section className="py-16">
        <h1 className="font-serif text-4xl">Your bag is empty</h1>
        <a {...linkTo("/")} className="mt-6 inline-block font-medium text-roast underline underline-offset-4">
          Back to the shop
        </a>
      </section>
    );
  }

  const apply = () => {
    const ok = promoPercent(draft) > 0;
    setRejected(!ok);
    cart.applyCode(ok ? draft : "");
  };

  return (
    <section className="grid gap-12 pt-6 lg:grid-cols-[1fr_22rem]">
      <div>
        <h1 className="font-serif text-4xl">Your bag</h1>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {lines.map((line) => {
            const p = findProduct(line.id);
            if (!p) return null;
            return (
              <li key={line.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
                <div>
                  <p className="font-serif text-xl">{p.name}</p>
                  <p className="text-muted">{money(p.price)} each</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Remove one ${p.name}`}
                    onClick={() => cart.setQty(line.id, line.qty - 1)}
                    className="size-11 rounded-full border border-line text-xl hover:border-ink"
                  >
                    −
                  </button>
                  <span className="w-6 text-center tabular-nums" aria-label="Quantity">
                    {line.qty}
                  </span>
                  <button
                    type="button"
                    aria-label={`Add one more ${p.name}`}
                    onClick={() => cart.setQty(line.id, line.qty + 1)}
                    className="size-11 rounded-full border border-line text-xl hover:border-ink"
                  >
                    +
                  </button>
                  <span className="w-24 text-right font-medium tabular-nums">{money(p.price * line.qty)}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="space-y-8 lg:pt-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            apply();
          }}
        >
          <label htmlFor="code" className="font-medium">
            Promo code
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="code"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="min-h-11 w-full rounded-lg border border-line bg-white/60 px-3 uppercase outline-none focus:border-ink"
            />
            <button type="submit" className="min-h-11 rounded-lg border border-ink px-4 font-medium hover:bg-ink hover:text-paper">
              Apply
            </button>
          </div>
          {rejected && <p className="mt-2 text-roast">That code doesn't work.</p>}
          {code && !rejected && <p className="mt-2 text-muted">{code.toUpperCase()} applied.</p>}
        </form>

        <Summary quote={quote(lines, code)} />

        <a
          {...linkTo("/checkout")}
          className="flex min-h-12 items-center justify-center rounded-full bg-roast px-6 font-semibold text-white hover:brightness-110"
        >
          Checkout
        </a>
      </aside>
    </section>
  );
}
