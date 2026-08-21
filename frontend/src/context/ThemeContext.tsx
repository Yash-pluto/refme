"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ThemeContextValue {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize state lazily by reading what the blocking script already applied to the DOM.
  // Fall back to `false` (or `true`) for SSR where document is undefined.
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false; 
  });

  // Keep the persistent write-effect for when the user actively toggles the theme later
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (darkMode) {
      root.classList.add("dark");
      body.classList.add("dark");
      window.localStorage.setItem("refme-theme", "dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
      window.localStorage.setItem("refme-theme", "light");
    }
  }, [darkMode]);

  const value = useMemo(
    () => ({
      darkMode,
      toggleTheme: () => setDarkMode((current) => !current),
    }),
    [darkMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}