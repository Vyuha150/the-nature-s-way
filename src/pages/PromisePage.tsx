import { useEffect } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Promise as PromiseSection } from "@/components/Promise";
import services from "@/assets/services-trio.jpg";
import { CheckCircle2, XCircle } from "lucide-react";

const yes = [
  "Whole-form ingredients", "Front-label quantities", "QR farm trace", "Stone milling",
  "Sun & shade drying", "Heritage cultivars", "Glass & linen packs", "Seasonal lots",
];
const no = [
  "Spray drying", "Hexane extraction", "Bleaching agents", "Refined sugars",
  "Synthetic flavours", "Maltodextrin fillers", "Irradiation", "Excess nitrogen flushing",
];

const PromisePage = () => {
  useEffect(() => { document.title = "Promise — The Nature's Way"; }, []);
  return (
    <main className="min-h-screen bg-linen">
      <Nav />
      <PageHero
        crumb="Promise"
        eyebrow="Six Covenants"
        title={<>Promises we <em className="italic text-honey">cannot</em> walk back.</>}
        subtitle="Every covenant is published openly, audited yearly, and printed on every pack. If we ever break one, you'll see it on the front of the next batch."
        image={services}
      />

      <PromiseSection />

      {/* YES / NO ledger */}
      <section className="bg-linen py-28 grain-texture">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— The Open Ledger</span>
            <h2 className="mt-4 font-display text-4xl font-light text-umber md:text-5xl">
              What goes in. <em className="italic">What never does.</em>
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-sm border border-umber/10 bg-grain/40 p-10"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-honey" />
                <h3 className="font-display text-2xl text-umber">Always</h3>
              </div>
              <ul className="mt-8 space-y-3">
                {yes.map((y, i) => (
                  <motion.li
                    key={y}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3 border-b border-umber/10 pb-3 text-earth"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-honey" />
                    {y}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-sm border border-umber/30 bg-ink p-10 text-linen"
            >
              <div className="flex items-center gap-3">
                <XCircle className="text-honey" />
                <h3 className="font-display text-2xl">Never</h3>
              </div>
              <ul className="mt-8 space-y-3">
                {no.map((n, i) => (
                  <motion.li
                    key={n}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3 border-b border-linen/10 pb-3 text-linen/80 line-through decoration-honey/60"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-honey" />
                    {n}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PromisePage;
