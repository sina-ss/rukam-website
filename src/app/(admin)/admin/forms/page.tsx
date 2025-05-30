"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
import { adminService, type ContactForm } from "@/services/admin";
import {
  Search,
  Eye,
  Mail,
  Phone,
  MessageSquare,
  Download,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

const ContactFormsPage = () => {
  const [forms, setForms] = useState<ContactForm[]>([]);
  const [filteredForms, setFilteredForms] = useState<ContactForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForm, setSelectedForm] = useState<ContactForm | null>(null);

  const fetchForms = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getForms();
      if (response.success) {
        setForms(response.data);
        setFilteredForms(response.data);
      } else {
        toast.error("خطا در دریافت فرم‌ها", {
          description: response.message,
        });
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
      toast.error("خطا در دریافت فرم‌ها");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredForms(forms);
    } else {
      const filtered = forms.filter(
        (form) =>
          form.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          form.phone_number.includes(searchTerm) ||
          form.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredForms(filtered);
    }
  }, [searchTerm, forms]);

  const exportToCSV = () => {
    const headers = ["شناسه", "نام", "شماره تلفن", "ایمیل", "پیام"];
    const csvContent = [
      headers.join(","),
      ...filteredForms.map((form) =>
        [
          form.id,
          `"${form.full_name}"`,
          form.phone_number,
          `"${form.email}"`,
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
      `contact-forms-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <h2 className="text-2xl font-bold text-foreground">فرم‌های تماس</h2>
          <p className="text-muted-foreground">
            مدیریت و مشاهده فرم‌های تماس ارسال شده ({filteredForms.length} فرم)
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

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="جستجو در نام، ایمیل، شماره تلفن یا متن پیام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Forms Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <MessageSquare className="h-5 w-5" />
            <span>لیست فرم‌های تماس</span>
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
                    <TableHead className="text-right">پیام</TableHead>
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
                            <span className="truncate max-w-[200px]">
                              {form.email}
                            </span>
                          </div>
                        ) : (
                          <Badge variant="secondary">ندارد</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="truncate max-w-[300px] block">
                          {form.content.substring(0, 50)}
                          {form.content.length > 50 && "..."}
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
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                جزئیات فرم تماس #{form.id}
                              </DialogTitle>
                              <DialogDescription>
                                اطلاعات کامل فرم تماس ارسال شده
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
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
                                  پیام
                                </label>
                                <div className="mt-2 p-3 bg-muted rounded-lg">
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
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                فرمی یافت نشد
              </h3>
              <p className="mt-2 text-muted-foreground">
                {searchTerm
                  ? "هیچ فرمی با این جستجو یافت نشد"
                  : "هنوز هیچ فرم تماسی ارسال نشده است"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactFormsPage;
