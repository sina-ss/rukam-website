import { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import DepartmentsContact from "@/components/contact/DepartmentsContact";
import ContactFeatures from "@/components/contact/ContactFeatures";
import ContactForm from "@/components/contact/ContactForm";
import ContactFAQ from "@/components/contact/ContactFAQ";
import { contactTexts } from "@/constants/contact";

export const metadata: Metadata = {
  title: `${contactTexts.page.title} | رکام`,
  description: contactTexts.page.description,
  keywords: [
    "تماس با رکام",
    "پشتیبانی رکام",
    "راه‌های ارتباطی",
    "مشاوره رایگان",
    "تلگرام رکام",
    "ایمیل رکام",
  ],
  openGraph: {
    title: `${contactTexts.page.title} | رکام`,
    description: contactTexts.page.description,
    type: "website",
    locale: "fa_IR",
  },
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Information */}
      <ContactInfo />

      {/* Features Section */}
      <ContactFeatures />

      {/* Departments Contact */}
      <DepartmentsContact />

      {/* Contact Form */}
      <ContactForm />

      {/* FAQ Section */}
      <ContactFAQ />
    </div>
  );
};

export default ContactPage;
