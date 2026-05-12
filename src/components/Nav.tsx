import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "./Logo";

const links = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Promise", href: "#promise" },
  { label: "Range", href: "#range" },
  { label: "Trace", href: "#trace" },
  { label: "Contact", href: "#contact" },
];

export const Nav = () => {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["hsl(33 100% 14% / 0)", "hsl(33 100% 14% / 0.92)"]);
  const blur = useTransform(scrollY, [0, 120], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.header
      style={{ backgroundColor: bg, backdropFilter: blur as never }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-3 text-linen">
          <Logo tone="light" className="h-9 w-9" />
          <div className="leading-tight">
            <div className="font-display text-lg">The Nature's Way</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-honey">Nothing Hidden</div>
          </div>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.2em] text-linen/80 transition-colors hover:text-honey"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#range"
          className="hidden rounded-sm border border-honey/60 px-5 py-2 text-xs uppercase tracking-[0.2em] text-honey transition-all hover:bg-honey hover:text-ink md:inline-block"
        >
          Shop Range
        </a>
      </div>
    </motion.header>
  );
};
