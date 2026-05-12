import { motion } from "framer-motion";
import farmer from "@/assets/farmer-hands.jpg";
import flour from "@/assets/story-flour.jpg";
import moringa from "@/assets/prod-moringa.jpg";

const services = [
  {
    img: farmer,
    tag: "Sourcing",
    title: "Farm-traced harvests",
    desc: "Single-origin lots from Indian smallholders. Each pack lists the farm, state and harvest week — verifiable by QR.",
    cta: "How we source",
  },
  {
    img: flour,
    tag: "Process",
    title: "Cold-milled & native",
    desc: "Stone-ground, sun-dried, never spray-dried, never bleached. Nutrients preserved as the grain intended.",
    cta: "Our methods",
  },
  {
    img: moringa,
    tag: "Range",
    title: "Ancient-grain revival",
    desc: "India's forgotten grains and herbal powders — properly quantified, properly labelled, and ready for everyday cooking.",
    cta: "See the range",
  },
];

export const Services = () => {
  return (
    <section id="services" className="relative overflow-hidden bg-earth py-32 text-linen">
      <div className="absolute inset-0 grain-texture opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— What We Do</span>
          <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
            From the soil to your shelf,<br />
            <em className="italic text-honey">we keep it whole.</em>
          </h2>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="group flex flex-col overflow-hidden rounded-sm bg-linen text-umber shadow-soft"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-honey px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ink">
                  {s.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-2xl font-light leading-snug">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-earth">{s.desc}</p>
                <button className="mt-6 inline-flex w-fit items-center gap-2 rounded-sm bg-umber px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-linen transition-all group-hover:bg-honey group-hover:text-ink">
                  {s.cta} →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
