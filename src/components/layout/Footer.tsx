import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { SocialLinks } from "@/components/ui/social-links";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Marketplace", href: "#marketplace" },
    { name: "AI Assistant", href: "#ai" },
    { name: "Pricing", href: "#pricing" },
  ],
  resources: [
    { name: "Knowledge Hub", href: "#" },
    { name: "Video Tutorials", href: "#" },
    { name: "Expert Network", href: "#" },
    { name: "Success Stories", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Press", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">
                <span className="text-primary">Agro</span>
                <span className="text-secondary">Connect</span>
                <span className="text-accent"> AI</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              India's most trusted AI-powered agriculture platform helping
              farmers grow smarter and sell better.
            </p>

            {/* Contact */}
            <div className="space-y-2">
              <a
                href="tel:+917047698206"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                7047698206
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=gouravsamanta587@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compose email in Gmail"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                gouravsamanta587@gmail.com
              </a>
              <a
                href="https://maps.app.goo.gl/Yh17VkD4JavovV2P7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Khatra, Bankura, West Bangal
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 AgroConnect AI. Made with ❤️ for Indian Farmers.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Available in:</span>
            <div className="flex gap-2">
              {["🇮🇳 हिंदी", "English"].map((lang, i) => (
                <button
                  key={i}
                  className="px-3 py-1 text-sm bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Social links */}
            <div className="ml-4">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
