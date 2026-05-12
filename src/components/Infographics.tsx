import { motion } from "framer-motion";
import { Sprout, Tractor, FlaskConical, Truck, Store, Soup } from "lucide-react";

const stats = [
  { n: "80+", l: "Single-origin SKUs", i: Store },
  { n: "120", l: "Partner farms", i: Tractor },
  { n: "0", l: "Synthetic additives", i: FlaskConical },
  { n: "100%", l: "QR-traceable packs", i: Soup },
];

const journey = [
  { i: Sprout, t: "Sown", d: "Native seeds, organic soil" },
  { i: Tractor, t: "Harvested", d: "By the family that grew it" },
  { i: FlaskConical, t: "Processed", d: "Cold-milled, sun-cured" },
  { i: Truck, t: "Transported", d: "Sealed, dated, tracked" },
  { i: Store, t: "Shelved", d: "Front-label honesty" },
  { i: Soup, t: "Cooked", d: "In your kitchen, whole" },
];

export const Infographics = () => {
  return (
    <section className="relative overflow-hidden bg-ink py-32 text-linen">
      <div className="absolute inset-0 grain-texture opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Stats row */}
        <div className="grid gap-8 border-y border-linen/10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="flex items-center gap-5"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-honey/40 text-honey">
                <s.i size={26} strokeWidth={1.4} />
              </div>
              <div>
                <div className="font-display text-5xl font-light text-honey">{s.n}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-linen/60">{s.l}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Journey infographic */}
        <div className="mt-24 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— The Honest Journey</span>
          <h2 className="mt-6 font-display text-4xl font-light md:text-5xl">
            Six stops. <em className="italic text-honey">Zero shortcuts.</em>
          </h2>
        </div>

        <div className="relative mt-16">
          {/* connector line */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-honey/40 to-transparent lg:block" />
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {journey.map((j, i) => (
              <motion.div
                key={j.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-honey/50 bg-ink text-honey transition-all hover:scale-110 hover:bg-honey hover:text-ink">
                  <j.i size={24} strokeWidth={1.4} />
                </div>
                <div className="mt-4 font-display text-lg">{j.t}</div>
                <div className="mt-1 text-xs text-linen/60">{j.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
