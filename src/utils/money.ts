import { TEXT } from '@/constants/text';

export const moneyFormatter = new Intl.NumberFormat(TEXT.languageCountryISO, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatMoney(value: string) {
  const digits = value.replace(/\D/g, '');
  const num = Number(digits) / 100;

  return num.toFixed(2);
}
