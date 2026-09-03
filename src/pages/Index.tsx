import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { NatureSource } from "@/components/NatureSource";
import { Services } from "@/components/Services";
import { Philosophy } from "@/components/Philosophy";
import { Infographics } from "@/components/Infographics";
import { Promise } from "@/components/Promise";
import { Gallery } from "@/components/Gallery";
import { Range } from "@/components/Range";
import { Trace } from "@/components/Trace";
import { Testimonials } from "@/components/Testimonials";
import { CtaBanner } from "@/components/CtaBanner";
import { Contact } from "@/components/Contact";
import { OffersTicker } from "@/components/OffersTicker";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "The Nature's Way — Nothing Hidden";
    const desc = document.querySelector('meta[name="description"]');
    const content = "The Nature's Way — only conventional natural and organic consumables in their native form. Front-of-pack honesty, farm-to-shelf traceability, ancient Indian grain revival.";
    if (desc) desc.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <main className="min-h-screen bg-linen">
      <Nav />
      <Hero />
      <OffersTicker />
      <NatureSource />
      <Services />
      <Philosophy />
      <Infographics />
      <Promise />
      <Gallery />
      <Range />
      <Trace />
      <Testimonials />
      <CtaBanner />
      <Contact />
      <OffersTicker />
      <Footer />
    </main>
  );
};

export default Index;
