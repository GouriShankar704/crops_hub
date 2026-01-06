import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Avoid SSR mismatch
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme" className="hidden md:flex">
        <Sun className="w-5 h-5" />
      </Button>
    );
  }

  const current = theme ?? "system";
  const next = current === "system" ? "light" : current === "light" ? "dark" : "system";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(next)}
      aria-label={`Switch theme (current: ${current})`}
      className="hidden md:flex"
    >
      {current === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </Button>
  );
};
