import { Target, Eye, HandHeart } from "lucide-react";
import { aboutTexts } from "@/constants/about-texts";

const MissionVision = () => {
  const { mission, vision, commitment } = aboutTexts;

  const sections = [
    {
      ...mission,
      icon: Target,
      color: "primary",
    },
    {
      ...vision,
      icon: Eye,
      color: "accent",
    },
    {
      ...commitment,
      icon: HandHeart,
      color: "brand-teal",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: "bg-primary/10 text-primary border-primary/20",
      accent: "bg-accent/10 text-accent border-accent/20",
      "brand-teal": "bg-brand-teal/10 text-brand-teal border-brand-teal/20",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              ماموریت، چشم‌انداز و تعهد ما
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              رکام با اهداف مشخص و برنامه‌ریزی دقیق، آینده‌ای روشن برای اقتصاد
              کشور ترسیم می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              const colorClass = getColorClasses(section.color);

              return (
                <div
                  key={section.title}
                  className="group bg-card border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="space-y-6">
                    {/* Icon */}
                    <div
                      className={`inline-flex p-4 rounded-xl border ${colorClass}`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.description}
                      </p>
                    </div>

                    {/* Decorative Element */}
                    <div className="pt-4 border-t">
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>رکام</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Quote */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-brand-teal/5 rounded-2xl p-8 border border-primary/10">
              <blockquote className="text-2xl font-bold text-foreground mb-4">
                "نگاه نو، اقتصاد نو"
              </blockquote>
              <p className="text-muted-foreground">
                شعار رکام برای ایجاد تحولی بنیادین در اقتصاد کشور
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
