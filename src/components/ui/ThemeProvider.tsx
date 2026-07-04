"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: "class" | "data-theme";
  defaultTheme?: Theme;
  enableSystem?: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "light",
  enableSystem = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    let initialTheme: Theme = defaultTheme;

    if (savedTheme === "light" || savedTheme === "dark") {
      initialTheme = savedTheme;
    } else if (enableSystem && typeof window !== "undefined") {
      initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    setThemeState(initialTheme);
    setMounted(true);
  }, [defaultTheme, enableSystem]);

  useEffect(() => {
    if (!mounted || typeof document === "undefined") return;

    const root = document.documentElement;

    if (attribute === "class") {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    } else {
      root.setAttribute(attribute, theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted, attribute]);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}