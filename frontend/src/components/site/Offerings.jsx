import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";

const OFFERINGS = [
  {
    id: "assistant",
    number: "01",
    title: "AI Shopping Assistant",
    subtitle: "Deployed on your website.",
    body:
      "A conversational storefront that understands intent, tone, budget and taste. It greets, recommends, compares and closes — the way your best store associate would, at infinite scale.",
    visual: "icon",
  },
  {
    id: "catalog",
    number: "02",
    title: "Catalog Enrichment",
    subtitle: "Your SKUs, deeply understood.",
    body:
      "We auto-generate rich attributes, style descriptors, occasion tags and semantic context across every product — so your catalog speaks the language your shoppers actually use.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/e7a63ec8-ab4e-4969-b960-c0bc52a56f3c/images/e484884975f8c2804e9b609c905e52bb970cc6e72de176b110957f483cbb5bfc.png",
  },
  {
    id: "graph",
    number: "03",
    title: "Intent-Aware Knowledge Graph",
    subtitle: "The brain behind the answers.",
    body:
      "A proprietary graph that maps products to occasions, constraints, aesthetics and substitutes — enabling reasoning over your catalog, not just retrieval.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/e7a63ec8-ab4e-4969-b960-c0bc52a56f3c/images/5356f5eb6ce0ae327d9299a0eef95b02efc7d1bc8cc0d62baeb22c71dcf16635.png",
  },
  {
    id: "graph",
    number: "04",
    title: "Virtual Try-On",
    subtitle: "Reduces returns and increases conversions.",
    body:
      "A virtual try-on feature that allows customers to try on products before they buy. It uses AI to generate a 3D model of the product and allows the customer to try it on virtually.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/e7a63ec8-ab4e-4969-b960-c0bc52a56f3c/images/5356f5eb6ce0ae327d9299a0eef95b02efc7d1bc8cc0d62baeb22c71dcf16635.png",
  },
  {
    id: "graph",
    number: "05",
    title: "Multilingual Queries",
    subtitle: "Support queries in multiple languages.",
    body:
      "A multilingual query feature that allows customers to query your catalog in their language. It uses AI to generate a response in the customer's language.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/e7a63ec8-ab4e-4969-b960-c0bc52a56f3c/images/5356f5eb6ce0ae327d9299a0eef95b02efc7d1bc8cc0d62baeb22c71dcf16635.png",
  },
  {
    id: "graph",
    number: "06",
    title: "App Storefront on ChatGPT",
    subtitle: "Meet your buyers where they start.",
    body:
      "40% of shoppers now start their buying journey on an AI platforms. We'll build a custom app storefront on ChatGPT that allows customers to discover your products directly from the chat interface.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/e7a63ec8-ab4e-4969-b960-c0bc52a56f3c/images/5356f5eb6ce0ae327d9299a0eef95b02efc7d1bc8cc0d62baeb22c71dcf16635.png",
  }
];

const Card = ({ item, index }) => {
  return (
    <motion.div
      data-testid={`offering-${item.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-[#FDFCFB] border border-[#E2DFD9] p-8 md:p-10 flex flex-col hover:shadow-[0_30px_80px_-30px_rgba(17,17,17,0.2)] transition-shadow duration-500"
    >
      <div className="flex items-start justify-between mb-10">
        <span className="font-serif-display text-5xl font-light text-[#C4A484]">
          {item.number}
        </span>
        <div className="w-28 h-28 bg-[#F3F1ED] overflow-hidden flex items-center justify-center">
          {item.visual === "icon" ? (
            <MessageSquareText size={40} className="text-[#111]" strokeWidth={1.2} />
          ) : (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          )}
        </div>
      </div>

      <h3 className="font-serif-display text-3xl font-normal tracking-tight text-[#111] mb-2">
        {item.title}
      </h3>
      <div className="text-xs uppercase tracking-[0.18em] text-[#6B6A68] mb-6">
        {item.subtitle}
      </div>
      <p className="text-[#6B6A68] leading-relaxed">{item.body}</p>

      <div className="mt-10 pt-6 border-t border-[#E2DFD9] text-xs uppercase tracking-[0.18em] text-[#111] opacity-60 group-hover:opacity-100 transition-opacity">
        — Available from day one
      </div>
    </motion.div>
  );
};

export const Offerings = () => {
  return (
    <section
      id="offerings"
      className="relative py-24 md:py-32 bg-[#FDFCFB]"
      data-testid="offerings-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#6B6A68] mb-6">
              What we ship.
            </div>
            <h2 className="font-serif-display text-4xl md:text-6xl font-light tracking-tight leading-[1.02] text-[#111] max-w-3xl">
              Three products.<br />
              <span className="italic">One conversational commerce stack.</span>
            </h2>
          </div>
          <p className="text-[#6B6A68] max-w-sm text-base leading-relaxed">
            Buy them together or individually. Each plugs into your existing
            commerce stack — no rip-and-replace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {OFFERINGS.map((o, i) => (
            <Card key={o.id} item={o} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;
