import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/sponsors", label: t("nav.sponsors") },
    { to: "/donation", label: t("nav.donation") },
    { to: "/faq", label: t("nav.faq") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-primary"
          >
            <img
              src="/Logo.png"
              alt="Suvigya Srijan Foundation"
              className="h-16 w-35 object-contain"
            />
            <span className="hidden sm:inline">Suvigya Srijan Foundation</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-foreground hover:text-primary transition-colors text-sm font-medium",
                  location.pathname === link.to && "text-primary font-semibold"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm"
            >
              <Globe className="h-4 w-4" />
              {t("nav.language")}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "text-foreground hover:text-primary transition-colors text-base font-medium py-2",
                    location.pathname === link.to &&
                      "text-primary font-semibold"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm w-fit"
              >
                <Globe className="h-4 w-4" />
                {t("nav.language")}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
