const WORDS = [
  "Fashion",
  "Jewellery",
  "Furniture",
  "Beauty",
  "Electronics",
  "Office Supplies",
  "Bags & Shoes",
  "Home Décor",
  "Grocery",
  "Pet Care",
  "Sports",
  "Books",
];

export const Marquee = () => {
  const items = [...WORDS, ...WORDS];
  return (
    <section
      className="relative py-20 md:py-28 bg-[#111] text-white overflow-hidden"
      data-testid="marquee-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
        <div className="text-xs uppercase tracking-[0.22em] text-white/60 mb-4">
          Wherever your catalog lives.
        </div>
        <h2 className="font-serif-display text-4xl md:text-6xl font-light tracking-tight leading-[1.02]">
          We cater to every company<br />
          across <span className="italic text-[#C4A484]">every industry.</span>
        </h2>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
          {items.map((w, i) => (
            <span
              key={i}
              className="font-serif-display text-5xl md:text-7xl font-light text-white/15 hover:text-white transition-colors"
            >
              {w} <span className="text-[#C4A484] mx-6">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
