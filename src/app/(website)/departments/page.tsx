"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  Scale,
  GraduationCap,
  Heart,
  Palette,
  Monitor,
} from "lucide-react";
import { departmentsTexts } from "@/constants/departments-texts";
import {
  DepartmentsHero,
  DepartmentsNavigation,
  DepartmentsOverview,
  DepartmentDetail,
  MembershipForm,
} from "@/components/departments";

const DepartmentsContent = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({
    department: "",
    opinion: "",
    name: "",
    email: "",
    mobile: "",
    website: "",
  });

  // Handle URL parameters for tab navigation
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      // Map "membership" to "form" for the membership form
      if (tab === "membership") {
        setActiveTab("form");
      } else {
        setActiveTab(tab);
      }
    }
  }, [searchParams]);

  const departments = [
    { ...departmentsTexts.business, icon: Building2 },
    { ...departmentsTexts.legal, icon: Scale },
    { ...departmentsTexts.education, icon: GraduationCap },
    { ...departmentsTexts.health, icon: Heart },
    { ...departmentsTexts.cultural, icon: Palette },
    { ...departmentsTexts.it, icon: Monitor },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      department: "",
      opinion: "",
      name: "",
      email: "",
      mobile: "",
      website: "",
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <DepartmentsHero />

      {/* Navigation Tabs */}
      <DepartmentsNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        departments={departments}
      />

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <DepartmentsOverview
              departments={departments}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Department Tabs */}
          {departments.map(
            (dept) =>
              activeTab === dept.id && (
                <DepartmentDetail key={dept.id} department={dept} />
              )
          )}

          {/* Membership Form Tab */}
          {activeTab === "form" && (
            <MembershipForm
              formData={formData}
              handleFormSubmit={handleFormSubmit}
              handleFormChange={handleFormChange}
              departments={departments}
            />
          )}
        </div>
      </section>
    </div>
  );
};

const DepartmentsPage = () => {
  return (
    <Suspense fallback={<div>درحال بارگذاری...</div>}>
      <DepartmentsContent />
    </Suspense>
  );
};

export default DepartmentsPage;
