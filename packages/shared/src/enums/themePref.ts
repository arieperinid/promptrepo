/**
 * Theme preference enumeration
 */
export const THEME_PREF = {
  light: 'light',
  dark: 'dark',
} as const;

export type ThemePref = typeof THEME_PREF[keyof typeof THEME_PREF];

export const THEME_PREFS = Object.values(THEME_PREF);
