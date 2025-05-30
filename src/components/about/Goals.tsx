import { TrendingUp, Users, DollarSign, CheckCircle } from "lucide-react";
import { aboutTexts } from "@/constants/about-texts";

const Goals = () => {
  const { goals } = aboutTexts;

  const goalIcons = [DollarSign, Users, TrendingUp];

  const getIcon = (index: number) => {
    return goalIcons[index] || CheckCircle;
  };

  const getColorClasses = (index: number) => {
    const colors = [
      "bg-primary/10 text-primary",
      "bg-accent/10 text-accent",
      "bg-brand-teal/10 text-brand-teal",
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              {goals.title}
            </h2>
            <p className="text-lg text-muted-foreground">{goals.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {goals.items.map((goal, index) => {
              const IconComponent = getIcon(index);
              const colorClass = getColorClasses(index);

              return (
                <div
                  key={index}
                  className="group bg-card border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="space-y-6">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-xl ${colorClass}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {goal}
                      </h3>
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>هدف اصلی رکام</span>
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="pt-4 border-t">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-1000 group-hover:w-full"
                          style={{ width: `${(index + 1) * 30}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Note */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-brand-teal/10 rounded-2xl p-8 border">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 space-x-reverse text-primary">
                  <TrendingUp className="h-6 w-6" />
                  <span className="font-semibold">خدمات در حال توسعه</span>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  {goals.note}
                </p>
              </div>
            </div>
          </div>

          {/* Impact Visualization */}
          <div className="mt-16">
            <div className="bg-card border rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-foreground text-center mb-8">
                تأثیرات مثبت سیستم رکام
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">۱۰۰٪</div>
                  <div className="text-sm text-muted-foreground">
                    بدون وجه نقد
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-accent">۱۲</div>
                  <div className="text-sm text-muted-foreground">
                    فاز پیاده‌سازی
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-brand-teal">∞</div>
                  <div className="text-sm text-muted-foreground">
                    فرصت‌های شغلی
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

export default Goals;
