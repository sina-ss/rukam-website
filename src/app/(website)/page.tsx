import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import DepartmentsSection from "@/components/sections/DepartmentsSection";
import NewsSection from "@/components/sections/NewsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <DepartmentsSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
