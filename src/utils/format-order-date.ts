import { DEFAULT_LANGUAGE } from '@/constants/supported-languages';
import { normalizeLocale } from '@/i18n';

export function formatOrderDate(value: string | Date, language: string) {
  return new Intl.DateTimeFormat(normalizeLocale(language) ?? DEFAULT_LANGUAGE, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}
