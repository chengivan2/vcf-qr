"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    { name: "light", icon: Sun },
    { name: "system", icon: Monitor },
    { name: "dark", icon: Moon },
  ];

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex bg-neutral-200 dark:bg-neutral-800 p-1 rounded-full shadow-inner">
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = theme === t.name;
          return (
            <button
              key={t.name}
              onClick={() => setTheme(t.name)}
              className={cn(
                "p-2 rounded-full transition-all duration-200 flex items-center justify-center",
                isActive
                  ? "bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200",
              )}
              aria-label={`Switch to ${t.name} theme`}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
