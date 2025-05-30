"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { authService } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      title: "داشبورد",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "فرم‌های تماس",
      href: "/admin/forms",
      icon: MessageSquare,
    },
    {
      title: "فرم‌های عضویت",
      href: "/admin/department-forms",
      icon: Users,
    },
  ];

  const handleLogout = () => {
    try {
      authService.logout();
      toast.success("خروج موفقیت‌آمیز", {
        description: "با موفقیت از حساب کاربری خارج شدید.",
        duration: 2000,
      });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("خطا در خروج", {
        description: "لطفاً دوباره تلاش کنید.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex h-full w-64 flex-col bg-card border-l">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b px-6">
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            ر
          </div>
          <span className="text-xl font-bold text-foreground">پنل مدیریت</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 space-x-reverse rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="ml-2 h-5 w-5" />
          خروج
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
