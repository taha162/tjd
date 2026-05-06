import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ExperienceSection from "@/sections/ExperienceSection";
import WorksSection from "@/sections/WorksSection";
import GallerySection from "@/sections/GallerySection";
import ContactSection from "@/sections/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <WorksSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
