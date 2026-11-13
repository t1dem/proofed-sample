import { money, type Quote } from "../pricing";

export function Summary({ quote }: { quote: Quote }) {
  const rows = [
    ["Subtotal", money(quote.subtotal)],
    ...(quote.discount > 0 ? [["Discount", `−${money(quote.discount)}`]] : []),
    ["Shipping", quote.shipping === 0 ? "Free" : money(quote.shipping)],
  ];
  return (
    <dl className="space-y-2 tabular-nums">
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between">
          <dt className="text-muted">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
      <div className="flex justify-between border-t border-line pt-3 text-xl font-semibold">
        <dt>Total</dt>
        <dd>{money(quote.total)}</dd>
      </div>
    </dl>
  );
}
