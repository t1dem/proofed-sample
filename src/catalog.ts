// Tostado is a made-up roaster: every name, origin and price here is invented for the demo.
export const products = [
  {
    id: "guji",
    name: "Ethiopia Guji",
    kind: "Filter roast · 250 g",
    notes: "Peach, black tea, honey",
    price: 1450,
  },
  {
    id: "huila",
    name: "Colombia Huila",
    kind: "Filter roast · 250 g",
    notes: "Red apple, cane sugar",
    price: 1300,
  },
  {
    id: "house",
    name: "House Espresso",
    kind: "Espresso roast · 1 kg",
    notes: "Dark chocolate, hazelnut",
    price: 3800,
  },
  {
    id: "grinder",
    name: "Hand Grinder",
    kind: "Steel burrs, 40 settings",
    notes: "Grinds 20 g in under a minute",
    price: 6200,
  },
  {
    id: "kettle",
    name: "Gooseneck Kettle",
    kind: "0.9 L, stovetop",
    notes: "Slow, steady pour for V60",
    price: 4500,
  },
  {
    id: "filters",
    name: "Paper Filters",
    kind: "V60 size 02 · 100 pcs",
    notes: "Unbleached",
    price: 650,
  },
] as const;

export type Product = (typeof products)[number];
export type ProductId = Product["id"];

export const findProduct = (id: string) => products.find((p) => p.id === id);
