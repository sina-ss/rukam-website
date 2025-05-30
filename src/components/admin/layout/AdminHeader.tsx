"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminHeader = () => {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/admin":
        return "داشبورد";
      case "/admin/forms":
        return "فرم‌های تماس";
      case "/admin/department-forms":
        return "فرم‌های عضویت";
      default:
        return "پنل مدیریت";
    }
  };

  const getBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [{ title: "خانه", href: "/admin" }];

    if (segments.length > 1) {
      if (segments[1] === "forms") {
        breadcrumbs.push({ title: "فرم‌های تماس", href: "/admin/forms" });
      } else if (segments[1] === "department-forms") {
        breadcrumbs.push({
          title: "فرم‌های عضویت",
          href: "/admin/department-forms",
        });
      }
    }

    return breadcrumbs;
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-foreground">
          {getPageTitle()}
        </h1>
        <nav className="flex items-center space-x-1 space-x-reverse text-sm text-muted-foreground">
          {getBreadcrumb().map((item, index) => (
            <span key={item.href}>
              {index > 0 && <span className="mx-1">/</span>}
              <span
                className={
                  index === getBreadcrumb().length - 1 ? "text-foreground" : ""
                }
              >
                {item.title}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4 space-x-reverse">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="جستجو..." className="w-64 pr-10" />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -left-1 h-3 w-3 rounded-full bg-destructive"></span>
        </Button>

        {/* User Menu */}
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
