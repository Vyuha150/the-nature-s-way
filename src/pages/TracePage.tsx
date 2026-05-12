import { useEffect } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Trace } from "@/components/Trace";
import farmer from "@/assets/farmer-hands.jpg";
import { QrCode, MapPin, Calendar, Truck, FileCheck, ScanLine } from "lucide-react";

const steps = [
  { i: QrCode, t: "Scan", d: "Open your phone camera. The QR on every pack is unique to its batch." },
  { i: MapPin, t: "Locate", d: "See the farm pinned on the map — name, district, soil type, elevation." },
  { i: Calendar, t: "Date", d: "View the harvest week, the milling day, and the warehouse arrival timestamp." },
  { i: FileCheck, t: "Audit", d: "Download the lab report — moisture, micro, pesticide residue, heavy metals." },
  { i: Truck, t: "Transit", d: "Trace the cold chain leg-by-leg, from village collection to your kitchen." },
  { i: ScanLine, t: "Verify", d: "Cross-check the seed lot, the farmer signature and the cultivar register." },
];

const TracePage = () => {
  useEffect(() => { document.title = "Trace — The Nature's Way"; }, []);
  return (
    <main className="min-h-screen bg-linen">
      <Nav />
      <PageHero
        crumb="Trace"
        eyebrow="Farm-to-Shelf"
        title={<>Scan the pack. <em className="italic text-honey">Meet the farm.</em></>}
        subtitle="Every pouch carries a QR code that opens a public dossier — farm photos, harvest dates, lab reports, transit logs. Nothing about your food should be a mystery."
        image={farmer}
      />

      {/* QR demo card */}
      <section className="bg-linen py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-sm bg-ink p-12 shadow-soft"
          >
            <div className="absolute inset-4 rounded-sm border border-honey/30" />
            <div className="grid h-full w-full grid-cols-12 grid-rows-12 gap-1">
              {Array.from({ length: 144 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: Math.random() > 0.45 ? 1 : 0.05 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.005 }}
                  className="rounded-sm bg-honey"
                />
              ))}
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] uppercase tracking-[0.4em] text-honey">
              Batch · JW-1024
            </div>
          </motion.div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— Try It</span>
            <h2 className="mt-4 font-display text-4xl font-light text-umber md:text-5xl">
              The first <em className="italic">honest</em> QR in Indian pantry.
            </h2>
            <p className="mt-6 text-earth/80">
              Most QR codes route to a marketing page. Ours routes to a public ledger entry — the
              farmer's name, the lab's signature, the cold-chain log. If a row is missing, the pack
              cannot leave the warehouse.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full border border-honey/40 px-4 py-2 text-xs text-earth">Public dossier</div>
              <div className="rounded-full border border-honey/40 px-4 py-2 text-xs text-earth">Lab report PDF</div>
              <div className="rounded-full border border-honey/40 px-4 py-2 text-xs text-earth">Farm photos</div>
              <div className="rounded-full border border-honey/40 px-4 py-2 text-xs text-earth">Cold-chain log</div>
            </div>
          </div>
        </div>
      </section>

      {/* Six steps */}
      <section className="bg-grain py-28 grain-texture">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— The Trace Flow</span>
            <h2 className="mt-4 font-display text-4xl font-light text-umber md:text-5xl">
              Six taps. <em className="italic">Total clarity.</em>
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="group relative rounded-sm border border-umber/15 bg-linen p-8 transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="absolute right-6 top-6 font-display text-5xl font-light text-honey/30">
                  0{i + 1}
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-honey/40 text-honey transition-all group-hover:bg-honey group-hover:text-ink">
                  <s.i size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-display text-2xl text-umber">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-earth/80">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Trace />
      <Footer />
    </main>
  );
};

export default TracePage;
