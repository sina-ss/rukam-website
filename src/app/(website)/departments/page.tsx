"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Scale,
  GraduationCap,
  Heart,
  Palette,
  Monitor,
  CheckCircle,
  Send,
  ArrowLeft,
} from "lucide-react";
import { departmentsTexts } from "@/constants/departments-texts";

const DepartmentsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({
    department: "",
    opinion: "",
    name: "",
    email: "",
    mobile: "",
    website: "",
  });

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

  const renderDepartmentContent = (dept: any) => {
    const IconComponent = dept.icon;

    return (
      <div className="space-y-8">
        {/* Department Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <IconComponent className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground">{dept.title}</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {dept.description}
          </p>
          {dept.quote && (
            <blockquote className="text-xl font-medium text-primary italic border-r-4 border-primary pr-4 mr-4">
              {dept.quote}
            </blockquote>
          )}
        </div>

        {/* Department Specific Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Business Department */}
          {dept.id === "business" && (
            <>
              <div className="space-y-6">
                <div className="bg-card border rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {dept.future.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {dept.future.description}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 border rounded-2xl p-6">
                  <p className="text-primary font-medium text-center">
                    {dept.cta}
                  </p>
                </div>
              </div>
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {dept.products.title}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {dept.products.items.map((item: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Legal Department */}
          {dept.id === "legal" && (
            <div className="lg:col-span-2 space-y-6">
              {dept.services.map((service: any, serviceIndex: number) => (
                <div
                  key={serviceIndex}
                  className="bg-card border rounded-2xl p-6"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                  )}
                  {service.items && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.items.map((item: string, itemIndex: number) => (
                        <div
                          key={itemIndex}
                          className="flex items-center space-x-2 space-x-reverse"
                        >
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground text-sm">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {service.subsections && (
                    <div className="space-y-4 mt-4">
                      {service.subsections.map(
                        (subsection: any, subIndex: number) => (
                          <div
                            key={subIndex}
                            className="bg-muted/30 rounded-xl p-4"
                          >
                            <h4 className="font-medium mb-2">
                              {subsection.title}
                            </h4>
                            {subsection.description && (
                              <p className="text-muted-foreground text-sm mb-2">
                                {subsection.description}
                              </p>
                            )}
                            {subsection.items && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                {subsection.items.map(
                                  (item: string, itemIndex: number) => (
                                    <div
                                      key={itemIndex}
                                      className="flex items-center space-x-2 space-x-reverse"
                                    >
                                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                                      <span className="text-muted-foreground text-sm">
                                        {item}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Legal Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                  <p className="text-primary text-sm font-medium">
                    💰 {dept.paymentNote}
                  </p>
                </div>
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                  <p className="text-accent text-sm font-medium">
                    ⚖️ {dept.arbitrationNote}
                  </p>
                </div>
              </div>

              <div className="bg-card border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {dept.future.title}
                </h3>
                <p className="text-muted-foreground">
                  {dept.future.description}
                </p>
              </div>
            </div>
          )}

          {/* Education Department */}
          {dept.id === "education" && (
            <>
              <div className="space-y-6">
                <div className="bg-card border rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {dept.fields.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {dept.fields.items.map((item: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {dept.activities.title}
                  </h3>
                  <div className="space-y-2">
                    {dept.activities.items.map(
                      (item: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 space-x-reverse"
                        >
                          <CheckCircle className="h-4 w-4 text-accent" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card border rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {dept.certificates.title}
                  </h3>
                  <div className="space-y-2">
                    {dept.certificates.items.map(
                      (item: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 space-x-reverse"
                        >
                          <CheckCircle className="h-4 w-4 text-brand-teal" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="bg-card border rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {dept.location.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {dept.location.description}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                  <p className="text-primary text-sm font-medium">
                    💰 {dept.paymentNote}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 border rounded-2xl p-6">
                  <p className="text-primary font-medium text-center">
                    {dept.quote}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Health Department */}
          {dept.id === "health" && (
            <>
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {dept.services.title}
                </h3>
                <p className="text-muted-foreground">
                  {dept.services.description}
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-card border rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {dept.future.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {dept.future.description}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 border rounded-2xl p-6">
                  <p className="text-primary font-medium text-center">
                    {dept.quote}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Cultural Department */}
          {dept.id === "cultural" && (
            <>
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {dept.future.title}
                </h3>
                <p className="text-muted-foreground">
                  {dept.future.description}
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border rounded-2xl p-6 flex items-center justify-center">
                <p className="text-primary font-medium text-center">
                  رکام در خدمت هنرمندان و اندیشمندان
                </p>
              </div>
            </>
          )}

          {/* IT Department */}
          {dept.id === "it" && (
            <>
              <div className="space-y-6">
                <div className="bg-card border rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {dept.features.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {dept.features.description}
                  </p>
                  <p className="text-muted-foreground">
                    {dept.features.additional}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-card border rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {dept.future.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {dept.future.description}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 border rounded-2xl p-6">
                  <p className="text-primary font-medium text-center">
                    {dept.quote}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              <span className="ml-2">🏢</span>
              {departmentsTexts.page.title}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {departmentsTexts.page.subtitle}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {departmentsTexts.page.description}
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "overview"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {departmentsTexts.navigation.allDepartments}
            </button>
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === dept.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {dept.title}
              </button>
            ))}
            <button
              onClick={() => setActiveTab("form")}
              className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "form"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {departmentsTexts.navigation.joinForm}
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-16">
              {/* Departments Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {departments.map((dept) => {
                  const IconComponent = dept.icon;
                  return (
                    <div
                      key={dept.id}
                      className="group bg-card border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                      onClick={() => setActiveTab(dept.id)}
                    >
                      <div className="space-y-6">
                        <div className="p-4 bg-primary/10 rounded-xl w-fit">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {dept.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed line-clamp-3">
                            {dept.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          className="w-full justify-between group-hover:bg-primary/10 transition-colors"
                        >
                          مشاهده جزئیات
                          <ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Common Benefits */}
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-brand-teal/10 rounded-2xl p-8 border">
                <div className="text-center space-y-6">
                  <h2 className="text-3xl font-bold text-foreground">
                    {departmentsTexts.commonBenefits.title}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {departmentsTexts.commonBenefits.subtitle}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {departmentsTexts.commonBenefits.features.map(
                      (feature, index) => (
                        <div key={index} className="text-center space-y-2">
                          <div className="p-3 bg-background rounded-xl w-fit mx-auto">
                            <CheckCircle className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-semibold text-foreground">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                  <div className="pt-4">
                    <p className="text-2xl font-bold text-primary">
                      {departmentsTexts.commonBenefits.slogan}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Department Tabs */}
          {departments.map(
            (dept) =>
              activeTab === dept.id && (
                <div key={dept.id}>{renderDepartmentContent(dept)}</div>
              )
          )}

          {/* Membership Form Tab */}
          {activeTab === "form" && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold text-foreground">
                  {departmentsTexts.form.title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {departmentsTexts.form.description}
                </p>
              </div>

              <div className="bg-card border rounded-2xl p-8 shadow-sm">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Department Selection */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {departmentsTexts.form.fields.department.label}
                      </label>
                      <select
                        name="department"
                        required
                        value={formData.department}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">
                          {departmentsTexts.form.fields.department.placeholder}
                        </option>
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.title}>
                            {dept.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {departmentsTexts.form.fields.name.label}
                      </label>
                      <Input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder={
                          departmentsTexts.form.fields.name.placeholder
                        }
                      />
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {departmentsTexts.form.fields.mobile.label}
                      </label>
                      <Input
                        name="mobile"
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={handleFormChange}
                        placeholder={
                          departmentsTexts.form.fields.mobile.placeholder
                        }
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {departmentsTexts.form.fields.email.label}
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder={
                          departmentsTexts.form.fields.email.placeholder
                        }
                      />
                    </div>

                    {/* Website */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {departmentsTexts.form.fields.website.label}
                      </label>
                      <Input
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleFormChange}
                        placeholder={
                          departmentsTexts.form.fields.website.placeholder
                        }
                      />
                    </div>
                  </div>

                  {/* Opinion */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {departmentsTexts.form.fields.opinion.label}
                    </label>
                    <Textarea
                      name="opinion"
                      required
                      value={formData.opinion}
                      onChange={handleFormChange}
                      placeholder={
                        departmentsTexts.form.fields.opinion.placeholder
                      }
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg">
                    {departmentsTexts.form.submit}
                    <Send className="mr-2 h-5 w-5" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    {departmentsTexts.form.disclaimer}
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DepartmentsPage;
