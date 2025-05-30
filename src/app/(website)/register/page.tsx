"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import {
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
  Shield,
  CheckCircle,
  Building2,
  Loader2,
} from "lucide-react";
import { registerSchema, type RegisterFormData } from "@/schemas/auth";
import { authService, type RegisterData } from "@/services/auth";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Transform form data to match API requirements
      const apiData: RegisterData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      };

      const response = await authService.register(apiData);

      if (response.success) {
        toast.success("ثبت نام با موفقیت انجام شد!", {
          description: "اکنون می‌توانید وارد حساب کاربری خود شوید.",
          duration: 5000,
        });
        reset();
        // Redirect to login page after successful registration
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error("خطا در ثبت نام", {
          description: response.message || "لطفاً دوباره تلاش کنید.",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("خطا در ثبت نام", {
        description: "لطفاً دوباره تلاش کنید.",
        duration: 4000,
      });
    }
  };

  const departments = [
    "بازرگانی رکام",
    "حقوقی رکام",
    "آموزش رکام",
    "بهداشت و ارتقاء سلامت رکام",
    "فرهنگی، هنری، اجتماعی رکام",
    "فن‌آوری اطلاعات رکام",
  ];

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center space-y-6 mb-8">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl">
                ر
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                عضویت در رکام
              </h1>
              <p className="text-muted-foreground">
                برای عضویت در رکام، اطلاعات خود را وارد کنید
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-card border rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2 space-x-reverse">
                  <UserPlus className="h-5 w-5" />
                  <span>اطلاعات شخصی</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-foreground"
                    >
                      نام *
                    </label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="نام خود را وارد کنید"
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-foreground"
                    >
                      نام خانوادگی *
                    </label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      placeholder="نام خانوادگی خود را وارد کنید"
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

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
                    className={errors.email ? "border-destructive" : ""}
                    dir="ltr"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2 space-x-reverse">
                  <Shield className="h-5 w-5" />
                  <span>رمز عبور</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        placeholder="حداقل ۸ کاراکتر"
                        className={`pl-10 ${
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

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-foreground"
                    >
                      تکرار رمز عبور *
                    </label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        placeholder="رمز عبور را مجدداً وارد کنید"
                        className={`pl-10 ${
                          errors.confirmPassword ? "border-destructive" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
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
                    در حال ثبت نام...
                  </>
                ) : (
                  <>
                    ثبت نام
                    <UserPlus className="mr-2 h-5 w-5" />
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

            {/* Login Link */}
            <div className="text-center">
              <p className="text-muted-foreground">
                قبلاً ثبت نام کرده‌اید؟{" "}
                <Link
                  href="/login"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  وارد شوید
                </Link>
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-6 bg-gradient-to-r from-primary/10 via-accent/10 to-brand-teal/10 rounded-xl p-6 border">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>مزایای عضویت در رکام</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>دسترسی به تمام دپارتمان‌ها</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>مشاوره رایگان تخصصی</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>شرکت در دوره‌های آموزشی</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>فرصت‌های شغلی ویژه</span>
              </div>
            </div>
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

export default RegisterPage;
