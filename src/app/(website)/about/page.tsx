import { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import CompanyInfo from "@/components/about/CompanyInfo";
import MissionVision from "@/components/about/MissionVision";
import Goals from "@/components/about/Goals";
import Values from "@/components/about/Values";
import Warning from "@/components/about/Warning";
import { aboutTexts } from "@/constants/about-texts";

export const metadata: Metadata = {
  title: `${aboutTexts.page.title} | رکام`,
  description: aboutTexts.page.description,
  keywords: [
    "درباره رکام",
    "شرکت پویا نمای طوس",
    "نگاه نو اقتصاد نو",
    "خرید و فروش بدون وجه نقد",
    "ماموریت رکام",
    "چشم انداز رکام",
    "ارزش های رکام",
  ],
  openGraph: {
    title: `${aboutTexts.page.title} | رکام`,
    description: aboutTexts.page.description,
    type: "website",
    locale: "fa_IR",
  },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <AboutHero />

      {/* Company Information */}
      <CompanyInfo />

      {/* Mission, Vision & Commitment */}
      <MissionVision />

      {/* Goals Section */}
      <Goals />

      {/* Values Section */}
      <Values />

      {/* Warning Section */}
      <Warning />
    </div>
  );
};

export default AboutPage;
