import { z } from "zod";

// Register schema
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "نام باید حداقل ۲ کاراکتر باشد")
      .max(50, "نام نباید بیشتر از ۵۰ کاراکتر باشد")
      .regex(
        /^[a-zA-Zآ-ی\s]+$/,
        "نام فقط می‌تواند شامل حروف فارسی و انگلیسی باشد"
      ),
    lastName: z
      .string()
      .min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد")
      .max(50, "نام خانوادگی نباید بیشتر از ۵۰ کاراکتر باشد")
      .regex(
        /^[a-zA-Zآ-ی\s]+$/,
        "نام خانوادگی فقط می‌تواند شامل حروف فارسی و انگلیسی باشد"
      ),
    email: z.string().email("فرمت ایمیل صحیح نیست").min(1, "ایمیل الزامی است"),
    password: z
      .string()
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "رمز عبور باید شامل حروف کوچک، بزرگ و عدد باشد"
      ),
    confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن مطابقت ندارند",
    path: ["confirmPassword"],
  });

// Login schema
export const loginSchema = z.object({
  email: z.string().email("فرمت ایمیل صحیح نیست").min(1, "ایمیل الزامی است"),
  password: z.string().min(1, "رمز عبور الزامی است"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
