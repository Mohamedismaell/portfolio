"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
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

// Runs only on the client, but synchronously before paint (layout phase)
function getInitialTheme(defaultTheme: Theme, enableSystem: boolean): Theme {
  if (typeof window === "undefined") return defaultTheme;

  const savedTheme = localStorage.getItem("theme") as Theme | null;
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

  if (enableSystem) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return defaultTheme;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "light",
  enableSystem = false,
}: ThemeProviderProps) {
  // Lazy initializer avoids a light->dark flash on first client render
  const [theme, setThemeState] = useState<Theme>(() =>
    getInitialTheme(defaultTheme, enableSystem)
  );

  // useLayoutEffect applies the class SYNCHRONOUSLY, before the browser paints
  // and before a View Transition snapshot is taken. This is the key fix.
  useLayoutEffect(() => {
    const root = document.documentElement;

    if (attribute === "class") {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    } else {
      root.setAttribute(attribute, theme);
    }
  }, [theme, attribute]);

  // Persisting to localStorage has no visual impact, so a normal effect is fine
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

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