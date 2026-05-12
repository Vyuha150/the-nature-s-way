import { motion } from "framer-motion";
import farmer from "@/assets/farmer-hands.jpg";

const steps = [
  { k: "Farm", v: "Patil Family Farm, Solapur, Maharashtra" },
  { k: "Harvest", v: "March 14, 2026 — winter rabi crop" },
  { k: "Process", v: "Cold-milled, stone-ground within 48 hours" },
  { k: "Transit", v: "Refrigerated road, Solapur → Mumbai DC → You" },
];

export const Trace = () => {
  return (
    <section id="trace" className="relative overflow-hidden bg-ink text-linen">
      <div className="grid lg:grid-cols-2">
        <div className="relative h-[500px] lg:h-auto">
          <img src={farmer} alt="A farmer cradling fresh moringa and amla" className="h-full w-full object-cover" loading="lazy" width={1200} height={1400} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/60" />
        </div>

        <div className="flex items-center px-6 py-24 lg:px-16">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— Traceability</span>
            <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
              Scan the pack. <em className="italic text-honey">See the farm.</em>
            </h2>
            <p className="mt-6 text-linen/70">
              Every pack carries a unique QR code. Open your camera. Meet the
              hands that grew your food.
            </p>

            <div className="mt-12 space-y-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex gap-6 border-t border-linen/15 pt-6"
                >
                  <div className="font-display text-xs uppercase tracking-[0.3em] text-honey">0{i + 1}</div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-linen/50">{s.k}</div>
                    <div className="mt-1 font-display text-xl">{s.v}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
