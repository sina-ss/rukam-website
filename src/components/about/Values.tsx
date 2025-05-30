import {
  Eye,
  Lightbulb,
  Award,
  Shield,
  Heart,
  CheckCircle,
} from "lucide-react";
import { aboutTexts } from "@/constants/about-texts";

const Values = () => {
  const { values, commitmentToYou } = aboutTexts;

  const getIcon = (iconName: string) => {
    const icons = {
      Eye,
      Lightbulb,
      Award,
      Shield,
      Heart,
    };
    return icons[iconName as keyof typeof icons] || Eye;
  };

  const getColorClasses = (index: number) => {
    const colors = [
      "bg-primary/10 text-primary border-primary/20",
      "bg-accent/10 text-accent border-accent/20",
      "bg-brand-teal/10 text-brand-teal border-brand-teal/20",
      "bg-destructive/10 text-destructive border-destructive/20",
      "bg-secondary/50 text-secondary-foreground border-secondary/20",
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Values Section */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              {values.title}
            </h2>
            <p className="text-lg text-muted-foreground">{values.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {values.items.map((value, index) => {
              const IconComponent = getIcon(value.icon);
              const colorClass = getColorClasses(index);

              return (
                <div
                  key={value.title}
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
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>

                    {/* Check Mark */}
                    <div className="pt-4 border-t">
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-primary">
                        <CheckCircle className="h-4 w-4" />
                        <span>تضمین شده</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Commitment Section */}
          <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-brand-teal/5 rounded-2xl p-8 border border-primary/10">
            <div className="text-center space-y-6 mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                {commitmentToYou.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commitmentToYou.items.map((commitment, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 space-x-reverse bg-card/50 rounded-xl p-4 border"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">
                    {commitment}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="bg-card border rounded-2xl p-8 shadow-sm">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    ارزش‌های ما، تضمین کیفیت خدمات
                  </h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    رکام با پایبندی به این ارزش‌ها، بهترین خدمات را به شما ارائه
                    می‌دهد
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/departments"
                    className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium"
                  >
                    مشاهده خدمات
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors text-lg font-medium"
                  >
                    تماس با ما
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

export default Values;
