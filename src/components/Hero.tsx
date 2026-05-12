import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import bowl from "@/assets/hero-bowl.jpg";
import turmeric from "@/assets/prod-turmeric.jpg";
import dates from "@/assets/prod-dates.jpg";
import seeds from "@/assets/prod-seeds.jpg";
import moringa from "@/assets/prod-moringa.jpg";
import flour from "@/assets/story-flour.jpg";
import { Logo } from "./Logo";
import { Leaf, ShieldCheck, QrCode, Sprout } from "lucide-react";

const showcase = [
  { img: turmeric, t: "Erode Turmeric", c: "Single-origin · 4.8% curcumin", tag: "Root" },
  { img: dates, t: "Khajoor Reserve", c: "Sun-dried · No glucose", tag: "Fruit" },
  { img: seeds, t: "Seven-Seed Blend", c: "Cold-stored · 250g", tag: "Seeds" },
  { img: moringa, t: "Moringa Leaf", c: "Shade-dried · Tamil Nadu", tag: "Greens" },
  { img: flour, t: "7-Grain Atta", c: "Stone-milled · Solapur", tag: "Flour" },
];

export const Hero = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % showcase.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-ink text-linen">
      {/* Background image — static bowl */}
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={bowl}
          alt="A rustic bowl of organic grains, dates and nuts"
          className="h-full w-full object-cover opacity-90"
          width={1920}
          height={1080}
        />
      </motion.div>
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--ink)/0.45)_0%,_hsl(var(--ink)/0.2)_45%,_transparent_75%)]" />
      </div>

      {/* Floating leaves */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-6 top-32 hidden text-honey/40 md:block"
      >
        <Leaf size={48} strokeWidth={1} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-10 top-48 hidden text-honey/30 md:block"
      >
        <Sprout size={56} strokeWidth={1} />
      </motion.div>

      {/* Right-side stacked product cards */}
      <div className="pointer-events-none absolute right-6 top-1/2 z-20 hidden h-[420px] w-[260px] -translate-y-1/2 lg:block xl:right-12 xl:w-[300px]">
        <div className="relative h-full w-full">
          {showcase.map((p, i) => {
            const offset = (i - active + showcase.length) % showcase.length;
            const isActive = offset === 0;
            return (
              <motion.div
                key={p.t}
                initial={false}
                animate={{
                  y: offset * 22,
                  x: offset * 14,
                  scale: 1 - offset * 0.06,
                  opacity: offset > 3 ? 0 : 1 - offset * 0.18,
                  rotate: offset * 2.5,
                  zIndex: showcase.length - offset,
                }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto absolute inset-0 overflow-hidden rounded-md border border-linen/15 bg-ink shadow-2xl shadow-black/60"
                style={{ zIndex: showcase.length - offset }}
              >
                <div className="relative h-[68%] w-full overflow-hidden">
                  <motion.img
                    src={p.img}
                    alt={p.t}
                    className="h-full w-full object-cover"
                    animate={{ scale: isActive ? 1.05 : 1 }}
                    transition={{ duration: 4, ease: "easeOut" }}
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-honey/90 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-ink">
                    {p.tag}
                  </div>
                </div>
                <div className="flex h-[32%] flex-col justify-center px-5">
                  <div className="text-[9px] uppercase tracking-[0.3em] text-honey">{p.c}</div>
                  <h3 className="mt-1 font-display text-xl leading-tight text-linen">{p.t}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* progress dots */}
        <div className="absolute -bottom-10 left-0 flex gap-2">
          {showcase.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1 rounded-full transition-all ${i === active ? "w-8 bg-honey" : "w-3 bg-linen/30"}`}
              aria-label={`Show product ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-start justify-center px-6 pt-32 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative w-full max-w-3xl py-12 md:py-16"
        >
          <div className="mb-6 flex items-center justify-start gap-3 text-honey">
            <Logo tone="honey" className="h-6 w-6" />
            <span className="text-[10px] uppercase tracking-[0.5em]">The Nature's Way</span>
            <Logo tone="honey" className="h-6 w-6" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="-mt-8 font-display text-5xl font-light leading-[0.95] text-balance md:text-7xl lg:text-[6rem] md:-ml-16 lg:-ml-28"
          >
            Nothing<br />
            <em className="italic text-honey">Hidden.</em>
          </motion.h1>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#range" className="rounded-sm bg-honey px-10 py-4 text-xs uppercase tracking-[0.25em] text-ink transition-all hover:shadow-honey">
            Explore the Range
          </a>
          <a href="#trace" className="rounded-sm border border-linen/30 px-10 py-4 text-xs uppercase tracking-[0.25em] text-linen transition-colors hover:border-honey hover:text-honey">
            Trace a Pack
          </a>
        </motion.div>

        {/* Quick info chips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
        >
          {[
            { i: ShieldCheck, t: "Front-label honesty" },
            { i: QrCode, t: "QR-traceable packs" },
            { i: Sprout, t: "Ancient grain revival" },
            { i: Leaf, t: "Zero-process promise" },
          ].map(({ i: Icon, t }) => (
            <div key={t} className="flex items-center gap-3 rounded-sm border border-linen/10 bg-ink/40 px-4 py-3 backdrop-blur-sm">
              <Icon size={20} className="shrink-0 text-honey" strokeWidth={1.5} />
              <span className="text-left text-xs text-linen/80">{t}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
