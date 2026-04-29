"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/5 animate-pulse h-10" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 group border border-transparent hover:border-gray-200 dark:hover:border-white/10"
      aria-label="Toggle theme"
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-400 dark:text-white/40 group-hover:text-gray-900 dark:group-hover:text-white">
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </span>
        <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
      </div>
      <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 ${isDark ? 'bg-violet-500' : 'bg-gray-400'}`}>
        <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 transform ${isDark ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
    </button>
  );
}
