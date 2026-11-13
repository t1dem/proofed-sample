import { useCart } from "./cart";
import { linkTo, usePath } from "./router";
import { Shop } from "./pages/Shop";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Order } from "./pages/Order";

function Page({ path }: { path: string }) {
  if (path === "/cart") return <Cart />;
  if (path === "/checkout") return <Checkout />;
  if (path.startsWith("/order/")) return <Order id={path.slice("/order/".length)} />;
  return <Shop />;
}

export function App() {
  const path = usePath();
  const { lines } = useCart();
  const count = lines.reduce((n, l) => n + l.qty, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8">
      <header className="flex items-center justify-between py-6">
        <a {...linkTo("/")} className="font-serif text-2xl font-semibold tracking-tight">
          Tostado
        </a>
        <a {...linkTo("/cart")} className="py-2 font-medium hover:text-roast">
          Bag ({count})
        </a>
      </header>
      <main className="pb-24">
        <Page path={path} />
      </main>
    </div>
  );
}
