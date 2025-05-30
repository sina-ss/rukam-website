import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { authService } from "@/services/auth";

const API_BASE_URL = "http://localhost:8090";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available and valid
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error("Response error:", error);

    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      // Use authService to properly clean up tokens
      authService.logout();
      if (
        typeof window !== "undefined" &&
        window.location.pathname.startsWith("/admin")
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
