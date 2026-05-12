import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  image: string;
  crumb: string;
}

export const PageHero = ({ eyebrow, title, subtitle, image, crumb }: Props) => {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-32 pb-24 text-linen">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-10"
      >
        <img src={image} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-linen/60"
        >
          <Link to="/" className="hover:text-honey">Home</Link>
          <ChevronRight size={12} />
          <span className="text-honey">{crumb}</span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-12 inline-block text-[10px] uppercase tracking-[0.5em] text-honey"
        >
          — {eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 max-w-4xl font-display text-5xl font-light leading-[1.05] md:text-7xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-linen/75"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};
