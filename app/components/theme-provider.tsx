import { createContext, useContext, useEffect, useState } from "react";

type ThemePreference = "dark" | "light" | "system";
type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultThemePreference?: ThemePreference;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  themePreference: ThemePreference;
  setThemePreference: (theme: ThemePreference) => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  themePreference: "system",
  setThemePreference: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
  defaultThemePreference = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  // On initial load, read the preferred theme from localStorage
  const [themePreference, setThemePreference] = useState<ThemePreference>(
    () =>
      (localStorage.getItem(storageKey) as ThemePreference) ||
      defaultThemePreference,
  );

  // On initial load, determine the theme based on the preference
  const [theme, setTheme] = useState<Theme>((): Theme => {
    if (themePreference !== "system") return themePreference;

    return getSystemTheme();
  });

  // When the theme preference is system, listen for changes in the system
  // preference and update the theme accordingly
  useEffect(() => {
    if (themePreference !== "system") {
      setTheme(themePreference);
      return;
    }

    function mediaChangeListener(e: MediaQueryListEvent) {
      const theme: Theme = e.matches ? "dark" : "light";
      setTheme(theme);
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", mediaChangeListener);

    setTheme(getSystemTheme());

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", mediaChangeListener);
    };
  }, [themePreference]);

  // When the theme changes, set the document's root element theme class
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    themePreference,
    setThemePreference: (themePreference: ThemePreference) => {
      localStorage.setItem(storageKey, themePreference);
      setThemePreference(themePreference);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
