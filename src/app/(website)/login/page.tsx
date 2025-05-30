"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Eye, EyeOff, LogIn, ArrowRight, Shield, Loader2 } from "lucide-react";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { authService, type LoginData } from "@/services/auth";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Check if already authenticated on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const isAuthenticated = authService.isAuthenticated();
        if (isAuthenticated) {
          // Get redirect URL from query params or default to admin
          const redirectTo = searchParams.get("redirect") || "/admin";
          router.push(redirectTo);
          return;
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router, searchParams]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const apiData: LoginData = {
        email: data.email,
        password: data.password,
      };

      const response = await authService.login(apiData);

      if (response.success) {
        toast.success("ورود موفقیت‌آمیز!", {
          description: "به پنل مدیریت خوش آمدید.",
          duration: 2000,
        });
        reset();

        // Get redirect URL from query params or default to admin
        const redirectTo = searchParams.get("redirect") || "/admin";
        router.push(redirectTo);
      } else {
        toast.error("خطا در ورود", {
          description: response.message || "ایمیل یا رمز عبور اشتباه است.",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("خطا در ورود", {
        description: "لطفاً دوباره تلاش کنید.",
        duration: 4000,
      });
    }
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">در حال بررسی احراز هویت...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
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
                ورود به رکام
              </h1>
              <p className="text-muted-foreground">
                به حساب کاربری خود وارد شوید
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-card border rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  ایمیل *
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="example@email.com"
                  className={`w-full ${
                    errors.email ? "border-destructive" : ""
                  }`}
                  dir="ltr"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground"
                >
                  رمز عبور *
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="رمز عبور خود را وارد کنید"
                    className={`w-full pl-10 ${
                      errors.password ? "border-destructive" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  فراموشی رمز عبور؟
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    در حال ورود...
                  </>
                ) : (
                  <>
                    ورود
                    <LogIn className="mr-2 h-5 w-5" />
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

            {/* Register Link */}
            <div className="text-center space-y-4">
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
              <span className="text-sm font-medium">امنیت اطلاعات</span>
            </div>
            <p className="text-primary/80 text-sm mt-2">
              اطلاعات شما با بالاترین استانداردهای امنیتی محافظت می‌شود
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
    </>
  );
};

export default LoginPage;
