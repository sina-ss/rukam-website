import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Building2,
  Scale,
  GraduationCap,
  Heart,
  Palette,
  Monitor,
  ArrowLeft,
} from "lucide-react";
import { homeTexts } from "@/constants/home-texts";

const DepartmentsSection = () => {
  const { departments } = homeTexts;

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

  const departmentsWithMeta = departments.items.map((dept, index) => ({
    ...dept,
    id: index + 1,
    icon: departmentIcons[index],
    color: departmentColors[index],
    href: `/departments/${dept.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace("رکام", "")
      .trim()}`,
  }));

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
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
            <span className="ml-2">🏢</span>
            {departments.badge}
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            {departments.title.split(departments.titleHighlight)[0]}
            <span className="text-primary">{departments.titleHighlight}</span>
            {departments.title.split(departments.titleHighlight)[1]}
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {departments.description}
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departmentsWithMeta.map((dept) => {
            const IconComponent = dept.icon;
            return (
              <div
                key={dept.id}
                className="group bg-card border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-xl border ${getColorClasses(
                      dept.color
                    )}`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {dept.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {dept.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-primary/10 transition-colors"
                    asChild
                  >
                    <Link href="/departments">
                      {departments.cta}
                      <ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-brand-teal/10 rounded-2xl p-8 border">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                {departments.bottomCta.title}
              </h3>
              <p className="text-muted-foreground">
                {departments.bottomCta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/register">
                    {departments.bottomCta.primaryButton}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8"
                  asChild
                >
                  <Link href="/contact">
                    {departments.bottomCta.secondaryButton}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
