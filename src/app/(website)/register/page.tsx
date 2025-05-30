"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
  Shield,
  CheckCircle,
  Building2,
} from "lucide-react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    department: "",
    experience: "",
    agreeToTerms: false,
    agreeToNewsletter: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const departments = [
    "بازرگانی رکام",
    "حقوقی رکام",
    "آموزش رکام",
    "بهداشت و ارتقاء سلامت رکام",
    "فرهنگی، هنری، اجتماعی رکام",
    "فن‌آوری اطلاعات رکام",
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "نام الزامی است";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "نام خانوادگی الزامی است";
    }
    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "فرمت ایمیل صحیح نیست";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "شماره موبایل الزامی است";
    } else if (!/^09\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "شماره موبایل صحیح نیست";
    }
    if (!formData.password) {
      newErrors.password = "رمز عبور الزامی است";
    } else if (formData.password.length < 8) {
      newErrors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "تکرار رمز عبور مطابقت ندارد";
    }
    if (!formData.department) {
      newErrors.department = "انتخاب دپارتمان الزامی است";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "پذیرش قوانین الزامی است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Registration attempt:", formData);
      setIsLoading(false);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
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
          <form onSubmit={handleSubmit} className="space-y-6">
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
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="نام خود را وارد کنید"
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">
                      {errors.firstName}
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
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="نام خانوادگی خود را وارد کنید"
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={errors.email ? "border-destructive" : ""}
                    dir="ltr"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-foreground"
                  >
                    شماره موبایل *
                  </label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className={errors.mobile ? "border-destructive" : ""}
                    dir="ltr"
                  />
                  {errors.mobile && (
                    <p className="text-sm text-destructive">{errors.mobile}</p>
                  )}
                </div>
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
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
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
                      {errors.password}
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
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
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
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Department & Experience */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2 space-x-reverse">
                <Building2 className="h-5 w-5" />
                <span>اطلاعات تخصصی</span>
              </h3>

              {/* Department */}
              <div className="space-y-2">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-foreground"
                >
                  دپارتمان مورد علاقه *
                </label>
                <select
                  id="department"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors.department ? "border-destructive" : "border-input"
                  }`}
                >
                  <option value="">دپارتمان مورد نظر را انتخاب کنید</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-sm text-destructive">
                    {errors.department}
                  </p>
                )}
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-foreground"
                >
                  تجربه و مهارت‌ها (اختیاری)
                </label>
                <Textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="تجربه کاری، مهارت‌ها و علایق خود را بنویسید..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="text-sm text-foreground"
                >
                  با{" "}
                  <Link
                    href="/terms"
                    className="text-primary hover:text-primary/80"
                  >
                    قوانین و مقررات
                  </Link>{" "}
                  و{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:text-primary/80"
                  >
                    حریم خصوصی
                  </Link>{" "}
                  رکام موافقم *
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-destructive">
                  {errors.agreeToTerms}
                </p>
              )}

              <div className="flex items-start space-x-3 space-x-reverse">
                <input
                  id="agreeToNewsletter"
                  name="agreeToNewsletter"
                  type="checkbox"
                  checked={formData.agreeToNewsletter}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="agreeToNewsletter"
                  className="text-sm text-muted-foreground"
                >
                  مایل به دریافت اخبار و اطلاعیه‌های رکام هستم
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                "در حال ثبت نام..."
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
  );
};

export default RegisterPage;
