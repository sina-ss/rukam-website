import { departmentsTexts } from "@/constants/departments-texts";

const DepartmentsHero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
            <span className="ml-2">🏢</span>
            {departmentsTexts.page.title}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {departmentsTexts.page.subtitle}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {departmentsTexts.page.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DepartmentsHero;
