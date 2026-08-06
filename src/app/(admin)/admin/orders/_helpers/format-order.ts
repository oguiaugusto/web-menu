import { TEXT } from '@/constants/text';
import { OrderItem } from '@/db/orderItem';

export function formatOrderDate(value: string) {
  return new Intl.DateTimeFormat(TEXT.languageCountryISO, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function formatOrderItem(item: OrderItem, alwaysIncludeQuantity?: boolean) {
  return item.quantity > 1 || alwaysIncludeQuantity ? `${item.quantity}x ${item.name}` : item.name;
}

export function formatCurrency(value: number) {
  return `${TEXT.currency}${value.toFixed(2)}`;
}
