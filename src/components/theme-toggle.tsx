"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }
  console.log("Current theme:", theme);
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-indigo-900 dark:to-purple-900 backdrop-blur-sm border border-orange-200 dark:border-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center group overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Light mode sun - only show in light theme */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-0 ${
          theme === "light" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative">
          <Sun className="h-5 w-5 text-orange-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-sm opacity-30 scale-150"></div>
        </div>
      </div>

      {/* Dark mode moon - only show in dark theme */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-0 ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative">
          <Moon className="h-5 w-5 text-indigo-300" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-sm opacity-20 scale-150"></div>
        </div>
      </div>

      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
