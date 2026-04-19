import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Stats from "@/components/site/Stats";
import IndustryShowcase from "@/components/site/IndustryShowcase";
import Marquee from "@/components/site/Marquee";
import Offerings from "@/components/site/Offerings";
import Team from "@/components/site/Team";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <main className="bg-[#FDFCFB] text-[#111] font-sans-body" data-testid="home-page">
      <Navbar />
      <Hero />
      <Stats />
      <IndustryShowcase />
      <Marquee />
      <Offerings />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
