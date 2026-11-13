import { loadOrder } from "../orders";
import { money } from "../pricing";
import { linkTo } from "../router";

export function Order({ id }: { id: string }) {
  const order = loadOrder(id);
  return (
    <section className="max-w-2xl py-16">
      <h1 className="font-serif text-4xl sm:text-5xl">Thanks, your order {id} is in.</h1>
      {order && (
        <p className="mt-5 text-lg">
          We charged <strong className="tabular-nums">{money(order.total)}</strong> and sent the receipt to {order.email}.
        </p>
      )}
      <a {...linkTo("/")} className="mt-8 inline-block font-medium text-roast underline underline-offset-4">
        Back to the shop
      </a>
    </section>
  );
}
