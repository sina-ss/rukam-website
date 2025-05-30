"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Send, Loader2 } from "lucide-react";
import { departmentsTexts } from "@/constants/departments-texts";
import {
  membershipFormSchema,
  type MembershipFormData,
} from "@/schemas/membership";
import { contactService, type DepartmentFormData } from "@/services/contact";
import { toast } from "sonner";

interface MembershipFormProps {
  departments: Array<{
    id: string;
    title: string;
    [key: string]: any;
  }>;
}

const MembershipForm = ({ departments }: MembershipFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MembershipFormData>({
    resolver: zodResolver(membershipFormSchema),
    defaultValues: {
      department: "",
      name: "",
      mobile: "",
      email: "",
      website: "",
      opinion: "",
    },
  });

  const onSubmit = async (data: MembershipFormData) => {
    try {
      // Transform form data to match API requirements
      const apiData: DepartmentFormData = {
        full_name: data.name,
        phone_number: data.mobile,
        email: data.email || "",
        website: data.website || "",
        department: data.department,
        content: data.opinion,
      };

      const response = await contactService.submitDepartmentForm(apiData);

      if (response.success) {
        toast.success("درخواست عضویت با موفقیت ارسال شد!", {
          description: "تیم ما در اسرع وقت با شما تماس خواهد گرفت.",
          duration: 5000,
        });
        reset();
      } else {
        toast.error("خطا در ارسال درخواست", {
          description: response.message || "لطفاً دوباره تلاش کنید.",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Membership form submission error:", error);
      toast.error("خطا در ارسال درخواست", {
        description: "لطفاً دوباره تلاش کنید.",
        duration: 4000,
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            {departmentsTexts.form.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {departmentsTexts.form.description}
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {departmentsTexts.form.fields.department.label}
                </label>
                <Select
                  onValueChange={(value) => setValue("department", value)}
                  value={watch("department")}
                >
                  <SelectTrigger
                    className={`w-full ${
                      errors.department ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue
                      placeholder={
                        departmentsTexts.form.fields.department.placeholder
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.title}>
                        {dept.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department.message}
                  </p>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {departmentsTexts.form.fields.name.label}
                </label>
                <Input
                  {...register("name")}
                  placeholder={departmentsTexts.form.fields.name.placeholder}
                  className={`w-full ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {departmentsTexts.form.fields.mobile.label}
                </label>
                <Input
                  {...register("mobile")}
                  placeholder={departmentsTexts.form.fields.mobile.placeholder}
                  className={`w-full ${errors.mobile ? "border-red-500" : ""}`}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {departmentsTexts.form.fields.email.label}
                </label>
                <Input
                  type="email"
                  {...register("email")}
                  placeholder={departmentsTexts.form.fields.email.placeholder}
                  className={`w-full ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Website */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  {departmentsTexts.form.fields.website.label}
                </label>
                <Input
                  type="url"
                  {...register("website")}
                  placeholder={departmentsTexts.form.fields.website.placeholder}
                  className={`w-full ${errors.website ? "border-red-500" : ""}`}
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.website.message}
                  </p>
                )}
              </div>
            </div>

            {/* Opinion */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {departmentsTexts.form.fields.opinion.label}
              </label>
              <Textarea
                {...register("opinion")}
                placeholder={departmentsTexts.form.fields.opinion.placeholder}
                className={`min-h-[120px] w-full ${
                  errors.opinion ? "border-red-500" : ""
                }`}
              />
              {errors.opinion && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.opinion.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  در حال ارسال...
                </>
              ) : (
                <>
                  {departmentsTexts.form.submit}
                  <Send className="mr-2 h-5 w-5" />
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              {departmentsTexts.form.disclaimer}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default MembershipForm;
