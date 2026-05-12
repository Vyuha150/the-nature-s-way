import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const reviews = [
  {
    n: "Aanya R.",
    r: "Home cook · Bengaluru",
    t: "The first brand where I don't feel I need to Google every ingredient. The quantity printed on the front changed how I shop.",
  },
  {
    n: "Dr. Vikram S.",
    r: "Nutritionist · Pune",
    t: "I recommend Nature's Way to clients on traditional Indian diets. Real grains, real quantification, no diet-fad noise.",
  },
  {
    n: "Meera K.",
    r: "Mother of two · Mumbai",
    t: "I scanned the QR on the bajra atta and watched a video from the farm in Solapur. My kids loved it more than I did.",
  },
  {
    n: "Rohan T.",
    r: "Chef · Goa",
    t: "Their cold-pressed amla shot tastes like winter mornings in Pratapgarh. Single-origin really is a different language.",
  },
];

export const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-grain py-32 text-umber">
      <div className="absolute inset-0 grain-texture opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— Kitchens That Read Labels</span>
          <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
            Words from people who <em className="italic">actually look</em> at the back of the pack.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <motion.div
              key={r.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              className="relative rounded-sm bg-linen p-8 shadow-soft"
            >
              <Quote className="absolute right-6 top-6 text-honey/40" size={48} strokeWidth={1} />
              <p className="font-display text-xl font-light leading-relaxed text-umber md:text-2xl">
                "{r.t}"
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-umber/15 pt-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-honey font-display text-lg text-ink">
                  {r.n.charAt(0)}
                </div>
                <div>
                  <div className="font-display text-base text-umber">{r.n}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-earth/70">{r.r}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
