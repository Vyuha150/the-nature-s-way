import { motion } from "framer-motion";
import hero from "@/assets/hero-grains.jpg";
import { Logo } from "./Logo";

export const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ink text-linen">
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img src={hero} alt="A bowl of organic grains, nuts and dried fruits" className="h-full w-full object-cover opacity-70" width={1600} height={1200} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/30 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 pb-16 pt-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-6 flex items-center gap-3 text-honey"
          >
            <Logo tone="honey" className="h-6 w-6" />
            <span className="text-[10px] uppercase tracking-[0.4em]">Est. From The Earth</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-display text-6xl font-light leading-[0.95] text-balance md:text-8xl lg:text-[8.5rem]"
          >
            Nothing<br />
            <em className="italic text-honey">Hidden.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 max-w-xl text-lg font-light leading-relaxed text-linen/80"
          >
            Only conventional, natural and organic consumables — in their native form,
            close to nature. Every ingredient, every quantity, printed plainly on the front.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#range" className="group relative overflow-hidden rounded-sm bg-honey px-8 py-4 text-xs uppercase tracking-[0.25em] text-ink transition-all hover:shadow-honey">
              <span className="relative z-10">Explore the Range</span>
            </a>
            <a href="#trace" className="rounded-sm border border-linen/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-linen transition-colors hover:border-honey hover:text-honey">
              Trace a Pack
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-linen/10 pt-8 md:grid-cols-4"
        >
          {[
            ["80+", "Single-origin SKUs"],
            ["100%", "Front-of-pack honesty"],
            ["0", "Spray drying. Ever."],
            ["1", "QR code on every pack"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl text-honey md:text-4xl">{n}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-linen/60">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
