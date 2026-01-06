import * as React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SOCIAL_LINKS } from "@/config/socials";

export const SocialLinks = ({ size = 5 }: { size?: number }) => {
  const links = [
    { icon: <Github className={`w-${size} h-${size}`} />, url: SOCIAL_LINKS.github, label: "GitHub" },
    { icon: <Linkedin className={`w-${size} h-${size}`} />, url: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: <Twitter className={`w-${size} h-${size}`} />, url: SOCIAL_LINKS.twitter, label: "Twitter" },
  ];

  return (
    <div className="flex items-center gap-3">
      {links.map((l) =>
        l.url ? (
          <a
            key={l.label}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={l.label}
          >
            {l.icon}
          </a>
        ) : null,
      )}
    </div>
  );
};
