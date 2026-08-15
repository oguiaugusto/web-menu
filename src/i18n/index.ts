import { DEFAULT_LANGUAGE, type SupportedLanguage } from '@/constants/supported-languages';
import { EN, EN_ERROR_MESSAGES, EN_PAYMENT_METHODS } from './en';
import { PT_BR, PT_BR_ERROR_MESSAGES, PT_BR_PAYMENT_METHODS } from './pt-BR';

export type { ErrorMessages, PaymentMethodLabels, TranslationDictionary, TranslationKey } from './types';

export function normalizeLocale(language: string | null | undefined): SupportedLanguage | null {
  if (!language) return null;

  const normalized = language.trim().toLowerCase();
  if (normalized === 'en' || normalized.startsWith('en-')) return 'en';
  if (normalized === 'pt' || normalized.startsWith('pt-')) return 'pt-BR';
  return null;
}

export function resolvePreferredLocale(
  storedLocale: string | null | undefined,
  browserLanguages: readonly string[] = [],
): SupportedLanguage {
  const stored = normalizeLocale(storedLocale);
  if (stored) return stored;

  for (const language of browserLanguages) {
    const browserLocale = normalizeLocale(language);
    if (browserLocale) return browserLocale;
  }

  return DEFAULT_LANGUAGE;
}

export function getText(language?: string | null) {
  return normalizeLocale(language) === 'pt-BR' ? PT_BR : EN;
}

export function getErrorMessages(language?: string | null) {
  return normalizeLocale(language) === 'pt-BR' ? PT_BR_ERROR_MESSAGES : EN_ERROR_MESSAGES;
}

export function getPaymentMethods(language?: string | null) {
  return normalizeLocale(language) === 'pt-BR' ? PT_BR_PAYMENT_METHODS : EN_PAYMENT_METHODS;
}
