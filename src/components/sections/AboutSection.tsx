import { Button } from "@/components/ui/button";
import { Target, Eye, Heart } from "lucide-react";
import { homeTexts } from "@/constants/home-texts";

const AboutSection = () => {
  const { about } = homeTexts;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-accent/10 text-accent border-accent/20">
                <span className="ml-2">💡</span>
                {about.badge}
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {about.title.split(about.titleHighlight)[0]}
                <span className="text-primary">{about.titleHighlight}</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {about.description1}
              </p>

              <p className="text-muted-foreground leading-relaxed">
                {about.description2}
              </p>

              <p className="text-muted-foreground leading-relaxed">
                {about.description3}
              </p>
            </div>

            <Button size="lg" className="text-lg px-8">
              {about.cta}
            </Button>
          </div>

          {/* Visual Elements */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-6">
              {/* Mission Card */}
              <div className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {about.mission.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {about.mission.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="p-3 bg-accent/10 rounded-xl">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {about.vision.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {about.vision.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Values Card */}
              <div className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="p-3 bg-brand-teal/10 rounded-xl">
                    <Heart className="h-6 w-6 text-brand-teal" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {about.values.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {about.values.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
