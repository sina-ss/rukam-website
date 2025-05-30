"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/admin/dashboard/StatsCard";
import {
  adminService,
  type ContactForm,
  type DepartmentForm,
} from "@/services/admin";
import {
  MessageSquare,
  Users,
  FileText,
  TrendingUp,
  Clock,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStats {
  totalForms: number;
  totalDepartmentForms: number;
  totalSubmissions: number;
  recentSubmissions: Array<
    (ContactForm | DepartmentForm) & { type: "contact" | "department" }
  >;
  departmentStats: Record<string, number>;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminService.getStats();
        if (response.success && response.data) {
          setStats(response.data as DashboardStats);
        } else {
          toast.error("خطا در دریافت آمار", {
            description: response.message,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        toast.error("خطا در دریافت آمار");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Stats Cards Skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity Skeleton */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 space-x-reverse"
                  >
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">خطا در بارگذاری داده‌ها</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">خوش آمدید!</h2>
        <p className="text-muted-foreground">
          آمار و اطلاعات کلی سایت را در اینجا مشاهده کنید
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="کل ارسال‌ها"
          value={stats.totalSubmissions}
          description="تعداد کل فرم‌های ارسال شده"
          icon={FileText}
        />
        <StatsCard
          title="فرم‌های تماس"
          value={stats.totalForms}
          description="فرم‌های تماس عمومی"
          icon={MessageSquare}
        />
        <StatsCard
          title="فرم‌های عضویت"
          value={stats.totalDepartmentForms}
          description="درخواست‌های عضویت در دپارتمان‌ها"
          icon={Users}
        />
        <StatsCard
          title="فعالیت امروز"
          value={stats.recentSubmissions.length}
          description="آخرین فعالیت‌ها"
          icon={TrendingUp}
        />
      </div>

      {/* Recent Activity & Department Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Submissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <Clock className="h-5 w-5" />
              <span>آخرین ارسال‌ها</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentSubmissions.length > 0 ? (
                stats.recentSubmissions.map((submission) => (
                  <div
                    key={`${submission.type}-${submission.id}`}
                    className="flex items-start space-x-4 space-x-reverse p-3 rounded-lg border"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`p-2 rounded-full ${
                          submission.type === "contact"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {submission.type === "contact" ? (
                          <MessageSquare className="h-4 w-4" />
                        ) : (
                          <Users className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground truncate">
                          {submission.full_name}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            submission.type === "contact"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {submission.type === "contact" ? "تماس" : "عضویت"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {submission.content.substring(0, 60)}...
                      </p>
                      <div className="flex items-center space-x-4 space-x-reverse text-xs text-muted-foreground mt-2">
                        <span className="flex items-center space-x-1 space-x-reverse">
                          <Phone className="h-3 w-3" />
                          <span>{submission.phone_number}</span>
                        </span>
                        {submission.email && (
                          <span className="flex items-center space-x-1 space-x-reverse">
                            <Mail className="h-3 w-3" />
                            <span>{submission.email}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  هنوز فرمی ارسال نشده است
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Department Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <TrendingUp className="h-5 w-5" />
              <span>آمار دپارتمان‌ها</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.keys(stats.departmentStats).length > 0 ? (
                Object.entries(stats.departmentStats)
                  .sort(([, a], [, b]) => b - a)
                  .map(([department, count]) => (
                    <div
                      key={department}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-foreground">
                        {department}
                      </span>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-sm font-medium text-foreground">
                          {count}
                        </span>
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${
                                (count /
                                  Math.max(
                                    ...Object.values(stats.departmentStats)
                                  )) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  هنوز درخواست عضویتی ثبت نشده است
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
