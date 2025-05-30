import { AlertTriangle, Shield, Phone } from "lucide-react";
import { aboutTexts } from "@/constants/about-texts";

const Warning = () => {
  const { warning } = aboutTexts;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8 shadow-sm">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-3 bg-destructive/20 rounded-xl">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-destructive">
                    {warning.title}
                  </h2>
                  <p className="text-destructive/80">
                    لطفاً این موارد را جدی بگیرید
                  </p>
                </div>
              </div>

              {/* Warning Content */}
              <div className="bg-card/50 border rounded-xl p-6">
                <p className="text-foreground leading-relaxed text-lg">
                  {warning.content}
                </p>
              </div>

              {/* Action Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-xl p-6">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      کانال‌های رسمی
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    تنها از طریق این سایت و کانال‌های رسمی با ما در ارتباط باشید
                  </p>
                  <a
                    href="https://t.me/rokum_ir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 space-x-reverse text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>@rokum_ir</span>
                    <Phone className="h-4 w-4" />
                  </a>
                </div>

                <div className="bg-card border rounded-xl p-6">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      گزارش تخلف
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    در صورت مشاهده نمایندگان غیرمجاز، حتماً گزارش دهید
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center space-x-2 space-x-reverse text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <span>گزارش تخلف</span>
                    <AlertTriangle className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Bottom Note */}
              <div className="bg-destructive/5 border border-destructive/10 rounded-lg p-4">
                <p className="text-destructive text-center font-medium">
                  ⚖️ قطعاً پیگیری قضایی خواهد شد
                </p>
              </div>
            </div>
          </div>

          {/* Verification Section */}
          <div className="mt-12 bg-card border rounded-2xl p-8 shadow-sm">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 space-x-reverse text-primary">
                <Shield className="h-6 w-6" />
                <span className="font-semibold text-lg">تأیید هویت رسمی</span>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                برای اطمینان از صحت ارتباط، همیشه از طریق سایت رسمی رکام و
                کانال‌های تأیید شده با ما در تماس باشید
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  سایت رسمی رکام
                </a>
                <a
                  href="https://t.me/rokum_ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  کانال رسمی تلگرام
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Warning;
