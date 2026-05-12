import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactRows = [
  { i: MapPin, t: "Visit", d: "12 Coconut Grove, Bangalore 560001" },
  { i: Phone, t: "Call", d: "+91 80 4567 8910" },
  { i: Mail, t: "Write", d: "hello@naturesway.in" },
  { i: Clock, t: "Hours", d: "Mon–Sat · 9am – 7pm IST" },
];

export const Contact = () => {
  return (
    <section id="contact-form" className="relative overflow-hidden bg-ink py-32 text-linen">
      <div className="absolute inset-0 grain-texture opacity-30" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— Speak To Us</span>
          <h2 className="mt-6 font-display text-5xl font-light leading-tight md:text-6xl">
            Questions about a pack? <em className="italic text-honey">Ask the source.</em>
          </h2>
          <p className="mt-6 max-w-md text-linen/70">
            Real people answer. We'll trace your batch, share farm photos, and tell you
            what week your grain was harvested — usually within a day.
          </p>

          <div className="mt-10 space-y-5">
            {contactRows.map((c) => (
              <div key={c.t} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-honey/40 text-honey">
                  <c.i size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-honey">{c.t}</div>
                  <div className="mt-1 text-base text-linen/90">{c.d}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={(e) => e.preventDefault()}
          className="rounded-sm border border-linen/10 bg-earth/40 p-8 backdrop-blur-sm md:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" placeholder="Aanya Rao" />
            <Field label="Your email" placeholder="you@example.com" type="email" />
          </div>
          <Field label="Subject" placeholder="Tracing batch #JW-1024" className="mt-5" />
          <div className="mt-5">
            <label className="text-[10px] uppercase tracking-[0.3em] text-honey">Your message</label>
            <textarea
              rows={5}
              placeholder="Tell us what you'd like to know..."
              className="mt-2 w-full border-b border-linen/20 bg-transparent py-3 text-linen placeholder:text-linen/30 focus:border-honey focus:outline-none"
            />
          </div>
          <button className="mt-8 w-full rounded-sm bg-honey px-8 py-4 text-xs uppercase tracking-[0.3em] text-ink transition-all hover:shadow-honey">
            Send message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

const Field = ({ label, placeholder, type = "text", className = "" }: { label: string; placeholder: string; type?: string; className?: string }) => (
  <div className={className}>
    <label className="text-[10px] uppercase tracking-[0.3em] text-honey">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="mt-2 w-full border-b border-linen/20 bg-transparent py-3 text-linen placeholder:text-linen/30 focus:border-honey focus:outline-none"
    />
  </div>
);
