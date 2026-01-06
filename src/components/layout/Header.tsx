import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { Menu, X, Leaf, User, Search, MessageSquare, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AIAssistant } from "@/components/home/AIAssistant";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SocialLinks } from "@/components/ui/social-links";
import { useActiveSection } from "@/hooks/useActiveSection";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Marketplace", href: "#marketplace" },
  { name: "AI Assistant", href: "#ai" },
  { name: "Chatbot", href: "/chat" },
  { name: "Community", href: "#community" },
  { name: "Schemes", href: "#schemes" },
];

const SECTION_IDS = ["home", "marketplace", "ai", "community", "schemes", "features", "contact"];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const activeSection = useActiveSection(SECTION_IDS);

  const isActiveLink = (href: string) => {
    if (href.startsWith("#")) {
      // only active when on home page and section matches
      if (location.pathname !== "/") return false;
      const id = href.replace("#", "");
      return activeSection === id;
    }
    return location.pathname === href;
  };

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");

    const scrollToEl = (el: HTMLElement | null) => {
      if (!el) return;
      const header = document.querySelector('header');
      const headerHeight = header ? (header as HTMLElement).offsetHeight : 80;
      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top - headerHeight - 8; // small gap
      window.scrollTo({ top, behavior: 'smooth' });
      // update URL hash without navigating
      window.history.pushState({}, '', `#${id}`);
    };

    if (location.pathname !== "/") {
      // navigate to home with hash then scroll after a tick
      navigate(`/#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        scrollToEl(el);
      }, 200);
      return;
    }

    const el = document.getElementById(id);
    scrollToEl(el);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl hidden sm:block">
              <span className="text-primary">Agro</span>
              <span className="text-secondary">Connect</span>
              <span className="text-accent"> AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith("#");
              const isActive = isActiveLink(link.href);
              
              if (isExternal) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                      isActive 
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              }
              
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>

            {/* Theme Toggle */}
            <div className="hidden md:flex">
              <div className="mr-2">
                {/* Lazy import small toggle */}
                <React.Suspense fallback={<div />}> 
                  <ThemeToggle />
                </React.Suspense>
              </div>
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center gap-3 mr-2">
              <a href="tel:+917047698206" className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-lg">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">7047698206</span>
              </a>

              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=gouravsamanta587@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Compose email in Gmail" className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-lg">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Contact</span>
              </a>

              <SocialLinks />
            </div>

            {/* Floating Chat Launcher */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <MessageSquare className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl w-[90%]">
                <DialogHeader>
                  <DialogTitle>Chat with AgroConnect AI</DialogTitle>
                  <DialogDescription>Ask questions or get simple help.</DialogDescription>
                </DialogHeader>
                {/* Lazy load the assistant to avoid bundling duplicate code */}
                <div className="pt-4">
                  <AIAssistant />
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button size="sm" className="hidden md:flex">
              Get Started
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background"
          >
            <nav className="container py-4 flex flex-col gap-2">
                {navLinks.map((link) => {
                const isExternal = link.href.startsWith("#");
                if (isExternal) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        handleAnchorClick(e, link.href);
                        setIsOpen(false);
                      }}
                      className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-xl transition-colors"
                    >
                      {link.name}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-xl transition-colors"
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="mt-4 pt-4 border-t border-border space-y-2">
                <a href="tel:+917047698206" className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded-xl">Call: 7047698206</a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=gouravsamanta587@gmail.com" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded-xl">Email: gouravsamanta587@gmail.com</a>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border mt-2">
                <Button variant="outline" className="flex-1">
                  Login
                </Button>
                <Button className="flex-1">
                  Get Started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
