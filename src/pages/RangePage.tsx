import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Range } from "@/components/Range";
import { Gallery } from "@/components/Gallery";
import flat from "@/assets/products-flat.jpg";
import turmeric from "@/assets/prod-turmeric.jpg";
import dates from "@/assets/prod-dates.jpg";
import seeds from "@/assets/prod-seeds.jpg";
import moringa from "@/assets/prod-moringa.jpg";
import flour from "@/assets/story-flour.jpg";
import grains from "@/assets/hero-grains.jpg";

const featured = [
  { img: turmeric, t: "Erode Turmeric Root", c: "Single-origin · 4.8% curcumin", price: "₹260" },
  { img: dates, t: "Khajoor Reserve", c: "Sun-dried · No glucose", price: "₹420" },
  { img: seeds, t: "Seven-Seed Blend", c: "Cold-stored · 250g", price: "₹310" },
  { img: moringa, t: "Moringa Leaf Powder", c: "Shade-dried · TN", price: "₹180" },
  { img: flour, t: "7-Grain Atta", c: "Stone-milled · 1kg", price: "₹240" },
  { img: grains, t: "Foxtail Millet", c: "Heritage cultivar · 500g", price: "₹150" },
  { img: flat, t: "Pantry Trial Box", c: "12 sample pouches", price: "₹990" },
  { img: turmeric, t: "Golden Milk Blend", c: "Turmeric · ginger · pepper", price: "₹280" },
];

const filters = ["All", "Flours", "Powders", "Seeds & Nuts", "Mixes", "Beverages"];

const RangePage = () => {
  const [active, setActive] = useState("All");
  useEffect(() => { document.title = "Range — The Nature's Way"; }, []);

  return (
    <main className="min-h-screen bg-linen">
      <Nav />
      <PageHero
        crumb="Range"
        eyebrow="Eighty Single-Origin Goods"
        title={<>The whole pantry, <em className="italic text-honey">unhidden.</em></>}
        subtitle="Eighty SKUs across grains, powders, seeds, mixes and elixirs — every one of them traceable to a farm, a harvest week and a milling protocol."
        image={flat}
      />

      {/* Featured grid */}
      <section className="bg-linen py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— Featured Picks</span>
              <h2 className="mt-4 font-display text-4xl font-light text-umber md:text-5xl">
                Best of the <em className="italic">harvest.</em>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-all ${
                    active === f
                      ? "border-honey bg-honey text-ink"
                      : "border-umber/20 text-earth hover:border-honey hover:text-honey"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <motion.article
                key={p.t + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                className="group cursor-pointer overflow-hidden rounded-sm border border-umber/10 bg-linen shadow-soft transition-all hover:-translate-y-1 hover:shadow-honey"
              >
                <div className="aspect-square overflow-hidden bg-grain">
                  <img src={p.img} alt={p.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-honey">{p.c}</div>
                  <h3 className="mt-2 font-display text-xl text-umber">{p.t}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-lg text-umber">{p.price}</span>
                    <Link to="/shop" className="text-[10px] uppercase tracking-[0.3em] text-earth/60 transition-colors group-hover:text-honey">
                      Shop -&gt;
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Gallery />
      <Range />

      <Footer />
    </main>
  );
};

export default RangePage;
