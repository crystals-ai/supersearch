import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HERO_BG =
  "https://static.prod-images.emergentagent.com/jobs/e7a63ec8-ab4e-4969-b960-c0bc52a56f3c/images/f1c7c741182ad8db6f33b65c05b972a24a12d2e5db6397a52af179c8fa541c09.png";

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] flex items-center pt-24 overflow-hidden"
      data-testid="hero-section"
    >
      <img
        src={HERO_BG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCFB]/40 via-[#FDFCFB]/70 to-[#FDFCFB]" />
      <div className="grain-overlay" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#6B6A68] mb-10"
        >
          <span className="h-px w-10 bg-[#C4A484]" />
          Conversational Commerce, engineered.
        </motion.div>

        <motion.h1
          variants={fade}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-serif-display text-[13vw] sm:text-7xl md:text-8xl lg:text-[8.5rem] font-light tracking-[-0.02em] leading-[0.95] text-[#111] max-w-6xl"
          data-testid="hero-headline"
        >
          Shoppers don't<br />
          search anymore.<br />
          <span className="italic text-[#6B6A68]">They converse.</span>
        </motion.h1>

        <motion.p
          variants={fade}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-10 max-w-2xl text-lg md:text-xl text-[#6B6A68] leading-relaxed"
          data-testid="hero-subtext"
        >
          SuperSearch builds AI shopping assistants that understand intent — not keywords.
          We help retailers across fashion, furniture, beauty, electronics and beyond
          turn every visitor into a conversation, and every conversation into a sale.
        </motion.p>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <a
            href="#contact"
            data-testid="hero-cta-primary"
            className="group inline-flex items-center gap-3 bg-[#111] text-white px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-[#333] transition-colors"
          >
            Book a Demo
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#industries"
            data-testid="hero-cta-secondary"
            className="inline-flex items-center gap-3 border border-[#111] text-[#111] px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-[#F3F1ED] transition-colors"
          >
            See It In Action
          </a>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-20 flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-[#6B6A68]"
        >
          <span className="h-px w-16 bg-[#E2DFD9]" />
          Trusted approach · Built by alumni of Meta · Microsoft · Uber · Visa · Cisco
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
