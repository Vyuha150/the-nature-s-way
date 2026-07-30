import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ShieldCheck, QrCode, Sprout, ChevronLeft, ChevronRight, Plus, Sun, Wheat, Truck } from "lucide-react";
import bowl from "@/assets/hero-bowl.jpg";
import turmeric from "@/assets/prod-turmeric.jpg";
import dates from "@/assets/prod-dates.jpg";
import seeds from "@/assets/prod-seeds.jpg";
import moringa from "@/assets/prod-moringa.jpg";

const showcase = [
  { img: bowl, name: "Native Bowl" },
  { img: turmeric, name: "Erode Turmeric" },
  { img: dates, name: "Khajoor Reserve" },
  { img: seeds, name: "Seven-Seed Blend" },
  { img: moringa, name: "Moringa Leaf" },
];

const ticker = [
  "Foxtail Millet — New Harvest",
  "7-Grain Atta — Stone-ground",
  "Use NATURE10 · 10% off (min ₹500)",
  "Moringa Leaf — Shade-dried",
  "Khajoor Reserve — Tree-ripened",
  "Seven-Seed Blend — Cold-stored",
];

const usps = [
  { i: Leaf, t: "100%", s: "Natural" },
  { i: Sprout, t: "Native", s: "Form" },
  { i: ShieldCheck, t: "No", s: "Additives" },
];

const strip = [
  { i: Sun, t: "Sun-cured", s: "Field-dried slow" },
  { i: Wheat, t: "Stone-ground", s: "Breath-cool mills" },
  { i: Leaf, t: "Nothing hidden", s: "Front-label honesty" },
  { i: Truck, t: "Fresh dispatch", s: "From next batch" },
];

export const Hero = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((v) => (v + 1) % showcase.length), 4000);
    return () => clearInterval(id);
  }, []);

  const go = (d: number) =>
    setIdx((v) => (v + d + showcase.length) % showcase.length);

  return (
    <section className="relative overflow-hidden bg-ink text-linen">
      {/* Ticker */}
      <div className="relative z-20 overflow-hidden border-b border-honey/20 bg-umber pt-20">
        <div className="flex whitespace-nowrap py-2.5">
          {[0, 1].map((dup) => (
            <motion.div
              key={dup}
              animate={{ x: ["0%", "-100%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex shrink-0 items-center"
            >
              {ticker.map((t) => (
                <span key={t + dup} className="flex items-center gap-3 px-8 text-[11px] uppercase tracking-[0.2em] text-honey">
                  <Leaf size={12} strokeWidth={1.5} />
                  {t}
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grain-texture opacity-20" />
        <div className="absolute -left-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-honey/10 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-earth/40 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-14">
        {/* Centered headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="font-display text-4xl font-light leading-[1.05] text-balance md:text-6xl lg:text-7xl">
            Taste the <em className="italic text-honey">Native</em> Way
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-linen/70 md:text-base">
            Only conventional natural and organic consumables — in their native
            form, close to nature.
          </p>
        </motion.div>

        {/* Three columns */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.25fr_1fr]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="order-2 text-center lg:order-1 lg:text-left"
          >
            <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-px w-16 bg-honey/50" />
              <Sprout size={16} className="text-honey" />
            </div>
            <h2 className="font-display text-2xl font-light leading-snug md:text-3xl">
              Experience the true essence of untouched goodness
            </h2>

            <div className="mt-8 flex justify-center gap-6 lg:justify-start">
              {usps.map(({ i: Icon, t, s }) => (
                <div key={s} className="w-20 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-linen/25 text-honey transition-colors hover:border-honey">
                    <Icon size={20} strokeWidth={1.4} />
                  </div>
                  <div className="mt-2 text-xs text-linen/85">{t}</div>
                  <div className="text-xs text-linen/60">{s}</div>
                </div>
              ))}
            </div>

            <a
              href="#range"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-honey px-9 py-3.5 text-xs uppercase tracking-[0.25em] text-ink transition-all hover:shadow-honey"
            >
              Explore the Range
              <ChevronRight size={16} />
            </a>
          </motion.div>

          {/* Center rotating product */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-honey/25"
              />
              <div className="absolute inset-6 overflow-hidden rounded-full border border-honey/30 shadow-soft">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={showcase[idx].name}
                    src={showcase[idx].img}
                    alt={showcase[idx].name}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover"
                    width={800}
                    height={800}
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-8 text-center font-display text-2xl text-linen">
                  {showcase[idx].name}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => go(-1)}
                aria-label="Previous product"
                className="grid h-10 w-10 place-items-center rounded-full border border-linen/25 text-linen transition-colors hover:border-honey hover:text-honey"
              >
                <ChevronLeft size={16} />
              </button>
              <a
                href="#range"
                aria-label="See all products"
                className="grid h-12 w-12 place-items-center rounded-full bg-honey text-ink transition-transform hover:scale-105"
              >
                <Plus size={18} />
              </a>
              <button
                onClick={() => go(1)}
                aria-label="Next product"
                className="grid h-10 w-10 place-items-center rounded-full border border-linen/25 text-linen transition-colors hover:border-honey hover:text-honey"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="order-3 text-center lg:text-right"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-linen/20 bg-linen/[0.04] px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-honey">
              <QrCode size={12} /> QR-traceable packs
            </span>
            <h2 className="mt-5 font-display text-3xl font-light leading-tight md:text-4xl">
              Nothing <em className="italic text-honey">hidden.</em>
              <br />
              Nothing added.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-linen/70">
              Stone-ground grains, shade-dried leaf, sun-cured roots — every pack
              carries the farm, the mill and the date it left them.
            </p>
            <a
              href="#trace"
              className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-honey transition-opacity hover:opacity-80"
            >
              Trace a pack <ChevronRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-14 grid grid-cols-2 gap-4 border-t border-linen/10 pt-8 md:grid-cols-4"
        >
          {strip.map(({ i: Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-honey/40 text-honey">
                <Icon size={16} strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-display text-base text-linen">{t}</div>
                <div className="text-[11px] text-linen/60">{s}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
