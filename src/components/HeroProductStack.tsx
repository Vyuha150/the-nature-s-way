import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import turmeric from "@/assets/prod-turmeric.jpg";
import dates from "@/assets/prod-dates.jpg";
import seeds from "@/assets/prod-seeds.jpg";
import moringa from "@/assets/prod-moringa.jpg";
import flour from "@/assets/story-flour.jpg";

export type HeroCard = {
  img: string;
  tag: string;
  title: string;
  origin: string;
  tint: string; // hsl tint for ambient bg
};

export const heroCards: HeroCard[] = [
  { img: turmeric, tag: "Single-origin", title: "Erode Turmeric", origin: "Tamil Nadu · 4.8% curcumin", tint: "38 90% 55%" },
  { img: dates, tag: "Sun-dried", title: "Khajoor Reserve", origin: "No glucose · whole fruit", tint: "22 60% 32%" },
  { img: seeds, tag: "Cold-stored", title: "Seven-Seed Blend", origin: "Pumpkin · flax · sunflower", tint: "32 45% 40%" },
  { img: moringa, tag: "Shade-dried", title: "Moringa Leaf", origin: "Hand-sorted · stoneless", tint: "120 35% 28%" },
  { img: flour, tag: "Stone-milled", title: "7-Grain Atta", origin: "Solapur · slow-ground", tint: "30 55% 45%" },
];

type Props = {
  onTintChange?: (tint: string) => void;
};

export const HeroProductStack = ({ onTintChange }: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroCards.length), 3800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    onTintChange?.(heroCards[index].tint);
  }, [index, onTintChange]);

  // Show top three in the stack
  const visible = [0, 1, 2].map((offset) => {
    const i = (index + offset) % heroCards.length;
    return { ...heroCards[i], offset, key: `${i}-${index}` };
  });

  return (
    <div className="pointer-events-none relative h-[460px] w-[300px] lg:h-[520px] lg:w-[340px]">
      <AnimatePresence>
        {visible.map((c) => {
          const isTop = c.offset === 0;
          return (
            <motion.div
              key={c.key}
              initial={{
                opacity: 0,
                y: c.offset === 0 ? -40 : 24 + c.offset * 18,
                scale: 0.9 - c.offset * 0.04,
                rotate: c.offset === 0 ? -3 : c.offset * 2,
              }}
              animate={{
                opacity: 1 - c.offset * 0.25,
                y: c.offset * 26,
                scale: 1 - c.offset * 0.05,
                rotate: c.offset === 0 ? 0 : c.offset * 2.5,
              }}
              exit={{ opacity: 0, y: 60, scale: 0.85, rotate: 8 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: 10 - c.offset }}
              className="pointer-events-auto absolute inset-x-0 top-0 overflow-hidden rounded-sm border border-linen/15 bg-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <motion.img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: isTop ? 1 : 1.08 }}
                  transition={{ duration: 4, ease: "easeOut" }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div
                  className="absolute inset-0 mix-blend-soft-light opacity-60"
                  style={{ background: `linear-gradient(140deg, hsl(${c.tint} / 0.6), transparent 60%)` }}
                />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full border border-linen/30 bg-ink/40 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-linen backdrop-blur-sm">
                    {c.tag}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-honey">{c.origin}</div>
                  <h3 className="mt-2 font-display text-2xl text-linen lg:text-3xl">{c.title}</h3>
                  {isTop && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 3.6, ease: "linear" }}
                      className="mt-4 h-[2px] origin-left bg-honey/70"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
