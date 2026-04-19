export const Footer = () => {
  return (
    <footer
      className="bg-[#111] text-white py-16"
      data-testid="site-footer"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-12">
          <div>
            <div className="font-serif-display text-5xl md:text-7xl font-light tracking-tight leading-none">
              SuperSearch
            </div>
            <div className="text-xs uppercase tracking-[0.22em] text-white/60 mt-4">
              Conversational commerce, engineered.
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-10 text-sm">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/50 mb-3">Product</div>
              <ul className="space-y-2 text-white/80">
                <li><a href="#offerings" className="hover:text-[#C4A484]">AI Shopping Assistant</a></li>
                <li><a href="#offerings" className="hover:text-[#C4A484]">Catalog Enrichment</a></li>
                <li><a href="#offerings" className="hover:text-[#C4A484]">Knowledge Graph</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/50 mb-3">Company</div>
              <ul className="space-y-2 text-white/80">
                <li><a href="#team" className="hover:text-[#C4A484]">Team</a></li>
                <li><a href="#industries" className="hover:text-[#C4A484]">Industries</a></li>
                <li><a href="#contact" className="hover:text-[#C4A484]">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} SuperSearch. All rights reserved.</div>
          <div>Made with intent.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
