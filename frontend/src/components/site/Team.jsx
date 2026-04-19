import { motion } from "framer-motion";

const LOGOS = ["IIT", "BITS", "META", "MICROSOFT", "UBER", "VISA", "CISCO"];

export const Team = () => {
  return (
    <section
      id="team"
      className="relative py-24 md:py-32 bg-[#FDFCFB] border-y border-[#E2DFD9]"
      data-testid="team-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.22em] text-[#6B6A68] mb-6">
              The people behind SuperSearch.
            </div>
            <h2 className="font-serif-display text-4xl md:text-6xl font-light tracking-tight leading-[1.02] text-[#111]">
              Built by operators who've shipped <span className="italic">at planet scale.</span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg text-[#6B6A68] leading-relaxed mb-10">
              Our founding team is a mix of engineers, researchers and product
              builders from the institutions and companies that define modern
              commerce and machine learning.
            </p>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-[#E2DFD9] pt-10">
              {LOGOS.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                  className="font-semibold text-sm tracking-[0.22em] text-[#6B6A68] hover:text-[#111] transition-colors"
                  data-testid={`team-logo-${name.toLowerCase()}`}
                >
                  {name}
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-sm text-[#6B6A68]">
              Alumni of <span className="text-[#111] font-medium">IIT · BITS Pilani · Meta · Microsoft · Uber · Visa · Cisco</span>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
