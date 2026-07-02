import { ORDER_CODES_KEY } from '@/constants/localStorage';

const MAX_RECENT_ORDERS = 10;

export function getOrderCodes(): string[] {
  const stored = JSON.parse(localStorage.getItem(ORDER_CODES_KEY) || '[]');
  return !Array.isArray(stored) ? [] : [...new Set(stored)];
}

export function saveOrderCode(code: string) {
  const stored = getOrderCodes();

  if (!stored.includes(code)) {
    stored.unshift(code);
  }

  localStorage.setItem(ORDER_CODES_KEY, JSON.stringify(stored.slice(0, MAX_RECENT_ORDERS)));
}
