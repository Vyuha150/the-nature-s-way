import { useNavigate } from "react-router-dom";
import { ShoppingBag, Zap } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "../api/types";
import { useCart } from "../context/CartContext";

type Props = {
  product: Product;
  tone?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
};

export const ProductActions = ({ product, tone = "light", size = "md", className = "" }: Props) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const pad = size === "sm" ? "px-3 py-2 text-[9px]" : "px-4 py-2.5 text-[10px]";

  const outline =
    tone === "dark"
      ? "border-linen/25 text-linen/85 hover:border-honey hover:text-honey"
      : "border-umber/25 text-earth hover:border-honey hover:text-umber";

  const add = () => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const buyNow = () => {
    addItem(product, 1);
    navigate("/checkout");
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        onClick={add}
        aria-label={`Add ${product.name} to cart`}
        className={`inline-flex items-center gap-2 rounded-full border uppercase tracking-[0.2em] transition-all ${outline} ${pad}`}
      >
        <ShoppingBag size={12} />
        Add to cart
      </button>
      <button
        onClick={buyNow}
        aria-label={`Buy ${product.name} now`}
        className={`inline-flex items-center gap-2 rounded-full border border-honey bg-honey uppercase tracking-[0.2em] text-ink transition-all hover:bg-honey/85 ${pad}`}
      >
        <Zap size={12} />
        Buy now
      </button>
    </div>
  );
};
