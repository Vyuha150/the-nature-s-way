import type { Product } from "../api/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Builds a cart-compatible product from static catalogue content shown on the
 * marketing pages, so every product on the site can be added to the cart.
 */
export function makeLocalProduct(input: {
  name: string;
  category: string;
  price: number;
  description?: string;
  stock?: number;
}): Product {
  const now = new Date().toISOString();
  return {
    _id: `local-${slugify(input.name)}`,
    name: input.name,
    category: input.category,
    price: input.price,
    stock: input.stock ?? 25,
    status: "Active",
    description: input.description ?? "",
    createdAt: now,
    updatedAt: now,
  };
}
