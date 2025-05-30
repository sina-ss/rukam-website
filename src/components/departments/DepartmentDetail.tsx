import { CheckCircle } from "lucide-react";

interface DepartmentDetailProps {
  department: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    quote?: string;
    future?: {
      title: string;
      description: string;
    };
    products?: {
      title: string;
      items: string[];
    };
    services?:
      | Array<{
          title: string;
          description?: string;
          items?: string[];
          subsections?: Array<{
            title: string;
            description?: string;
            items?: string[];
          }>;
        }>
      | {
          title: string;
          description: string;
        };
    fields?: {
      title: string;
      items: string[];
    };
    activities?: {
      title: string;
      items: string[];
    };
    certificates?: {
      title: string;
      items: string[];
    };
    location?: {
      title: string;
      description: string;
    };
    features?: {
      title: string;
      description: string;
      additional?: string;
    };
    paymentNote?: string;
    arbitrationNote?: string;
    cta?: string;
    [key: string]: any;
  };
}

const DepartmentDetail = ({ department: dept }: DepartmentDetailProps) => {
  const IconComponent = dept.icon;

  return (
    <div className="space-y-8">
      {/* Department Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <IconComponent className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground">{dept.title}</h2>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          {dept.description}
        </p>
        {dept.quote && (
          <blockquote className="text-xl font-medium text-primary italic border-r-4 border-primary pr-4 mr-4">
            {dept.quote}
          </blockquote>
        )}
      </div>

      {/* Department Specific Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Business Department */}
        {dept.id === "business" && (
          <>
            <div className="space-y-6">
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {dept.future?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {dept.future?.description}
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border rounded-2xl p-6">
                <p className="text-primary font-medium text-center">
                  {dept.cta}
                </p>
              </div>
            </div>
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                {dept.products?.title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {dept.products?.items.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 space-x-reverse"
                  >
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Legal Department */}
        {dept.id === "legal" && (
          <div className="lg:col-span-2 space-y-6">
            {Array.isArray(dept.services) &&
              dept.services.map((service: any, serviceIndex: number) => (
                <div
                  key={serviceIndex}
                  className="bg-card border rounded-2xl p-6"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                  )}
                  {service.items && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.items.map((item: string, itemIndex: number) => (
                        <div
                          key={itemIndex}
                          className="flex items-center space-x-2 space-x-reverse"
                        >
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground text-sm">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {service.subsections && (
                    <div className="space-y-4 mt-4">
                      {service.subsections.map(
                        (subsection: any, subIndex: number) => (
                          <div
                            key={subIndex}
                            className="bg-muted/30 rounded-xl p-4"
                          >
                            <h4 className="font-medium mb-2">
                              {subsection.title}
                            </h4>
                            {subsection.description && (
                              <p className="text-muted-foreground text-sm mb-2">
                                {subsection.description}
                              </p>
                            )}
                            {subsection.items && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                {subsection.items.map(
                                  (item: string, itemIndex: number) => (
                                    <div
                                      key={itemIndex}
                                      className="flex items-center space-x-2 space-x-reverse"
                                    >
                                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                                      <span className="text-muted-foreground text-sm">
                                        {item}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}

            {/* Legal Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                <p className="text-primary text-sm font-medium">
                  💰 {dept.paymentNote}
                </p>
              </div>
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                <p className="text-accent text-sm font-medium">
                  ⚖️ {dept.arbitrationNote}
                </p>
              </div>
            </div>

            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                {dept.future?.title}
              </h3>
              <p className="text-muted-foreground">
                {dept.future?.description}
              </p>
            </div>
          </div>
        )}

        {/* Education Department */}
        {dept.id === "education" && (
          <>
            <div className="space-y-6">
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {dept.fields?.title}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {dept.fields?.items.map((item: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {dept.activities?.title}
                </h3>
                <div className="space-y-2">
                  {dept.activities?.items.map((item: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {dept.certificates?.title}
                </h3>
                <div className="space-y-2">
                  {dept.certificates?.items.map(
                    (item: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <CheckCircle className="h-4 w-4 text-brand-teal" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="bg-card border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {dept.location?.title}
                </h3>
                <p className="text-muted-foreground">
                  {dept.location?.description}
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                <p className="text-primary text-sm font-medium">
                  💰 {dept.paymentNote}
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border rounded-2xl p-6">
                <p className="text-primary font-medium text-center">
                  {dept.quote}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Health Department */}
        {dept.id === "health" && (
          <>
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                {!Array.isArray(dept.services) && dept.services?.title}
              </h3>
              <p className="text-muted-foreground">
                {!Array.isArray(dept.services) && dept.services?.description}
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {dept.future?.title}
                </h3>
                <p className="text-muted-foreground">
                  {dept.future?.description}
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border rounded-2xl p-6">
                <p className="text-primary font-medium text-center">
                  {dept.quote}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Cultural Department */}
        {dept.id === "cultural" && (
          <>
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                {dept.future?.title}
              </h3>
              <p className="text-muted-foreground">
                {dept.future?.description}
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border rounded-2xl p-6 flex items-center justify-center">
              <p className="text-primary font-medium text-center">
                رکام در خدمت هنرمندان و اندیشمندان
              </p>
            </div>
          </>
        )}

        {/* IT Department */}
        {dept.id === "it" && (
          <>
            <div className="space-y-6">
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {dept.features?.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {dept.features?.description}
                </p>
                <p className="text-muted-foreground">
                  {dept.features?.additional}
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {dept.future?.title}
                </h3>
                <p className="text-muted-foreground">
                  {dept.future?.description}
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border rounded-2xl p-6">
                <p className="text-primary font-medium text-center">
                  {dept.quote}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DepartmentDetail;
