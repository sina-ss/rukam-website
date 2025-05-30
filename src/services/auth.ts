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

// Token storage interface
interface TokenData {
  token: string;
  expiresAt: number;
}

// Cookie utilities
const setCookie = (name: string, value: string, days: number) => {
  if (typeof window !== "undefined") {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }
};

const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
};

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
        // Store auth token with 1-day expiration
        const token = response.data.token || "authenticated"; // Fallback if no token provided
        const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 1 day from now

        const tokenData: TokenData = {
          token,
          expiresAt,
        };

        // Store in localStorage
        localStorage.setItem("auth_token_data", JSON.stringify(tokenData));
        localStorage.setItem("auth_token", token);

        // Store in cookies for middleware access
        setCookie("auth_token", token, 1); // 1 day
        setCookie("auth_token_data", JSON.stringify(tokenData), 1);

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
    // Clear localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_data");

    // Clear cookies
    deleteCookie("auth_token");
    deleteCookie("auth_token_data");
  },

  // Check if user is authenticated and token is not expired
  isAuthenticated: (): boolean => {
    try {
      // Check localStorage first
      let tokenDataStr = localStorage.getItem("auth_token_data");

      // Fallback to cookies if localStorage is empty
      if (!tokenDataStr) {
        tokenDataStr = getCookie("auth_token_data");
      }

      if (!tokenDataStr) {
        // Check old format for backward compatibility
        const oldToken =
          localStorage.getItem("auth_token") || getCookie("auth_token");
        if (oldToken) {
          // Migrate to new format with 1-day expiration
          const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
          const tokenData: TokenData = {
            token: oldToken,
            expiresAt,
          };
          localStorage.setItem("auth_token_data", JSON.stringify(tokenData));
          setCookie("auth_token_data", JSON.stringify(tokenData), 1);
          return true;
        }
        return false;
      }

      const tokenData: TokenData = JSON.parse(tokenDataStr);

      // Check if token is expired
      if (Date.now() > tokenData.expiresAt) {
        // Token expired, clean up
        authService.logout();
        return false;
      }

      return !!tokenData.token;
    } catch (error) {
      console.error("Error checking authentication:", error);
      // Clean up corrupted data
      authService.logout();
      return false;
    }
  },

  // Get auth token if valid
  getToken: (): string | null => {
    try {
      // Check localStorage first
      let tokenDataStr = localStorage.getItem("auth_token_data");

      // Fallback to cookies if localStorage is empty
      if (!tokenDataStr) {
        tokenDataStr = getCookie("auth_token_data");
      }

      if (!tokenDataStr) {
        // Check old format for backward compatibility
        const oldToken =
          localStorage.getItem("auth_token") || getCookie("auth_token");
        if (oldToken) {
          // Migrate to new format
          const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
          const tokenData: TokenData = {
            token: oldToken,
            expiresAt,
          };
          localStorage.setItem("auth_token_data", JSON.stringify(tokenData));
          setCookie("auth_token_data", JSON.stringify(tokenData), 1);
          return oldToken;
        }
        return null;
      }

      const tokenData: TokenData = JSON.parse(tokenDataStr);

      // Check if token is expired
      if (Date.now() > tokenData.expiresAt) {
        // Token expired, clean up
        authService.logout();
        return null;
      }

      return tokenData.token;
    } catch (error) {
      console.error("Error getting token:", error);
      // Clean up corrupted data
      authService.logout();
      return null;
    }
  },

  // Get token expiration info
  getTokenExpiration: (): { isExpired: boolean; expiresAt: number | null } => {
    try {
      // Check localStorage first
      let tokenDataStr = localStorage.getItem("auth_token_data");

      // Fallback to cookies if localStorage is empty
      if (!tokenDataStr) {
        tokenDataStr = getCookie("auth_token_data");
      }

      if (!tokenDataStr) {
        return { isExpired: true, expiresAt: null };
      }

      const tokenData: TokenData = JSON.parse(tokenDataStr);
      const isExpired = Date.now() > tokenData.expiresAt;

      return { isExpired, expiresAt: tokenData.expiresAt };
    } catch (error) {
      console.error("Error checking token expiration:", error);
      return { isExpired: true, expiresAt: null };
    }
  },
};
