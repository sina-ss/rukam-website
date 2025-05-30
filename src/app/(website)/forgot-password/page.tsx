"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, Shield, CheckCircle } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Password reset request for:", email);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center space-y-6 mb-8">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                ایمیل ارسال شد
              </h1>
              <p className="text-muted-foreground">
                لینک بازیابی رمز عبور به ایمیل شما ارسال شد
              </p>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-8 shadow-sm space-y-6">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                <p className="text-primary text-sm">
                  📧 لینک بازیابی به آدرس <strong>{email}</strong> ارسال شد
                </p>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• ایمیل خود را بررسی کنید</p>
                <p>• پوشه اسپم را نیز چک کنید</p>
                <p>• لینک تا ۲۴ ساعت معتبر است</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                variant="outline"
                className="w-full"
              >
                ارسال مجدد ایمیل
              </Button>

              <Button asChild className="w-full">
                <Link href="/login">بازگشت به صفحه ورود</Link>
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 space-x-reverse text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
              <span>بازگشت به صفحه اصلی</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center space-y-6 mb-8">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl">
              ر
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              فراموشی رمز عبور
            </h1>
            <p className="text-muted-foreground">
              ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود
            </p>
          </div>
        </div>

        {/* Reset Form */}
        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                آدرس ایمیل *
              </label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full pl-10"
                  dir="ltr"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                ایمیلی که هنگام ثبت نام استفاده کرده‌اید را وارد کنید
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                "در حال ارسال..."
              ) : (
                <>
                  ارسال لینک بازیابی
                  <Mail className="mr-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-muted"></div>
            <span className="px-4 text-sm text-muted-foreground">یا</span>
            <div className="flex-1 border-t border-muted"></div>
          </div>

          {/* Back to Login */}
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              رمز عبور خود را به خاطر آوردید؟{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                وارد شوید
              </Link>
            </p>

            <p className="text-muted-foreground">
              حساب کاربری ندارید؟{" "}
              <Link
                href="/register"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                ثبت نام کنید
              </Link>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 bg-primary/10 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center space-x-2 space-x-reverse text-primary">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-medium">امنیت حساب کاربری</span>
          </div>
          <p className="text-primary/80 text-sm mt-2">
            لینک بازیابی تنها ۲۴ ساعت معتبر است و پس از استفاده غیرفعال می‌شود
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 space-x-reverse text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            <span>بازگشت به صفحه اصلی</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
