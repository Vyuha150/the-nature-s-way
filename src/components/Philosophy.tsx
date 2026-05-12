import { motion } from "framer-motion";
import flour from "@/assets/story-flour.jpg";

export const Philosophy = () => {
  return (
    <section id="philosophy" className="relative bg-linen py-32 grain-texture">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-5"
        >
          <div className="sticky top-32">
            <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— Our Philosophy</span>
            <h2 className="mt-6 font-display text-5xl font-light leading-tight text-umber md:text-6xl">
              Food in its <em className="italic">native</em> form.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-earth">
              We believe nourishment doesn't need translation. No spray drying.
              No hexane extraction. No bleaching. No nitrogen flushing beyond
              what shelf life genuinely requires.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-earth">
              What grew in the soil arrives at your kitchen — quantified,
              certified, and unhidden.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1 }}
          className="lg:col-span-7"
        >
          <div className="overflow-hidden rounded-sm shadow-soft">
            <img src={flour} alt="Stone-ground flour pouring from a wooden scoop" className="h-[600px] w-full object-cover" loading="lazy" width={1200} height={1400} />
          </div>
          <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-earth/70">
            <span>Fig. 01 — Cold-milled jowar atta</span>
            <span>Pratapgarh harvest</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
