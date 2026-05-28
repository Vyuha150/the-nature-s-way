import { motion, useScroll, useTransform } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, LayoutDashboard, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/shop/context/CartContext";
import { getUserSession } from "@/shop/auth";

const links = [
  { label: "Home", to: "/" },
  { label: "Philosophy", to: "/philosophy" },
  { label: "Promise", to: "/promise" },
  { label: "Range", to: "/range" },
  { label: "Trace", to: "/trace" },
  { label: "Contact", to: "/contact" },
  { label: "Shop", to: "/shop" },
];

export const Nav = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["hsl(33 100% 14% / 0)", "hsl(33 100% 14% / 0.92)"]);
  const blur = useTransform(scrollY, [0, 120], ["blur(0px)", "blur(12px)"]);
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(() => getUserSession());
  const { items } = useCart();

  useEffect(() => {
    setOpen(false);
    setSession(getUserSession());
  }, [location.pathname]);

  return (
    <motion.header
      style={isHome ? { backgroundColor: bg, backdropFilter: blur as never } : undefined}
      className={`fixed inset-x-0 top-0 z-50 ${!isHome ? "bg-ink/95 backdrop-blur-md" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-3 text-linen">
          <Logo tone="light" className="h-9 w-9" />
          <div className="leading-tight">
            <div className="font-display text-lg">The Nature's Way</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-honey">Nothing Hidden</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `relative text-xs uppercase tracking-[0.2em] transition-colors hover:text-honey ${
                  isActive ? "text-honey" : "text-linen/80"
                } after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-honey after:transition-all ${
                  isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/admin"
            aria-label="Admin panel"
            title="Admin panel"
            className="grid h-9 w-9 place-items-center rounded-sm border border-honey/60 text-honey transition-all hover:bg-honey hover:text-ink"
          >
            <LayoutDashboard size={16} />
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            title="Cart"
            className="relative grid h-9 w-9 place-items-center rounded-sm border border-honey/60 text-honey transition-all hover:bg-honey hover:text-ink"
          >
            <ShoppingBag size={16} />
            {items.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-honey text-[10px] text-ink">
                {items.length}
              </span>
            )}
          </Link>
          {session ? (
            <Link
              to="/orders"
              className="rounded-sm border border-honey/60 px-5 py-2 text-xs uppercase tracking-[0.2em] text-honey transition-all hover:bg-honey hover:text-ink"
            >
              Orders
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-sm border border-honey/60 px-5 py-2 text-xs uppercase tracking-[0.2em] text-honey transition-all hover:bg-honey hover:text-ink"
            >
              Sign in
            </Link>
          )}
          <Link
            to="/shop"
            className="rounded-sm border border-honey/60 px-5 py-2 text-xs uppercase tracking-[0.2em] text-honey transition-all hover:bg-honey hover:text-ink"
          >
            Shop
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-linen md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-linen/10 bg-ink/95 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col px-6 py-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `border-b border-linen/10 py-4 text-sm uppercase tracking-[0.25em] ${
                    isActive ? "text-honey" : "text-linen/85"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/cart"
              className="border-b border-linen/10 py-4 text-sm uppercase tracking-[0.25em] text-linen/85"
            >
              Cart
            </NavLink>
            {session ? (
              <NavLink
                to="/orders"
                className="border-b border-linen/10 py-4 text-sm uppercase tracking-[0.25em] text-linen/85"
              >
                Orders
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="border-b border-linen/10 py-4 text-sm uppercase tracking-[0.25em] text-linen/85"
              >
                Sign in
              </NavLink>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
