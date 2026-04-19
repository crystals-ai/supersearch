import { motion } from "framer-motion";

const STATS = [
  {
    value: "58%",
    label: "of consumers",
    desc: "prefer AI shopping assistants over keyword search — up from just 25% in 2023.",
    testid: "stat-preference",
  },
  {
    value: "4×",
    label: "higher conversion",
    desc: "for conversational search vs keyword search: 12.3% vs 3.1% (Rep AI).",
    testid: "stat-conversion",
  },
  {
    value: "35%",
    label: "of queries",
    desc: "are now complete sentences. 7–8 word queries have nearly doubled since ChatGPT launched (Search Engine Land).",
    testid: "stat-queries",
  },
  {
    value: "82%",
    label: "of shoppers",
    desc: "want AI shopping assistants to reduce the time spent researching what to buy.",
    testid: "stat-time",
  },
];

export const Stats = () => {
  return (
    <section
      id="mission"
      className="relative py-24 md:py-32 bg-[#FDFCFB] border-y border-[#E2DFD9]"
      data-testid="stats-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#6B6A68] mb-6">
              The shift is measurable.
            </div>
            <h2 className="font-serif-display text-4xl md:text-6xl font-light tracking-tight leading-[1.02] text-[#111] max-w-3xl">
              Conversational search<br />is the new norm.
            </h2>
          </div>
          <p className="text-[#6B6A68] max-w-sm text-base leading-relaxed">
            The data is unambiguous. Buyers want to talk to their storefront
            the way they talk to a friend — and they reward retailers who listen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.testid}
              data-testid={s.testid}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 border-t border-[#111] pt-6"
            >
              <div className="font-serif-display text-7xl md:text-8xl font-light text-[#111] leading-none tracking-tighter">
                {s.value}
              </div>
              <div className="text-sm uppercase tracking-[0.18em] text-[#111]">
                {s.label}
              </div>
              <p className="text-sm text-[#6B6A68] leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
