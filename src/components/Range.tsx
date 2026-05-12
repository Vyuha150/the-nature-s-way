import { motion } from "framer-motion";
import flat from "@/assets/products-flat.jpg";

const categories = [
  {
    name: "Whole Grain & Flour Bases",
    items: ["Ancient grain flour blend (7-grain)", "Stone-ground bajra flour", "Sprouted ragi powder", "Certified amaranth grain pack", "Foxtail millet breakfast grain", "Barnyard millet khichdi mix", "Cold-milled jowar atta"],
  },
  {
    name: "Seed, Nut & Dry Fruit Packs",
    items: ["Traceable mixed seed pack", "Wildcraft walnut halves", "Cold-pressed flaxseed mix", "Activated almond pouch", "Sundried apricot (no sulfur)", "Organic raisin + nut trail mix", "Premium pumpkin seed pack"],
  },
  {
    name: "Herbal & Functional Powders",
    items: ["Amla powder (cold-processed)", "Moringa leaf powder (farm-traced)", "Ashwagandha root extract", "Shatavari women's blend", "Triphala daily powder", "Brahmi cognitive blend", "Giloy immunity powder"],
  },
  {
    name: "Ready Mixes & Premixes",
    items: ["Sprouted dal soup premix", "Whole grain dosa batter mix", "Ancient grain porridge blend", "High-fiber idli premix", "Overnight oats kit", "Sattu energy drink mix", "Multigrain chilla mix"],
  },
  {
    name: "Snacks & Bars",
    items: ["Whole seed chikki (jaggery-bound)", "Date + nut energy ball pack", "Baked jowar puffs", "Activated seed cracker", "Dried fig + walnut bar", "Roasted makhana (no oil)", "Spirulina energy bite"],
  },
  {
    name: "Beverages & Elixirs",
    items: ["Cold-pressed amla shot", "Moringa + ginger green drink", "Ashwagandha oat latte mix", "Beetroot + carrot juice blend", "Tulsi + ginger immunity brew", "Hibiscus herbal cooler", "Turmeric golden milk blend"],
  },
  {
    name: "Pastes, Butters & Condiments",
    items: ["Stone-ground til (sesame) paste", "Raw groundnut butter (unroasted)", "Whole fruit amla preserve", "Wild honey (single-origin)", "Kokum concentrate (no sugar)", "Tamarind date chutney (clean)", "Moringa pesto"],
  },
];

export const Range = () => {
  return (
    <section id="range" className="relative bg-linen py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— Full Product Universe</span>
            <h2 className="mt-6 font-display text-5xl font-light leading-tight text-umber md:text-7xl">
              Eighty things,<br /><em className="italic">one promise.</em>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden rounded-sm shadow-soft">
              <img src={flat} alt="Linen pouches of grains, seeds and nuts" className="h-72 w-full object-cover" loading="lazy" width={1400} height={1000} />
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-2">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
              className="border-t border-umber/15 pt-6"
            >
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-honey" />
                <h3 className="font-display text-2xl text-umber">{c.name}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.items.map((it) => (
                  <span
                    key={it}
                    className="cursor-default rounded-full border border-umber/20 bg-linen px-4 py-2 text-xs text-earth transition-all hover:border-honey hover:bg-honey/10 hover:text-umber"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
