import { Button } from "@/components/ui/button";
import { Users, Building2 } from "lucide-react";
import { aboutTexts } from "@/constants/about-texts";

const AboutHero = () => {
  const { hero, stats } = aboutTexts;

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              <span className="ml-2">🏢</span>
              {hero.badge}
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              نگاه نو،{" "}
              <span className="text-primary">{hero.titleHighlight}</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {hero.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/departments">
                <Users className="mr-2 h-5 w-5" />
                {hero.cta}
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8"
              asChild
            >
              <a href="/contact">تماس با ما</a>
            </Button>
          </div>

          {/* Statistics */}
          <div className="relative mt-16">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>

            <div className="bg-card border rounded-2xl p-8 shadow-sm relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {stats.phases.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stats.phases.label}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-accent">
                    {stats.departments.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stats.departments.label}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-brand-teal">
                    {stats.services.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stats.services.label}
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

export default AboutHero;
