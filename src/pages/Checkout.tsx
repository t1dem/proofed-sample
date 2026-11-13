import { cart, useCart } from "../cart";
import { quote } from "../pricing";
import { linkTo, navigate } from "../router";
import { saveOrder } from "../orders";
import { Summary } from "./Summary";

const fields = [
  { name: "name", label: "Full name", autoComplete: "name" },
  { name: "email", label: "Email", autoComplete: "email", type: "email" },
  { name: "address", label: "Street address", autoComplete: "street-address" },
  { name: "city", label: "City", autoComplete: "address-level2" },
] as const;

export function Checkout() {
  const { lines, code } = useCart();
  const q = quote(lines, code);

  if (lines.length === 0) {
    return (
      <section className="py-16">
        <h1 className="font-serif text-4xl">Nothing to check out</h1>
        <a {...linkTo("/")} className="mt-6 inline-block font-medium text-roast underline underline-offset-4">
          Back to the shop
        </a>
      </section>
    );
  }

  return (
    <form
      className="grid gap-12 pt-6 lg:grid-cols-[1fr_22rem]"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const id = saveOrder({ email: String(data.get("email")), total: q.total, lines });
        cart.clear();
        navigate(`/order/${id}`);
      }}
    >
      <div>
        <h1 className="font-serif text-4xl">Checkout</h1>
        <div className="mt-6 space-y-5">
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="font-medium">
                {f.label}
              </label>
              <input
                id={f.name}
                name={f.name}
                type={"type" in f ? f.type : "text"}
                autoComplete={f.autoComplete}
                required
                className="mt-2 min-h-11 w-full rounded-lg border border-line bg-white/60 px-3 outline-none focus:border-ink"
              />
            </div>
          ))}
        </div>
      </div>
      <aside className="space-y-8 lg:pt-16">
        <Summary quote={q} />
        <button type="submit" className="min-h-12 w-full rounded-full bg-roast px-6 font-semibold text-white hover:brightness-110">
          Place order
        </button>
      </aside>
    </form>
  );
}
