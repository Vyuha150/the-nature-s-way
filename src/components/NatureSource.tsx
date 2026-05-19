import { motion } from "framer-motion";
import { Leaf, Droplets, Sun, Sprout } from "lucide-react";
import turmeric from "@/assets/prod-turmeric.jpg";
import dates from "@/assets/prod-dates.jpg";
import seeds from "@/assets/prod-seeds.jpg";
import moringa from "@/assets/prod-moringa.jpg";
import flour from "@/assets/story-flour.jpg";
import grains from "@/assets/hero-grains.jpg";

// Free, hot-linkable nature clips (Google sample bucket + Mixkit CDN)
const HERO_VIDEO =
  "https://cdn.coverr.co/videos/coverr-a-farmer-walking-through-his-field-3633/1080p.mp4";
const HERO_FALLBACK =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

const products = [
  {
    kind: "video" as const,
    src: "https://assets.mixkit.co/videos/preview/mixkit-yellow-flowers-in-a-field-during-the-day-44837-large.mp4",
    poster: turmeric,
    t: "Erode Turmeric",
    c: "Hand-pulled · sun-cured 14 days",
    stat: "4.8% curcumin",
  },
  {
    kind: "image" as const,
    src: dates,
    t: "Khajoor Reserve",
    c: "Tree-ripened · sun-dried",
    stat: "0g added sugar",
  },
  {
    kind: "video" as const,
    src: "https://assets.mixkit.co/videos/preview/mixkit-grains-falling-in-slow-motion-on-a-wooden-table-32809-large.mp4",
    poster: seeds,
    t: "Seven-Seed Blend",
    c: "Cold-stored · linen-pouched",
    stat: "7 native seeds",
  },
  {
    kind: "image" as const,
    src: moringa,
    t: "Moringa Leaf",
    c: "Shade-dried · stone-milled",
    stat: "92 nutrients",
  },
  {
    kind: "image" as const,
    src: flour,
    t: "7-Grain Atta",
    c: "Stone-ground · breath-cool",
    stat: "0°C above ambient",
  },
  {
    kind: "image" as const,
    src: grains,
    t: "Foxtail Millet",
    c: "Heritage cultivar · rain-fed",
    stat: "11g protein / 100g",
  },
];

const infographics = [
  { i: Sprout, n: "120", l: "Partner farms" },
  { i: Sun, n: "14d", l: "Sun-cure window" },
  { i: Droplets, n: "0", l: "Synthetic inputs" },
  { i: Leaf, n: "48h", l: "Field → pouch" },
];

export const NatureSource = () => {
  return (
    <section className="relative overflow-hidden bg-ink py-32 text-linen">
      <div className="absolute inset-0 grain-texture opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-honey">
            — From The Soil, On Camera
          </span>
          <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
            Watch it grow.<br />
            <em className="italic text-honey">Watch it travel.</em>
          </h2>
          <p className="mt-6 text-base text-linen/70">
            No studio sets, no stock shots. Every frame below is filmed at the
            farm, the mill, or the curing yard — the same hands you'll thank in
            your kitchen.
          </p>
        </div>

        {/* Hero video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="relative mt-16 overflow-hidden rounded-sm shadow-soft"
        >
          <div className="aspect-video w-full bg-ink">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={grains}
              className="h-full w-full object-cover"
            >
              <source src={HERO_VIDEO} type="video/mp4" />
              <source src={HERO_FALLBACK} type="video/mp4" />
            </video>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
            <div className="text-[10px] uppercase tracking-[0.3em] text-honey">
              — Solapur, Maharashtra · Pre-monsoon harvest
            </div>
            <div className="mt-2 font-display text-2xl text-linen md:text-3xl">
              From <em className="italic">sown</em> to <em className="italic">sealed</em>,
              in under 48 hours.
            </div>
          </div>
        </motion.div>

        {/* Infographics strip */}
        <div className="mt-16 grid gap-6 border-y border-linen/10 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {infographics.map((g, i) => (
            <motion.div
              key={g.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-honey/40 text-honey">
                <g.i size={20} strokeWidth={1.4} />
              </div>
              <div>
                <div className="font-display text-3xl font-light text-honey">{g.n}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-linen/60">
                  {g.l}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Products side-by-side */}
        <div className="mt-20">
          <div className="flex flex-col items-end justify-between gap-4 md:flex-row">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-honey">
                — In Motion
              </span>
              <h3 className="mt-4 font-display text-4xl font-light md:text-5xl">
                The pantry, <em className="italic">filmed honest.</em>
              </h3>
            </div>
            <a
              href="/range"
              className="text-[10px] uppercase tracking-[0.3em] text-linen/70 transition-colors hover:text-honey"
            >
              See all 80+ →
            </a>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <motion.article
                key={p.t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="group relative overflow-hidden rounded-sm border border-linen/10 bg-ink shadow-soft"
              >
                <div className="aspect-[4/5] overflow-hidden bg-umber/40">
                  {p.kind === "video" ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={p.poster}
                      className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                    >
                      <source src={p.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={p.src}
                      alt={p.t}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                    />
                  )}
                </div>

                {/* Infographic stat badge */}
                <div className="absolute right-4 top-4 rounded-full border border-honey/50 bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-honey backdrop-blur-sm">
                  {p.stat}
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-6 pt-16">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-honey">
                    {p.c}
                  </div>
                  <h4 className="mt-1 font-display text-2xl text-linen">{p.t}</h4>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
