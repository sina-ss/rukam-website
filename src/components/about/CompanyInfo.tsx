import { Building2, Calendar, Hash } from "lucide-react";
import { aboutTexts } from "@/constants/about-texts";

const CompanyInfo = () => {
  const { company } = aboutTexts;

  const getIcon = (index: number) => {
    const icons = [Hash, Calendar, Hash];
    return icons[index] || Hash;
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              {company.title}
            </h2>
            <p className="text-lg text-muted-foreground">{company.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Company Type */}
            <div className="space-y-6">
              <div className="bg-card border rounded-2xl p-8 shadow-sm">
                <div className="flex items-center space-x-4 space-x-reverse mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      نوع شرکت
                    </h3>
                    <p className="text-muted-foreground">وضعیت حقوقی</p>
                  </div>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-primary font-semibold text-lg">
                    {company.type}
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                مشخصات ثبتی
              </h3>
              <div className="space-y-4">
                {company.details.map((detail, index) => {
                  const IconComponent = getIcon(index);
                  return (
                    <div
                      key={detail.label}
                      className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="p-2 bg-accent/10 rounded-lg">
                            <IconComponent className="h-5 w-5 text-accent" />
                          </div>
                          <span className="font-medium text-foreground">
                            {detail.label}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          {detail.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-brand-teal/10 rounded-2xl p-8 border">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 space-x-reverse text-primary">
                  <Building2 className="h-6 w-6" />
                  <span className="font-semibold">شرکت معتبر و ثبت شده</span>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  رکام به عنوان یک شرکت سهامی خاص، با رعایت تمام قوانین و مقررات
                  کشور، خدمات خود را ارائه می‌دهد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
