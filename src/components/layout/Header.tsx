"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Menu, X } from "lucide-react";
import { homeTexts } from "@/constants/home-texts";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 space-x-reverse"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              ر
            </div>
            <span className="text-xl font-bold text-foreground">
              {homeTexts.navigation.logo}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            {homeTexts.navigation.menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <ModeToggle />
            <Button variant="outline" size="sm">
              {homeTexts.navigation.auth.login}
            </Button>
            <Button size="sm">{homeTexts.navigation.auth.signup}</Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="flex flex-col space-y-4 p-4">
              {homeTexts.navigation.menu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    تم سایت
                  </span>
                  <ModeToggle />
                </div>
                <Button variant="outline" size="sm">
                  {homeTexts.navigation.auth.login}
                </Button>
                <Button size="sm">{homeTexts.navigation.auth.signup}</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
