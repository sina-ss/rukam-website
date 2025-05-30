import api from "@/lib/api";

export interface ContactFormData {
  content: string;
  full_name: string;
  phone_number: string;
  email?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const contactFormService = {
  submitContactForm: async (
    data: ContactFormData
  ): Promise<ContactFormResponse> => {
    try {
      const response = await api.post("/form", data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "خطا در ارسال فرم. لطفاً دوباره تلاش کنید.",
      };
    }
  },
};

export default contactFormService;
