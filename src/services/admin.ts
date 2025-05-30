import { api } from "@/lib/api";

// Contact Form interfaces
export interface ContactForm {
  id: number;
  content: string;
  full_name: string;
  phone_number: string;
  email: string;
  created_at?: string;
  status?: "read" | "unread";
}

// Department Form interfaces
export interface DepartmentForm {
  id: number;
  content: string;
  full_name: string;
  email: string;
  website: string;
  department: string;
  phone_number: string;
  created_at?: string;
  status?: "processed" | "unprocessed";
}

// API Response interfaces
export interface FormsResponse {
  success: boolean;
  data: ContactForm[];
  message?: string;
}

export interface DepartmentFormsResponse {
  success: boolean;
  data: DepartmentForm[];
  message?: string;
}

// Admin service
export const adminService = {
  // Fetch all contact forms
  getForms: async (): Promise<FormsResponse> => {
    try {
      const response = await api.get("/forms");

      return {
        success: true,
        data: response.data || [],
      };
    } catch (error: any) {
      console.error("Get forms error:", error);

      return {
        success: false,
        data: [],
        message: error.response?.data?.error || "خطا در دریافت فرم‌ها",
      };
    }
  },

  // Fetch all department forms
  getDepartmentForms: async (): Promise<DepartmentFormsResponse> => {
    try {
      const response = await api.get("/department_forms");

      return {
        success: true,
        data: response.data || [],
      };
    } catch (error: any) {
      console.error("Get department forms error:", error);

      return {
        success: false,
        data: [],
        message:
          error.response?.data?.error || "خطا در دریافت فرم‌های دپارتمان",
      };
    }
  },

  // Get dashboard statistics
  getStats: async () => {
    try {
      const [formsResponse, departmentFormsResponse] = await Promise.all([
        adminService.getForms(),
        adminService.getDepartmentForms(),
      ]);

      const totalForms = formsResponse.data.length;
      const totalDepartmentForms = departmentFormsResponse.data.length;
      const totalSubmissions = totalForms + totalDepartmentForms;

      // Get recent submissions (last 5)
      const allSubmissions = [
        ...formsResponse.data.map((form) => ({
          ...form,
          type: "contact" as const,
        })),
        ...departmentFormsResponse.data.map((form) => ({
          ...form,
          type: "department" as const,
        })),
      ]
        .sort((a, b) => {
          // Sort by ID descending (assuming higher ID = more recent)
          return b.id - a.id;
        })
        .slice(0, 5);

      // Department statistics
      const departmentStats = departmentFormsResponse.data.reduce(
        (acc, form) => {
          acc[form.department] = (acc[form.department] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      return {
        success: true,
        data: {
          totalForms,
          totalDepartmentForms,
          totalSubmissions,
          recentSubmissions: allSubmissions,
          departmentStats,
        },
      };
    } catch (error: any) {
      console.error("Get stats error:", error);

      return {
        success: false,
        message: "خطا در دریافت آمار",
      };
    }
  },
};
