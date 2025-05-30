"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { contactTexts } from "@/constants/contact";

const ContactFAQ = () => {
  const { faq } = contactTexts;
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-accent/10 text-accent border-accent/20">
              <span className="ml-2">❓</span>
              {faq.title}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              {faq.title}
            </h2>
            <p className="text-lg text-muted-foreground">{faq.description}</p>
          </div>

          <div className="space-y-4">
            {faq.items.map((item, index) => (
              <div
                key={index}
                className="bg-card border rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-right flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <HelpCircle className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <div className="bg-muted/30 rounded-lg p-4 mr-11">
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-brand-teal/10 rounded-2xl p-8 border">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  پاسخ سوال خود را پیدا نکردید؟
                </h3>
                <p className="text-muted-foreground">
                  تیم پشتیبانی ما آماده پاسخگویی به سوالات شما است
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://t.me/rokum_ir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    پرسش از پشتیبانی
                  </a>
                  <a
                    href="#contact-form"
                    className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    ارسال پیام
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;
