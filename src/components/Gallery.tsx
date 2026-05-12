import { motion } from "framer-motion";
import turmeric from "@/assets/prod-turmeric.jpg";
import dates from "@/assets/prod-dates.jpg";
import seeds from "@/assets/prod-seeds.jpg";
import moringa from "@/assets/prod-moringa.jpg";
import flour from "@/assets/story-flour.jpg";
import flat from "@/assets/products-flat.jpg";

const items = [
  { img: turmeric, t: "Turmeric Root", c: "Single-origin · Erode" },
  { img: dates, t: "Khajoor Reserve", c: "Sun-dried · No glucose" },
  { img: seeds, t: "Mixed Seed Blend", c: "Cold-stored · 7 seeds" },
  { img: moringa, t: "Moringa Leaf Powder", c: "Shade-dried · Tamil Nadu" },
  { img: flour, t: "7-Grain Atta", c: "Stone-milled · Solapur" },
  { img: flat, t: "Pantry Essentials", c: "Linen-pouched · Sealed" },
];

export const Gallery = () => {
  return (
    <section id="gallery" className="relative bg-linen py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— A Closer Look</span>
            <h2 className="mt-6 font-display text-5xl font-light leading-tight text-umber md:text-6xl">
              Real products,<br /><em className="italic">real ingredients.</em>
            </h2>
          </div>
          <a href="#range" className="rounded-sm border border-umber/30 px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-umber transition-all hover:border-honey hover:bg-honey/10">
            View all 80+ →
          </a>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group relative overflow-hidden rounded-sm bg-ink shadow-soft"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={it.img}
                  alt={it.t}
                  loading="lazy"
                  width={900}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 pt-16">
                <div className="text-[10px] uppercase tracking-[0.3em] text-honey">{it.c}</div>
                <h3 className="mt-1 font-display text-2xl text-linen">{it.t}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
