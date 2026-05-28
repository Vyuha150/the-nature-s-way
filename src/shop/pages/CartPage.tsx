import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "../context/CartContext";
import { formatRupee } from "../utils/currency";

export default function CartPage() {
  const { items, total, updateItem, removeItem } = useCart();

  useEffect(() => {
    document.title = "Cart — The Nature's Way";
  }, []);

  return (
    <main className="min-h-screen bg-linen">
      <Nav />
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="font-display text-4xl text-umber">Your cart</h1>
        <div className="mt-10 space-y-6">
          {items.length === 0 && (
            <div className="rounded-sm border border-umber/15 bg-grain/30 p-10 text-center text-earth/70">
              Cart empty. <Link to="/shop" className="text-honey underline">Browse products</Link>.
            </div>
          )}

          {items.map((item) => (
            <div key={item.product._id} className="flex flex-wrap items-center justify-between gap-4 border-b border-umber/10 pb-4">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-honey">{item.product.category}</div>
                <div className="font-display text-2xl text-umber">{item.product.name}</div>
                <div className="text-sm text-earth/70">{formatRupee(item.product.price)}</div>
              </div>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateItem(item.product._id, Number(e.target.value))}
                  className="h-10 w-20"
                />
                <Button variant="outline" onClick={() => removeItem(item.product._id)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xl text-umber">Total: <span className="font-display">{formatRupee(total)}</span></div>
          <Button asChild disabled={items.length === 0}>
            <Link to="/checkout">Proceed to checkout</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
