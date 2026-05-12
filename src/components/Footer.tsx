import { motion } from "framer-motion";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer id="contact" className="relative bg-grain text-umber">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid gap-12 border-b border-umber/20 pb-16 lg:grid-cols-2"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-earth">— Stay Close To The Harvest</span>
            <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
              Seasonal letters. <em className="italic">No noise.</em>
            </h2>
          </div>
          <form className="flex flex-col justify-end gap-4 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 border-b border-umber/30 bg-transparent px-2 py-4 text-umber placeholder:text-umber/40 focus:border-honey focus:outline-none"
            />
            <button className="rounded-sm bg-umber px-8 py-4 text-xs uppercase tracking-[0.25em] text-linen transition-all hover:bg-honey hover:text-ink">
              Subscribe
            </button>
          </form>
        </motion.div>

        <div className="mt-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Logo tone="dark" className="h-10 w-10" />
              <div>
                <div className="font-display text-xl text-umber">The Nature's Way</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-honey">Nothing Hidden</div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-earth/80">
              Conventional natural and organic consumables. In their native form.
              Close to nature. Made for kitchens that read every label.
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-earth/60">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              {["Philosophy", "Promise", "Range", "Trace"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-honey">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-earth/60">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>hello@naturesway.in</li>
              <li>+91 80 4567 8910</li>
              <li>Bangalore · Solapur · Pratapgarh</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-umber/15 pt-8 text-xs text-earth/60 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} The Nature's Way. All rights reserved.</div>
          <div className="uppercase tracking-[0.2em]">Crafted in India · Sourced from the soil</div>
        </div>
      </div>
    </footer>
  );
};
