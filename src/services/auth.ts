import { api } from "@/lib/api";

// Register API interfaces
export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: any;
}

// Login API interfaces
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: any;
}

// Auth service
export const authService = {
  // Register user
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    try {
      const response = await api.post("/register", data);

      return {
        success: true,
        message: "ثبت نام با موفقیت انجام شد",
        data: response.data,
      };
    } catch (error: any) {
      console.error("Register error:", error);

      return {
        success: false,
        message: error.response?.data?.error || "خطا در ثبت نام",
      };
    }
  },

  // Login user
  login: async (data: LoginData): Promise<LoginResponse> => {
    try {
      const response = await api.post("/login", data);

      if (response.status === 200) {
        // Store auth token if provided
        if (response.data.token) {
          localStorage.setItem("auth_token", response.data.token);
        }

        return {
          success: true,
          message: response.data.message || "ورود موفقیت‌آمیز",
          data: response.data,
        };
      }

      return {
        success: false,
        message: "خطا در ورود",
      };
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        return {
          success: false,
          message: "ایمیل یا رمز عبور اشتباه است",
        };
      }

      return {
        success: false,
        message: error.response?.data?.error || "خطا در ورود",
      };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("auth_token");
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("auth_token");
  },

  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem("auth_token");
  },
};
