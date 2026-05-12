import { useState } from "react";
import { motion } from "framer-motion";
import bowl from "@/assets/hero-bowl.jpg";
import { Logo } from "./Logo";
import { Leaf, ShieldCheck, QrCode, Sprout } from "lucide-react";
import { HeroProductStack } from "./HeroProductStack";

export const Hero = () => {
  const [tint, setTint] = useState("38 90% 55%");
  return (
    <section className="relative min-h-screen overflow-hidden bg-ink text-linen">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={bowl}
          alt="A rustic bowl of organic grains, dates and nuts surrounded by green leaves"
          className="h-full w-full object-cover opacity-90"
          width={1920}
          height={1080}
        />
        {/* Soft top + bottom fades for nav legibility, keep middle clear */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--ink)/0.55)_0%,_hsl(var(--ink)/0.25)_45%,_transparent_75%)]" />
      </motion.div>

      {/* Ambient tint that follows the active product card */}
      <motion.div
        aria-hidden
        animate={{ background: `radial-gradient(60% 70% at 80% 50%, hsl(${tint} / 0.28), transparent 70%)` }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-[1]"
      />

      {/* Right-side product stack */}
      <div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 lg:block xl:right-16">
        <HeroProductStack onTintChange={setTint} />
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

      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-wrap items-center justify-center gap-4"
      >
        <a href="#range" className="rounded-sm bg-honey px-10 py-4 text-xs uppercase tracking-[0.25em] text-ink transition-all hover:shadow-honey">
          Explore the Range
        </a>
        <a href="#trace" className="rounded-sm border border-linen/30 px-10 py-4 text-xs uppercase tracking-[0.25em] text-linen transition-colors hover:border-honey hover:text-honey">
          Trace a Pack
        </a>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-40">

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
