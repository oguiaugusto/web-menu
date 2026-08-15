import { SUPPORTED_CURRENCIES } from '@/constants/supported-currencies';

export type CurrencyOptions = {
  currency: string;
  locale: string;
};

export function getCurrencyLocale(currency: string) {
  return SUPPORTED_CURRENCIES.find((x) => x.value === currency)?.locale ?? 'en-US';
}

export function getMoneyFormatter(currency: string) {
  return new Intl.NumberFormat(getCurrencyLocale(currency), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatMoneyInput(value: string) {
  const digits = value.replace(/\D/g, '');
  const num = Number(digits) / 100;

  return num.toFixed(2);
}

export function getCurrencySymbol(currency: string) {
  return new Intl.NumberFormat(getCurrencyLocale(currency), { style: 'currency', currency })
    .formatToParts(0)
    .find((part) => part.type === 'currency')?.value;
}

export function formatCurrency(value: number, currency: string) {
  const locale = getCurrencyLocale(currency);
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}
