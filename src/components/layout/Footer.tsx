import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                ر
              </div>
              <span className="text-xl font-bold text-foreground">رکام</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              رکام با شعار «نگاه نو، اقتصاد نو» طرح بین‌المللی خرید و فروش بدون
              وجه نقد را در کنار شما ایجاد کردیم.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              دسترسی سریع
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  عضویت
                </Link>
              </li>
            </ul>
          </div>

          {/* Departments */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              دپارتمان‌ها
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/departments/business"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  بازرگانی رکام
                </Link>
              </li>
              <li>
                <Link
                  href="/departments/legal"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  حقوقی رکام
                </Link>
              </li>
              <li>
                <Link
                  href="/departments/education"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  آموزش رکام
                </Link>
              </li>
              <li>
                <Link
                  href="/departments/health"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  بهداشت و سلامت
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              تماس با ما
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                برای ارتباط کافیست شماره ارتباطی خود را برای ما ارسال کنید.
              </p>
            </div>
          </div>
        </div>

        {/* Warning Section */}
        <div className="mt-8 pt-8 border-t">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive font-medium">
              ⚠️ توجه مهم: رکام هیچ‌گونه کارگزار و نماینده‌ای خارج از این سایت
              ندارد. چنانچه شخص یا اشخاصی خود را نماینده یا کارگزار رکام معرفی
              نمودند، حتماً اطلاع دهید.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} رکام. کلیه‌ی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
