import {
  Building2,
  Scale,
  GraduationCap,
  Heart,
  Palette,
  Monitor,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { contactTexts } from "@/constants/contact";

const DepartmentsContact = () => {
  const { departments } = contactTexts;

  const departmentIcons = [
    Building2,
    Scale,
    GraduationCap,
    Heart,
    Palette,
    Monitor,
  ];

  const departmentColors = [
    "primary",
    "accent",
    "brand-teal",
    "destructive",
    "secondary",
    "muted",
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: "bg-primary/10 text-primary border-primary/20",
      accent: "bg-accent/10 text-accent border-accent/20",
      "brand-teal": "bg-brand-teal/10 text-brand-teal border-brand-teal/20",
      destructive: "bg-destructive/10 text-destructive border-destructive/20",
      secondary:
        "bg-secondary/50 text-secondary-foreground border-secondary/20",
      muted: "bg-muted text-muted-foreground border-muted-foreground/20",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            {departments.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {departments.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.items.map((dept, index) => {
            const IconComponent = departmentIcons[index];
            const colorClass = getColorClasses(departmentColors[index]);

            return (
              <div
                key={dept.name}
                className="group bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="space-y-6">
                  {/* Department Icon */}
                  <div
                    className={`inline-flex p-4 rounded-xl border ${colorClass}`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>

                  {/* Department Info */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {dept.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {dept.description}
                    </p>
                  </div>

                  {/* Contact Button */}
                  <div className="pt-4 border-t">
                    <a
                      href={`https://t.me/${dept.contact.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center justify-between w-full p-3 bg-muted/50 hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">
                          {dept.contact}
                        </span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* General Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-brand-teal/10 rounded-2xl p-8 border">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                سوال عمومی دارید؟
              </h3>
              <p className="text-muted-foreground">
                برای سوالات عمومی و راهنمایی اولیه با کانال اصلی ما تماس بگیرید
              </p>
              <a
                href="https://t.me/rokum_ir"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 space-x-reverse bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>تماس با پشتیبانی عمومی</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepartmentsContact;
