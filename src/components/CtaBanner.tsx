import { motion } from "framer-motion";

export const CtaBanner = () => {
  return (
    <section className="relative overflow-hidden bg-umber py-24 text-linen">
      <div className="absolute inset-0 grain-texture opacity-30" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-4xl px-6 text-center"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— A Quiet Revolution</span>
        <h2 className="mt-6 font-display text-4xl font-light leading-tight md:text-6xl">
          Choose food that has <em className="italic text-honey">nothing to hide.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-linen/70">
          Eighty single-origin essentials. One promise printed on the front of every pack.
          Trace your first jar today and taste what honest food feels like.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#range" className="rounded-sm bg-honey px-10 py-4 text-xs uppercase tracking-[0.3em] text-ink transition-all hover:shadow-honey">
            Start Shopping
          </a>
          <a href="#contact-form" className="rounded-sm border border-linen/30 px-10 py-4 text-xs uppercase tracking-[0.3em] text-linen transition-all hover:border-honey hover:text-honey">
            Talk to Us
          </a>
        </div>
      </motion.div>
    </section>
  );
};
