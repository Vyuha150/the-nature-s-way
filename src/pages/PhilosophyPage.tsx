import { useEffect } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Philosophy } from "@/components/Philosophy";
import flour from "@/assets/story-flour.jpg";
import { Leaf, Sun, Wind, Droplet, Mountain, Sprout } from "lucide-react";

const pillars = [
  { i: Leaf, t: "Whole, never extracted", d: "We refuse hexane, solvents and isolates. The whole leaf, the whole grain, the whole fruit — as nature shaped it." },
  { i: Sun, t: "Sun & shade dried", d: "Slow ambient drying preserves enzymes and colour. No spray towers, no industrial heat that strips life out of food." },
  { i: Wind, t: "Cold-milled, never bleached", d: "Stone wheels turning slowly. Bran and germ stay where they grew. Flour with smell, not white powder." },
  { i: Droplet, t: "Water-only washing", d: "No chlorine baths, no wax coatings, no shellac glaze. Spring water and clean cotton — that's our whole cleaning protocol." },
  { i: Mountain, t: "Region before season", d: "Amla from Pratapgarh in winter. Mangoes from Ratnagiri in May. We follow India's geography, not a year-round shelf." },
  { i: Sprout, t: "Heritage seed first", d: "Native cultivars over high-yield hybrids. Bansi wheat, sonamasuri, kala bhat — the flavour your grandmother would recognise." },
];

const PhilosophyPage = () => {
  useEffect(() => {
    document.title = "Philosophy — The Nature's Way";
  }, []);
  return (
    <main className="min-h-screen bg-linen">
      <Nav />
      <PageHero
        crumb="Philosophy"
        eyebrow="Why we exist"
        title={<>Food in its <em className="italic text-honey">native form.</em></>}
        subtitle="Most pantry brands hide the process. We publish it. Six pillars guide every batch we ship — auditable, photographable, and printed on the front of the pack."
        image={flour}
      />

      {/* Six pillars infographic */}
      <section className="bg-linen py-28 grain-texture">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— Six Pillars</span>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-light text-umber md:text-5xl">
                What we <em className="italic">will</em> and <em className="italic">won't</em> do.
              </h2>
            </div>
            <p className="max-w-md text-earth/80">
              Every pillar is a closed door. Once published, we cannot quietly walk it back.
              Photographs from the floor are uploaded weekly.
            </p>
          </div>

          <div className="grid gap-px bg-umber/10 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="group relative bg-linen p-10 transition-colors hover:bg-grain"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-honey/40 text-honey transition-all group-hover:bg-honey group-hover:text-ink">
                  <p.i size={22} strokeWidth={1.4} />
                </div>
                <h3 className="mt-6 font-display text-2xl text-umber">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-earth/85">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Philosophy />

      {/* Manifesto block */}
      <section className="bg-umber py-28 text-linen">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— The Manifesto</span>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight md:text-5xl">
            "If a grandmother can't recognise the process,<br />
            <em className="italic text-honey">we don't ship the product."</em>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-linen/70">
            Industrial food has trained us to accept what we cannot pronounce. We're rebuilding
            the shelf around things you already trust — and proving it on the label.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PhilosophyPage;
