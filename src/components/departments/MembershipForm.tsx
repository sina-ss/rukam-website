import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { departmentsTexts } from "@/constants/departments-texts";

interface MembershipFormProps {
  formData: {
    department: string;
    opinion: string;
    name: string;
    email: string;
    mobile: string;
    website: string;
  };
  handleFormSubmit: (e: React.FormEvent) => void;
  handleFormChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  departments: Array<{
    id: string;
    title: string;
    [key: string]: any;
  }>;
}

const MembershipForm = ({
  formData,
  handleFormSubmit,
  handleFormChange,
  departments,
}: MembershipFormProps) => {
  return (
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
                placeholder={departmentsTexts.form.fields.name.placeholder}
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
                placeholder={departmentsTexts.form.fields.mobile.placeholder}
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
                placeholder={departmentsTexts.form.fields.email.placeholder}
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
                placeholder={departmentsTexts.form.fields.website.placeholder}
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
              placeholder={departmentsTexts.form.fields.opinion.placeholder}
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
  );
};

export default MembershipForm;
