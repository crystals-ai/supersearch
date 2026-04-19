import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Mission", href: "#mission" },
  { label: "Industries", href: "#industries" },
  { label: "Offerings", href: "#offerings" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#FDFCFB]/85 backdrop-blur-md border-b border-[#E2DFD9]" : "bg-transparent"
      }`}
      data-testid="site-navbar"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between py-5">
        <a href="#top" className="flex items-baseline gap-2" data-testid="navbar-logo">
          <span className="font-serif-display text-2xl md:text-3xl tracking-tight text-[#111]">
            SuperSearch
          </span>
          <span className="hidden sm:inline h-1 w-1 rounded-full bg-[#C4A484]" />
        </a>

        <div className="hidden md:flex items-center gap-10">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-testid={`navbar-link-${item.label.toLowerCase()}`}
              className="text-sm text-[#6B6A68] hover:text-[#111] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            data-testid="navbar-cta"
            className="text-xs uppercase tracking-[0.18em] bg-[#111] text-white px-5 py-3 hover:bg-[#333] transition-colors"
          >
            Book a Demo
          </a>
        </div>

        <button
          className="md:hidden text-[#111]"
          onClick={() => setOpen((v) => !v)}
          data-testid="navbar-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#E2DFD9] bg-[#FDFCFB]" data-testid="navbar-mobile-menu">
          <div className="flex flex-col px-6 py-6 gap-5">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm text-[#6B6A68] hover:text-[#111]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="text-xs uppercase tracking-[0.18em] bg-[#111] text-white px-5 py-3 text-center"
            >
              Book a Demo
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
