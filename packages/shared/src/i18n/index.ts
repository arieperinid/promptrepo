/**
 * Internationalization system for PromptRepo
 * 
 * Provides type-safe translations with support for English and Portuguese (Brazil).
 */

import { en } from "./en";
import { ptBR } from "./pt-BR";

/**
 * Available locales
 */
export const LOCALES = ['en', 'pt-BR'] as const;
export type Locale = typeof LOCALES[number];

/**
 * Default locale
 */
export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Translation dictionaries
 */
const dictionaries = {
  en,
  'pt-BR': ptBR,
} as const;

/**
 * Get translation dictionary for a locale
 */
export function getDict(locale: Locale = DEFAULT_LOCALE) {
  return dictionaries[locale];
}

/**
 * Type for translation keys (dot notation)
 */
export type TranslationKey = 
  | `common.${keyof typeof en.common}`
  | `project.${keyof typeof en.project}`
  | `segment.${keyof typeof en.segment}`
  | `prompt.${keyof typeof en.prompt}`
  | `validator.${keyof typeof en.validator}`
  | `profile.${keyof typeof en.profile}`
  | `billing.${keyof typeof en.billing}`
  | `errors.${keyof typeof en.errors}`;

/**
 * Get a nested translation value by key
 */
export function getTranslation(
  locale: Locale,
  key: TranslationKey
): string {
  const dict = getDict(locale);
  const keys = key.split('.') as [keyof typeof dict, string];
  const [section, subKey] = keys;
  
  const sectionDict = dict[section];
  if (!sectionDict || typeof sectionDict !== 'object') {
    return key; // Fallback to key if section not found
  }
  
  const value = (sectionDict as Record<string, string>)[subKey];
  return value ?? key; // Fallback to key if translation not found
}

/**
 * Simple translation function (t)
 */
export function t(key: TranslationKey, locale: Locale = DEFAULT_LOCALE): string {
  return getTranslation(locale, key);
}

/**
 * Check if a locale is supported
 */
export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

/**
 * Get the best matching locale from a list of preferred locales
 */
export function getBestLocale(preferredLocales: string[]): Locale {
  for (const preferred of preferredLocales) {
    if (isValidLocale(preferred)) {
      return preferred;
    }
    
    // Try language part only (e.g., 'pt' from 'pt-BR')
    const language = preferred.split('-')[0];
    if (language === 'pt' && LOCALES.includes('pt-BR')) {
      return 'pt-BR';
    }
    if (language === 'en' && LOCALES.includes('en')) {
      return 'en';
    }
  }
  
  return DEFAULT_LOCALE;
}

/**
 * Export translation dictionaries for direct access
 */
export { en, ptBR };
export type TranslationDict = typeof en;
