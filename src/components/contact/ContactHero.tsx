import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { contactTexts } from "@/constants/contact";

const ContactHero = () => {
  const { hero } = contactTexts;

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              <span className="ml-2">📞</span>
              {hero.badge}
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              همیشه <span className="text-primary">{hero.titleHighlight}</span>{" "}
              شما هستیم
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {hero.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a
                href="https://t.me/rokum_ir"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {hero.cta}
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8"
              asChild
            >
              <a href="#contact-form">ارسال پیام</a>
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="relative mt-16">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>

            <div className="bg-card border rounded-2xl p-8 shadow-sm relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">۲۴/۷</div>
                  <div className="text-sm text-muted-foreground">
                    پاسخگویی تلگرام
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-accent">۶</div>
                  <div className="text-sm text-muted-foreground">
                    دپارتمان تخصصی
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-brand-teal">∞</div>
                  <div className="text-sm text-muted-foreground">
                    راه‌حل برای شما
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
