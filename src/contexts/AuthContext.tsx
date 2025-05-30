"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    try {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login({ email, password });
      if (response.success) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();

    // Set up periodic token validation (every 5 minutes)
    const interval = setInterval(() => {
      const isAuth = authService.isAuthenticated();
      if (isAuth !== isAuthenticated) {
        setIsAuthenticated(isAuth);
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
