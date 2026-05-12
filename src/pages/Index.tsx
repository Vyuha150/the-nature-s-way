import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Promise } from "@/components/Promise";
import { Range } from "@/components/Range";
import { Trace } from "@/components/Trace";
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
      <Philosophy />
      <Promise />
      <Range />
      <Trace />
      <Footer />
    </main>
  );
};

export default Index;
