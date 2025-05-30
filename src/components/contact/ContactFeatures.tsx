import { Zap, Users, Clock, Gift } from "lucide-react";
import { contactTexts } from "@/constants/contact";

const ContactFeatures = () => {
  const { features } = contactTexts;

  const getIcon = (iconName: string) => {
    const icons = {
      Zap,
      Users,
      Clock,
      Gift,
    };
    return icons[iconName as keyof typeof icons] || Zap;
  };

  const getColorClasses = (index: number) => {
    const colors = [
      "bg-primary/10 text-primary",
      "bg-accent/10 text-accent",
      "bg-brand-teal/10 text-brand-teal",
      "bg-destructive/10 text-destructive",
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            {features.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.items.map((feature, index) => {
            const IconComponent = getIcon(feature.icon);
            const colorClass = getColorClasses(index);

            return (
              <div
                key={index}
                className="group bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="space-y-4">
                  <div className={`inline-flex p-4 rounded-xl ${colorClass}`}>
                    <IconComponent className="h-8 w-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-brand-teal/10 rounded-2xl p-8 border">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">
                  {contactTexts.cta.title}
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {contactTexts.cta.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://t.me/rokum_ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium"
                >
                  {contactTexts.cta.primaryButton}
                </a>
                <a
                  href="/departments"
                  className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors text-lg font-medium"
                >
                  {contactTexts.cta.secondaryButton}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFeatures;
