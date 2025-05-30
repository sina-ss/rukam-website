import { departmentsTexts } from "@/constants/departments-texts";

interface DepartmentsNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  departments: Array<{
    id: string;
    title: string;
    [key: string]: any;
  }>;
}

const DepartmentsNavigation = ({
  activeTab,
  setActiveTab,
  departments,
}: DepartmentsNavigationProps) => {
  return (
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
  );
};

export default DepartmentsNavigation;
