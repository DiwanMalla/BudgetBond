"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeDebug() {
  const { theme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [htmlClass, setHtmlClass] = useState("");

  useEffect(() => {
    setMounted(true);
    // Check the actual HTML class
    const observer = new MutationObserver(() => {
      setHtmlClass(document.documentElement.className);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setHtmlClass(document.documentElement.className);

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs z-50 font-mono">
      <div>Theme: {theme}</div>
      <div>Resolved: {resolvedTheme}</div>
      <div>System: {systemTheme}</div>
      <div>HTML Class: &quot;{htmlClass}&quot;</div>
      <div>
        Screen:{" "}
        {typeof window !== "undefined"
          ? window.innerWidth + "x" + window.innerHeight
          : "unknown"}
      </div>
      <div className="mt-2 p-2 bg-white dark:bg-red-500 text-black dark:text-white rounded">
        Dark Mode Test: {htmlClass.includes("dark") ? "ACTIVE" : "INACTIVE"}
      </div>
    </div>
  );
}
