import { products } from "../catalog";
import { cart } from "../cart";
import { FREE_SHIPPING_FROM, money } from "../pricing";

export function Shop() {
  return (
    <>
      <section className="border-b border-line pb-12 pt-10 sm:pt-16">
        <h1 className="max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">
          Roasted on Tuesday, in your mailbox by Friday.
        </h1>
        <p className="mt-5 max-w-xl text-muted">
          Three coffees and the gear we brew them with. Free shipping from {money(FREE_SHIPPING_FROM)}.
        </p>
      </section>

      <ul className="divide-y divide-line">
        {products.map((p) => (
          <li key={p.id} className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 py-7 sm:grid-cols-[1fr_8rem_9rem]">
            <div>
              <h2 className="font-serif text-2xl">{p.name}</h2>
              <p className="mt-1 text-muted">
                {p.kind} · {p.notes}
              </p>
            </div>
            <p className="text-right text-lg font-medium tabular-nums">{money(p.price)}</p>
            <button
              type="button"
              onClick={() => cart.add(p.id)}
              aria-label={`Add ${p.name} to bag`}
              className="col-span-2 min-h-11 rounded-full border border-ink px-5 font-medium transition-colors hover:bg-ink hover:text-paper sm:col-span-1"
            >
              Add to bag
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
