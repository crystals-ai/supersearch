import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send } from "lucide-react";

const INDUSTRIES = [
  {
    id: "fashion",
    tabLabel: "Fashion & Jewellery",
    category: "Clothing · Jewellery · Bags · Shoes",
    query:
      "My cousin is getting married in Goa in July, what can I wear? It's a 4-day wedding, I like pastels.",
    replyIntro: "Four days, pastel palette, Goa humidity — here's a capsule:",
    replyBullets: [
      "Day 1 · Haldi: Buttercream cotton anarkali with mirror-work dupatta",
      "Day 2 · Mehendi: Mint green lehenga, pearl jhumkas, breathable silk",
      "Day 3 · Sangeet: Blush pink sharara, statement emerald polki set",
      "Day 4 · Reception: Lavender silk saree, diamond chandbaalis",
    ],
    image: "https://images.pexels.com/photos/8070398/pexels-photo-8070398.jpeg",
  },
  {
    id: "furniture",
    tabLabel: "Home & Furniture",
    category: "Furniture · Décor · Lighting",
    query:
      "I want to design my living room under ₹2,00,000. I'm going for white hues and a vibrant vibe. Design this for me.",
    replyIntro: "White base with bold accents — here's a curated living room:",
    replyBullets: [
      "Modular cream 3-seater · ₹68,000",
      "Terracotta lounge chair · ₹24,500",
      "Travertine coffee table · ₹32,000",
      "Sunset arc floor lamp + curated art wall · ₹41,200",
      "Rust-hued Jaipur rug + indoor palm · ₹28,800",
    ],
    image: "https://images.pexels.com/photos/30211361/pexels-photo-30211361.jpeg",
  },
  {
    id: "office",
    tabLabel: "Office Supplies",
    category: "Stationery · Pantry · Workplace",
    query:
      "I have 10 employees who work 60% of their time from office. We're a small fabric redesign company. Suggest office supplies I'll need for a month.",
    replyIntro: "For a 10-person fabric studio, 60% in-office — a month's kit:",
    replyBullets: [
      "A4 paper · 6 reams · Whiteboards · 2 · Sticky pads · 30",
      "Fabric-safe markers · 24 · Measuring tapes · 12 · Shears · 6",
      "Pantry: coffee 2kg · tea 200 bags · biscuits · filtered water",
      "Cleaning: disinfectant, lint rollers, industrial bin bags",
      "Estimated monthly spend: ₹18,400 — delivered weekly",
    ],
    image: "https://images.pexels.com/photos/7428214/pexels-photo-7428214.jpeg",
  },
  {
    id: "beauty",
    tabLabel: "Beauty & Skincare",
    category: "Skincare · Makeup · Grooming",
    query:
      "Can you suggest products for a simple 3-step routine for oily, acne-prone skin?",
    replyIntro: "A minimal, dermatologist-approved 3-step routine:",
    replyBullets: [
      "Cleanse · Salicylic acid 2% gel cleanser (AM + PM)",
      "Treat · Niacinamide 10% + Zinc serum (AM)",
      "Protect · Oil-free SPF 50 gel sunscreen (AM)",
      "Add at night · Adapalene 0.1% (2–3×/week, slowly ramp up)",
    ],
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f",
  },
];

const TypingDots = () => (
  <div className="flex items-center gap-1.5 py-1">
    <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
    <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
    <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
  </div>
);

const ChatMockup = ({ industry }) => {
  const [phase, setPhase] = useState(0); // 0 idle, 1 typing, 2 answered
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    setPhase(0);
    timers.current = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1800),
    ];
    return () => timers.current.forEach(clearTimeout);
  }, [industry.id]);

  return (
    <div
      className="bg-white border border-[#E2DFD9] rounded-xl shadow-[0_20px_60px_-20px_rgba(17,17,17,0.15)] overflow-hidden w-full max-w-xl mx-auto"
      data-testid={`chat-mockup-${industry.id}`}
    >
      <div className="flex items-center gap-2 px-5 py-3 border-b border-[#E2DFD9] bg-[#FDFCFB]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E2DFD9]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E2DFD9]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E2DFD9]" />
        <div className="ml-auto flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#6B6A68]">
          <Sparkles size={12} className="text-[#C4A484]" />
          SuperSearch Assistant
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4 min-h-[380px]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="self-end max-w-[88%]"
        >
          <div className="bg-[#F3F1ED] text-[#111] text-sm leading-relaxed px-4 py-3 rounded-2xl rounded-tr-sm">
            {industry.query}
          </div>
          <div className="text-[11px] text-[#6B6A68] mt-1 text-right">you</div>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="self-start max-w-[60%]"
            >
              <div className="bg-[#111] px-4 py-3 rounded-2xl rounded-tl-sm">
                <TypingDots />
              </div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="self-start max-w-[92%]"
            >
              <div className="bg-[#111] text-white text-sm leading-relaxed px-5 py-4 rounded-2xl rounded-tl-sm">
                <div className="mb-3">{industry.replyIntro}</div>
                <ul className="space-y-2 text-white/90">
                  {industry.replyBullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex gap-2"
                    >
                      <span className="text-[#C4A484]">—</span>
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-[#E2DFD9] px-5 py-3 flex items-center gap-3 bg-[#FDFCFB]">
        <div className="text-sm text-[#6B6A68] flex-1 truncate">
          Ask anything about {industry.tabLabel.toLowerCase()}…
        </div>
        <button
          className="h-8 w-8 grid place-items-center bg-[#111] text-white rounded-full"
          aria-label="Send"
          disabled
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};

export const IndustryShowcase = () => {
  const [active, setActive] = useState(INDUSTRIES[0].id);
  const current = INDUSTRIES.find((i) => i.id === active);

  return (
    <section
      id="industries"
      className="relative py-24 md:py-32 bg-[#F3F1ED]"
      data-testid="industries-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#6B6A68] mb-6">
              See it work, in any category.
            </div>
            <h2 className="font-serif-display text-4xl md:text-6xl font-light tracking-tight leading-[1.02] text-[#111] max-w-3xl">
              One assistant,<br /><span className="italic">every industry.</span>
            </h2>
          </div>
          <p className="text-[#6B6A68] max-w-sm text-base leading-relaxed">
            Real queries from real buyers, answered in real time.
            Switch the tab — watch intent become a recommendation.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 border-b border-[#E2DFD9] pb-2">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActive(ind.id)}
              data-testid={`tab-${ind.id}`}
              className={`text-xs sm:text-sm uppercase tracking-[0.18em] px-5 py-3 transition-colors border-b-2 ${
                active === ind.id
                  ? "border-[#111] text-[#111]"
                  : "border-transparent text-[#6B6A68] hover:text-[#111]"
              }`}
            >
              {ind.tabLabel}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="text-xs uppercase tracking-[0.22em] text-[#C4A484] mb-5">
                {current.category}
              </div>
              <h3 className="font-serif-display text-3xl md:text-4xl font-light tracking-tight leading-tight text-[#111] mb-6">
                “{current.query}”
              </h3>
              <p className="text-[#6B6A68] leading-relaxed mb-8">
                SuperSearch parses intent, constraints, taste and budget —
                then surfaces the exact products that fit. No endless filters.
                No keyword guessing.
              </p>
              <div className="aspect-[4/5] w-full max-w-sm overflow-hidden border border-[#E2DFD9]">
                <img
                  src={current.image}
                  alt={current.tabLabel}
                  className="w-full h-full object-cover grayscale-[10%]"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <ChatMockup industry={current} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default IndustryShowcase;
