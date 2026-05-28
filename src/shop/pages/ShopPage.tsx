import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { shopApi } from "../api/shop";
import { useCart } from "../context/CartContext";
import { formatRupee } from "../utils/currency";
import flat from "@/assets/products-flat.jpg";

export default function ShopPage() {
  const { data } = useQuery({ queryKey: ["shop", "products"], queryFn: () => shopApi.listProducts({ limit: 100 }) });
  const { addItem } = useCart();

  useEffect(() => {
    document.title = "Shop — The Nature's Way";
  }, []);

  const products = data?.items ?? [];

  return (
    <main className="min-h-screen bg-linen">
      <Nav />
      <PageHero
        crumb="Shop"
        eyebrow="Single-Origin Pantry"
        title={<>Shop harvest lots, <em className="italic text-honey">never blends.</em></>}
        subtitle="Every product is priced per lot and tied to a single farm record. What you pay is what the farm earned." 
        image={flat}
      />

      <section className="bg-linen py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <article key={p._id} className="group overflow-hidden rounded-sm border border-umber/10 bg-linen shadow-soft">
                <div className="aspect-[4/3] bg-grain" />
                <div className="p-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-honey">{p.category}</div>
                  <h3 className="mt-2 font-display text-2xl text-umber">{p.name}</h3>
                  <p className="mt-2 text-sm text-earth/70 line-clamp-2">{p.description || ""}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-display text-xl text-umber">{formatRupee(p.price)}</span>
                    <Button size="sm" onClick={() => addItem(p, 1)}>Add to cart</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
