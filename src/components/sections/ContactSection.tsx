"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { homeTexts } from "@/constants/home-texts";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/schemas/contact-form";
import {
  contactFormService,
  type ContactFormData as ApiContactFormData,
} from "@/services/contact-form";
import { toast } from "sonner";

const ContactSection = () => {
  const { contact } = homeTexts;

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
        toast.success("درخواست شما با موفقیت ارسال شد!", {
          description: "تیم ما در اسرع وقت با شما تماس خواهد گرفت.",
          duration: 5000,
        });
        reset();
      } else {
        toast.error("خطا در ارسال فرم", {
          description: response.message || "لطفاً دوباره تلاش کنید.",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("خطا در ارسال فرم", {
        description: "لطفاً دوباره تلاش کنید.",
        duration: 4000,
      });
    }
  };

  return (
    <>
      <Toaster />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-brand-teal/10 text-brand-teal border-brand-teal/20">
                  <span className="ml-2">📞</span>
                  {contact.badge}
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                  <span className="text-primary">{contact.titleHighlight}</span>
                  {contact.title.split(contact.titleHighlight)[1]}
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {contact.description}
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">
                      {contact.methods.phone.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {contact.methods.phone.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="p-3 bg-accent/10 rounded-xl">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">
                      {contact.methods.email.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {contact.methods.email.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="p-3 bg-brand-teal/10 rounded-xl">
                    <MapPin className="h-6 w-6 text-brand-teal" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">
                      {contact.methods.visit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {contact.methods.visit.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-brand-teal/10 rounded-2xl p-6 border">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    {contact.features.title}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {contact.features.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            index === 0
                              ? "bg-primary"
                              : index === 1
                              ? "bg-accent"
                              : "bg-brand-teal"
                          }`}
                        ></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border rounded-2xl p-8 shadow-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {contact.form.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {contact.form.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {contact.form.fields.name.label}
                    </label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder={contact.form.fields.name.placeholder}
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

                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {contact.form.fields.phone.label}
                    </label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder={contact.form.fields.phone.placeholder}
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

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {contact.form.fields.email.label}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder={contact.form.fields.email.placeholder}
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

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {contact.form.fields.message.label}
                    </label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder={contact.form.fields.message.placeholder}
                      className={`w-full min-h-[100px] ${
                        errors.message ? "border-red-500" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
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
                      {contact.form.submit}
                      <Send className="mr-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {contact.form.disclaimer}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
