import { motion } from "framer-motion";
import { Gift, Leaf, Tag, Truck, Sparkles } from "lucide-react";

const offers = [
  { text: "Loyalty Member? Earn 1 Point per ₹10 spent", icon: Sparkles, highlight: true },
  { text: "Use NATURE10 · Flat 10% off above ₹500", icon: Tag, highlight: true },
  { text: "Subscribe & Save · Extra 15% on recurring orders", icon: Gift, highlight: true },
  { text: "Foxtail Millet — New Harvest", icon: Leaf, highlight: false },
  { text: "First Order Free Shipping · Code WELCOME", icon: Truck, highlight: true },
  { text: "7-Grain Atta — Stone-ground", icon: Leaf, highlight: false },
  { text: "Refer a Friend · Both get ₹100 off", icon: Gift, highlight: true },
  { text: "Moringa Leaf — Shade-dried", icon: Leaf, highlight: false },
  { text: "Member Exclusive · Early access to new harvests", icon: Sparkles, highlight: true },
  { text: "Khajoor Reserve — Tree-ripened", icon: Leaf, highlight: false },
  { text: "Seven-Seed Blend — Cold-stored", icon: Leaf, highlight: false },
];

export const OffersTicker = () => {
  return (
    <section className="relative overflow-hidden border-y border-honey/20 bg-umber py-8 text-linen">
      <div className="pointer-events-none absolute inset-0 grain-texture opacity-15" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-umber via-transparent to-umber" />

      <div className="relative mx-auto mb-5 max-w-7xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-honey/30 bg-honey/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-honey">
          <Gift size={12} /> Member Perks & Offers
        </span>
      </div>

      <div className="relative flex overflow-hidden">
        {[0, 1].map((dup) => (
          <motion.div
            key={dup}
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex shrink-0 items-center"
          >
            {offers.map((o) => {
              const Icon = o.icon;
              return (
                <span
                  key={o.text + dup}
                  className={`mx-3 flex items-center gap-3 rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    o.highlight
                      ? "border-honey/40 bg-honey text-ink shadow-[0_0_22px_rgba(234,179,8,0.35)]"
                      : "border-linen/15 bg-linen/[0.04] text-linen/90 hover:border-honey/30 hover:text-honey"
                  }`}
                >
                  <Icon size={13} strokeWidth={1.5} />
                  {o.text}
                </span>
              );
            })}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
