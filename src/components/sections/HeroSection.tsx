import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, TrendingUp, Shield } from "lucide-react";
import { homeTexts } from "@/constants/home-texts";

const HeroSection = () => {
  const { hero } = homeTexts;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
                <span className="ml-2">🚀</span>
                {hero.badge}
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                {hero.title.split(hero.titleHighlight)[0]}
                <span className="text-primary">{hero.titleHighlight}</span>
                {hero.title.split(hero.titleHighlight)[1]}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {hero.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                {hero.ctaPrimary}
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                {hero.ctaSecondary}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {hero.stats.phases.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {hero.stats.phases.label}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {hero.stats.departments.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {hero.stats.departments.label}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {hero.stats.opportunities.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {hero.stats.opportunities.label}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Feature Cards */}
              <div className="space-y-4">
                <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">
                      {hero.features.economy.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {hero.features.economy.description}
                  </p>
                </div>

                <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-semibold">
                      {hero.features.employment.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {hero.features.employment.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <div className="p-2 bg-brand-teal/10 rounded-lg">
                      <Shield className="h-5 w-5 text-brand-teal" />
                    </div>
                    <h3 className="font-semibold">
                      {hero.features.security.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {hero.features.security.description}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-accent/10 border rounded-xl p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      +
                    </div>
                    <p className="text-sm font-medium">
                      {hero.features.transactions.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
