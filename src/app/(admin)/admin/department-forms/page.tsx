"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { adminService, type DepartmentForm } from "@/services/admin";
import {
  Search,
  Eye,
  Mail,
  Phone,
  Users,
  Download,
  RefreshCw,
  Globe,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

const DepartmentFormsPage = () => {
  const [forms, setForms] = useState<DepartmentForm[]>([]);
  const [filteredForms, setFilteredForms] = useState<DepartmentForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedForm, setSelectedForm] = useState<DepartmentForm | null>(null);

  const departments = [
    "بازرگانی رکام",
    "حقوقی رکام",
    "آموزش رکام",
    "بهداشت و ارتقاء سلامت رکام",
    "فرهنگی، هنری، اجتماعی رکام",
    "فن‌آوری اطلاعات رکام",
  ];

  const fetchForms = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getDepartmentForms();
      if (response.success) {
        setForms(response.data);
        setFilteredForms(response.data);
      } else {
        toast.error("خطا در دریافت فرم‌های عضویت", {
          description: response.message,
        });
      }
    } catch (error) {
      console.error("Error fetching department forms:", error);
      toast.error("خطا در دریافت فرم‌های عضویت");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  useEffect(() => {
    let filtered = forms;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (form) =>
          form.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          form.phone_number.includes(searchTerm) ||
          form.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          form.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (form.website &&
            form.website.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by department
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(
        (form) => form.department === selectedDepartment
      );
    }

    setFilteredForms(filtered);
  }, [searchTerm, selectedDepartment, forms]);

  const exportToCSV = () => {
    const headers = [
      "شناسه",
      "نام",
      "شماره تلفن",
      "ایمیل",
      "وبسایت",
      "دپارتمان",
      "نظر",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredForms.map((form) =>
        [
          form.id,
          `"${form.full_name}"`,
          form.phone_number,
          `"${form.email}"`,
          `"${form.website}"`,
          `"${form.department}"`,
          `"${form.content.replace(/"/g, '""')}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `department-forms-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      "بازرگانی رکام": "bg-blue-100 text-blue-800",
      "حقوقی رکام": "bg-purple-100 text-purple-800",
      "آموزش رکام": "bg-green-100 text-green-800",
      "بهداشت و ارتقاء سلامت رکام": "bg-red-100 text-red-800",
      "فرهنگی، هنری، اجتماعی رکام": "bg-yellow-100 text-yellow-800",
      "فن‌آوری اطلاعات رکام": "bg-indigo-100 text-indigo-800",
    };
    return (
      colors[department as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <div className="flex space-x-2 space-x-reverse">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 space-x-reverse"
                >
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">فرم‌های عضویت</h2>
          <p className="text-muted-foreground">
            مدیریت و مشاهده درخواست‌های عضویت در دپارتمان‌ها (
            {filteredForms.length} فرم)
          </p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline" onClick={fetchForms}>
            <RefreshCw className="ml-2 h-4 w-4" />
            بروزرسانی
          </Button>
          <Button onClick={exportToCSV} disabled={filteredForms.length === 0}>
            <Download className="ml-2 h-4 w-4" />
            دانلود CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو در نام، ایمیل، شماره تلفن، دپارتمان یا نظر..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Department Filter */}
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger>
                <SelectValue placeholder="فیلتر بر اساس دپارتمان" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه دپارتمان‌ها</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Forms Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <Users className="h-5 w-5" />
            <span>لیست درخواست‌های عضویت</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredForms.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">شناسه</TableHead>
                    <TableHead className="text-right">نام</TableHead>
                    <TableHead className="text-right">شماره تلفن</TableHead>
                    <TableHead className="text-right">ایمیل</TableHead>
                    <TableHead className="text-right">وبسایت</TableHead>
                    <TableHead className="text-right">دپارتمان</TableHead>
                    <TableHead className="text-right">نظر</TableHead>
                    <TableHead className="text-right">عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredForms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell className="font-medium">{form.id}</TableCell>
                      <TableCell>{form.full_name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{form.phone_number}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {form.email ? (
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="truncate max-w-[150px]">
                              {form.email}
                            </span>
                          </div>
                        ) : (
                          <Badge variant="secondary">ندارد</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {form.website ? (
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Globe className="h-3 w-3 text-muted-foreground" />
                            <span className="truncate max-w-[120px]">
                              {form.website}
                            </span>
                          </div>
                        ) : (
                          <Badge variant="secondary">ندارد</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getDepartmentColor(form.department)}>
                          {form.department}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="truncate max-w-[200px] block">
                          {form.content.substring(0, 40)}
                          {form.content.length > 40 && "..."}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedForm(form)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>
                                جزئیات درخواست عضویت #{form.id}
                              </DialogTitle>
                              <DialogDescription>
                                اطلاعات کامل درخواست عضویت در دپارتمان
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              {/* Personal Info */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    نام
                                  </label>
                                  <p className="text-foreground">
                                    {form.full_name}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    شماره تلفن
                                  </label>
                                  <p className="text-foreground">
                                    {form.phone_number}
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    ایمیل
                                  </label>
                                  <p className="text-foreground">
                                    {form.email || "ارائه نشده"}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    وبسایت
                                  </label>
                                  <p className="text-foreground">
                                    {form.website || "ارائه نشده"}
                                  </p>
                                </div>
                              </div>

                              {/* Department */}
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  دپارتمان مورد علاقه
                                </label>
                                <div className="mt-2">
                                  <Badge
                                    className={`${getDepartmentColor(
                                      form.department
                                    )} text-sm px-3 py-1`}
                                  >
                                    <Building2 className="ml-1 h-4 w-4" />
                                    {form.department}
                                  </Badge>
                                </div>
                              </div>

                              {/* Opinion */}
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  نظر و توضیحات
                                </label>
                                <div className="mt-2 p-4 bg-muted rounded-lg">
                                  <p className="text-foreground whitespace-pre-wrap">
                                    {form.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                درخواستی یافت نشد
              </h3>
              <p className="mt-2 text-muted-foreground">
                {searchTerm || selectedDepartment !== "all"
                  ? "هیچ درخواستی با این فیلترها یافت نشد"
                  : "هنوز هیچ درخواست عضویتی ارسال نشده است"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentFormsPage;
