/**
 * Language enumeration
 */
export const LANGUAGE = {
  en: 'en',
  'pt-BR': 'pt-BR',
} as const;

export type Language = typeof LANGUAGE[keyof typeof LANGUAGE];

export const LANGUAGES = Object.values(LANGUAGE);

export const DEFAULT_LANGUAGE: Language = 'pt-BR';
