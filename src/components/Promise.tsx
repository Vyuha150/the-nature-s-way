import { motion } from "framer-motion";

const promises = [
  {
    n: "01",
    t: "Nothing hidden front label",
    d: "The entire ingredient list — including quantities — printed large on the front of every pack. Never hidden on the back in 6pt font.",
  },
  {
    n: "02",
    t: "Farm-to-shelf traceability",
    d: "A QR code on every pack reveals the farm name, state, harvest date, processing method and transit chain. Food you can trace.",
  },
  {
    n: "03",
    t: "Indian ancient grain revival",
    d: "The first systematic range built around India's forgotten grains — jowar, bajra, ragi, amaranth, foxtail, kodo — certified and properly quantified.",
  },
  {
    n: "04",
    t: "Seasonal & regional sourcing",
    d: "Products that change with India's agricultural seasons. Our amla powder is from the Pratapgarh winter harvest. We behave like a farmers' market, not a factory.",
  },
  {
    n: "05",
    t: "Zero-process guarantee",
    d: "A published list of everything we will never do: no spray drying, no hexane extraction, no bleaching, no irradiation, no excess nitrogen flushing.",
  },
  {
    n: "06",
    t: "Diet-system neutral",
    d: "No allegiance to keto, paleo, vegan or any prescriptive diet. We speak to people who eat a traditional mixed diet and want it cleaner and more nourishing.",
  },
];

export const Promise = () => {
  return (
    <section id="promise" className="relative bg-umber py-32 text-linen">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— The Six Covenants</span>
            <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
              The brand <em className="italic text-honey">covenants.</em>
            </h2>
            <p className="mt-6 text-linen/70">
              Six promises we publish openly. Each one designed to be auditable,
              verifiable and impossible to walk back quietly.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-px bg-linen/10 sm:grid-cols-2">
              {promises.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="group relative bg-umber p-8 transition-colors hover:bg-earth"
                >
                  <div className="font-display text-xs text-honey">USP {p.n}</div>
                  <h3 className="mt-3 font-display text-2xl font-light leading-snug">{p.t}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-linen/65">{p.d}</p>
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-honey transition-all duration-700 group-hover:w-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
