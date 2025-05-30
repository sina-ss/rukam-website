import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";
import { contactTexts } from "@/constants/contact";

const ContactInfo = () => {
  const { contactInfo, workingHours } = contactTexts;

  const getIcon = (iconName: string) => {
    const icons = {
      MessageCircle,
      Mail,
      Phone,
      MapPin,
    };
    return icons[iconName as keyof typeof icons] || MessageCircle;
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className="lg:col-span-2 space-y-8">
            <div className="text-center lg:text-right space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                {contactInfo.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {contactInfo.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.methods.map((method) => {
                const IconComponent = getIcon(method.icon);
                return (
                  <div
                    key={method.id}
                    className={`group bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
                      method.primary ? "border-primary/20 bg-primary/5" : ""
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div
                          className={`p-3 rounded-xl ${
                            method.primary
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {method.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {method.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">
                            {method.value}
                          </span>
                          {method.link !== "#" && (
                            <a
                              href={method.link}
                              target={
                                method.link.startsWith("http")
                                  ? "_blank"
                                  : "_self"
                              }
                              rel={
                                method.link.startsWith("http")
                                  ? "noopener noreferrer"
                                  : ""
                              }
                              className="text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-6">
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-3 bg-accent/10 rounded-xl">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {workingHours.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {workingHours.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {workingHours.schedule.map((schedule, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        schedule.type === "closed"
                          ? "bg-destructive/10 text-destructive"
                          : schedule.type === "half"
                          ? "bg-accent/10 text-accent"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <span className="font-medium">{schedule.days}</span>
                      <span className="text-sm">{schedule.hours}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-brand-teal/10 border border-brand-teal/20 rounded-lg p-3">
                  <p className="text-brand-teal text-sm font-medium text-center">
                    💬 {workingHours.note}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border rounded-2xl p-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  آمار تماس‌ها
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">۹۵٪</div>
                    <div className="text-xs text-muted-foreground">
                      رضایت مشتریان
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-accent">
                      ۲ دقیقه
                    </div>
                    <div className="text-xs text-muted-foreground">
                      متوسط پاسخگویی
                    </div>
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

export default ContactInfo;
