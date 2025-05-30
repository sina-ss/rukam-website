import { CheckCircle } from "lucide-react";
import { departmentsTexts } from "@/constants/departments-texts";

const CommonBenefits = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-brand-teal/10 rounded-2xl p-8 border">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          {departmentsTexts.commonBenefits.title}
        </h2>
        <p className="text-lg text-muted-foreground">
          {departmentsTexts.commonBenefits.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {departmentsTexts.commonBenefits.features.map((feature, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="p-3 bg-background rounded-xl w-fit mx-auto">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <p className="text-2xl font-bold text-primary">
            {departmentsTexts.commonBenefits.slogan}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommonBenefits;
