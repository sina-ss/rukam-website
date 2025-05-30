import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CommonBenefits from "./CommonBenefits";

interface DepartmentsOverviewProps {
  departments: Array<{
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    [key: string]: any;
  }>;
  setActiveTab: (tab: string) => void;
}

const DepartmentsOverview = ({
  departments,
  setActiveTab,
}: DepartmentsOverviewProps) => {
  return (
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
      <CommonBenefits />
    </div>
  );
};

export default DepartmentsOverview;
