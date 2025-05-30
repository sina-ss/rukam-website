import api from "@/lib/api";

export interface DepartmentFormData {
  content: string;
  full_name: string;
  email: string;
  website?: string;
  department: string;
  phone_number: string;
}

export interface DepartmentFormResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const contactService = {
  submitDepartmentForm: async (
    data: DepartmentFormData
  ): Promise<DepartmentFormResponse> => {
    try {
      const response = await api.post("/department_form", data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Error submitting department form:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "خطا در ارسال فرم. لطفاً دوباره تلاش کنید.",
      };
    }
  },
};

export default contactService;
