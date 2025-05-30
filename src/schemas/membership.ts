import { z } from "zod";

export const membershipFormSchema = z.object({
  department: z.string().min(1, "انتخاب دپارتمان الزامی است"),

  name: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام نباید بیشتر از ۵۰ کاراکتر باشد")
    .regex(
      /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z\s]+$/,
      "نام باید شامل حروف فارسی یا انگلیسی باشد"
    ),

  mobile: z
    .string()
    .min(11, "شماره موبایل باید ۱۱ رقم باشد")
    .max(11, "شماره موبایل باید ۱۱ رقم باشد")
    .regex(/^09[0-9]{9}$/, "شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد"),

  email: z.string().email("آدرس ایمیل معتبر نیست").optional().or(z.literal("")),

  website: z
    .string()
    .url("آدرس وب‌سایت معتبر نیست")
    .optional()
    .or(z.literal("")),

  opinion: z
    .string()
    .min(20, "دیدگاه باید حداقل ۲۰ کاراکتر باشد")
    .max(2000, "دیدگاه نباید بیشتر از ۲۰۰۰ کاراکتر باشد"),
});

export type MembershipFormData = z.infer<typeof membershipFormSchema>;
