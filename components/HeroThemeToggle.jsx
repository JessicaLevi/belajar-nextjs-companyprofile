"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function HeroThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group relative gap-2 rounded-full px-6"
      suppressHydrationWarning
    >
      <div className="relative size-4">
        <Sun className="absolute inset-0 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <Moon className="absolute inset-0 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      </div>

      <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
    </Button>
  );
}
