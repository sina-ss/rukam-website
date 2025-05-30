import Link from "next/link";
import { homeTexts } from "@/constants/home-texts";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                ر
              </div>
              <span className="text-xl font-bold text-foreground">
                {homeTexts.footer.company.name}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {homeTexts.footer.company.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {homeTexts.footer.quickLinks.title}
            </h3>
            <ul className="space-y-2">
              {homeTexts.footer.quickLinks.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {homeTexts.footer.departments.title}
            </h3>
            <ul className="space-y-2">
              {homeTexts.footer.departments.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {homeTexts.footer.contact.title}
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {homeTexts.footer.contact.description}
              </p>
            </div>
          </div>
        </div>

        {/* Warning Section */}
        <div className="mt-8 pt-8 border-t">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive font-medium">
              {homeTexts.footer.warning}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {homeTexts.footer.company.name}.{" "}
            {homeTexts.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
