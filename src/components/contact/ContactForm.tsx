"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { Send, Loader2 } from "lucide-react";
import { contactTexts } from "@/constants/contact";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/schemas/contact-form";
import {
  contactFormService,
  type ContactFormData as ApiContactFormData,
} from "@/services/contact-form";
import { toast } from "sonner";

const ContactForm = () => {
  const { form } = contactTexts;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Transform form data to match API requirements
      const apiData: ApiContactFormData = {
        full_name: data.name,
        phone_number: data.phone,
        email: data.email || "",
        content: data.message,
      };

      const response = await contactFormService.submitContactForm(apiData);

      if (response.success) {
        toast.success("پیام شما با موفقیت ارسال شد!", {
          description: "تیم ما در اسرع وقت با شما تماس خواهد گرفت.",
          duration: 5000,
        });
        reset();
      } else {
        toast.error("خطا در ارسال پیام", {
          description: response.message || "لطفاً دوباره تلاش کنید.",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("خطا در ارسال پیام", {
        description: "لطفاً دوباره تلاش کنید.",
        duration: 4000,
      });
    }
  };

  return (
    <>
      <Toaster />
      <section id="contact-form" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">
                {form.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {form.description}
              </p>
            </div>

            <div className="bg-card border rounded-2xl p-8 shadow-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {form.fields.name.label}
                    </label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder={form.fields.name.placeholder}
                      className={`w-full ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {form.fields.phone.label}
                    </label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder={form.fields.phone.placeholder}
                      className={`w-full ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {form.fields.email.label}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder={form.fields.email.placeholder}
                      className={`w-full ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Subject - Remove this field since it's not in the API */}
                  {/* We'll keep the UI layout by making this a spacer or remove it */}
                  <div></div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {form.fields.message.label}
                  </label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder={form.fields.message.placeholder}
                    className={`w-full min-h-[120px] ${
                      errors.message ? "border-red-500" : ""
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
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
                      {form.submit}
                      <Send className="mr-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {form.disclaimer}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
