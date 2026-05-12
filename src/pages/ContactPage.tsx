import { useEffect } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Contact } from "@/components/Contact";
import services from "@/assets/services-trio.jpg";
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

const offices = [
  { city: "Bangalore HQ", addr: "12 Coconut Grove, Indiranagar 560038", role: "Head office & roastery" },
  { city: "Solapur Mill", addr: "Patil Family Farm, Solapur 413006", role: "Stone milling unit" },
  { city: "Pratapgarh DC", addr: "Amla Nagar, Pratapgarh 230001", role: "Winter harvest depot" },
];

const ContactPage = () => {
  useEffect(() => { document.title = "Contact — The Nature's Way"; }, []);
  return (
    <main className="min-h-screen bg-linen">
      <Nav />
      <PageHero
        crumb="Contact"
        eyebrow="Speak To The Source"
        title={<>Real people. <em className="italic text-honey">Real answers.</em></>}
        subtitle="Email a question about a batch and a human writes back — usually with a farm photo and the harvest week. We'd rather over-share than hide a thing."
        image={services}
      />

      {/* Quick contact tiles */}
      <section className="bg-linen py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          {[
            { i: Mail, t: "Write", d: "hello@naturesway.in", sub: "Replies within 24h" },
            { i: Phone, t: "Call", d: "+91 80 4567 8910", sub: "Mon–Sat · 9–7 IST" },
            { i: MapPin, t: "Visit", d: "Indiranagar, Bangalore", sub: "Walk-in tastings Sat" },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-sm border border-umber/15 bg-grain/30 p-8 transition-all hover:-translate-y-1 hover:border-honey hover:bg-grain/60"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-honey/40 text-honey transition-all group-hover:bg-honey group-hover:text-ink">
                <c.i size={22} strokeWidth={1.5} />
              </div>
              <div className="mt-6 text-[10px] uppercase tracking-[0.3em] text-honey">{c.t}</div>
              <div className="mt-2 font-display text-2xl text-umber">{c.d}</div>
              <div className="mt-1 text-sm text-earth/70">{c.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <Contact />

      {/* Locations */}
      <section className="bg-grain py-24 grain-texture">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— Where We Are</span>
            <h2 className="mt-4 font-display text-4xl font-light text-umber md:text-5xl">
              Three corners. <em className="italic">One promise.</em>
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {offices.map((o, i) => (
              <motion.div
                key={o.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-sm border border-umber/15 bg-linen p-8"
              >
                <div className="text-[10px] uppercase tracking-[0.3em] text-honey">{o.role}</div>
                <h3 className="mt-3 font-display text-2xl text-umber">{o.city}</h3>
                <p className="mt-4 text-sm leading-relaxed text-earth/80">{o.addr}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-honey">— Follow The Harvest</span>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-umber/30 text-umber transition-all hover:border-honey hover:bg-honey hover:text-ink"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
