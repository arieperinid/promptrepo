export type ThemeMode = "light" | "dark" | "system";

/**
 * Gets the initial theme from localStorage or defaults to 'light'
 * Note: Database theme preference will be implemented in P5.0
 */
export function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch (error) {
    console.warn("Failed to read theme from localStorage:", error);
  }

  return "light";
}

/**
 * Sets theme preference in localStorage
 * @param theme - The theme to set
 */
export function setThemePreference(theme: ThemeMode): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    console.warn("Failed to save theme to localStorage:", error);
  }
}

/**
 * Gets the resolved theme (converts 'system' to actual preference)
 */
export function getResolvedTheme(theme: ThemeMode): "light" | "dark" {
  if (theme === "system") {
    if (typeof window === "undefined") {
      return "light";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}
