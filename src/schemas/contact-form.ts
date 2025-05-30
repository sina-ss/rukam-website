import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام نباید بیشتر از ۵۰ کاراکتر باشد")
    .regex(
      /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z\s]+$/,
      "نام باید شامل حروف فارسی یا انگلیسی باشد"
    ),

  phone: z
    .string()
    .min(11, "شماره تلفن باید ۱۱ رقم باشد")
    .max(11, "شماره تلفن باید ۱۱ رقم باشد")
    .regex(/^09[0-9]{9}$/, "شماره تلفن باید با ۰۹ شروع شود و ۱۱ رقم باشد"),

  email: z.string().email("آدرس ایمیل معتبر نیست").optional().or(z.literal("")),

  message: z
    .string()
    .min(10, "پیام باید حداقل ۱۰ کاراکتر باشد")
    .max(1000, "پیام نباید بیشتر از ۱۰۰۰ کاراکتر باشد"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
