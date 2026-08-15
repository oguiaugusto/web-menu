export const SUPPORTED_LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'pt-BR', label: 'Português Brasileiro' },
] as const;

export const DEFAULT_LANGUAGE = 'en';

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]['value'];
