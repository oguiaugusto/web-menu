import { ORDER_CODES_KEY } from '@/constants/localStorage';

export function getOrderCodes(): string[] {
  const stored = JSON.parse(localStorage.getItem(ORDER_CODES_KEY) || '[]');
  return !Array.isArray(stored) ? [] : [...new Set(stored)];
}

export function saveOrderCode(code: string) {
  const stored = getOrderCodes();

  if (!stored.includes(code)) {
    stored.push(code);
  }

  localStorage.setItem(ORDER_CODES_KEY, JSON.stringify(stored));
}
