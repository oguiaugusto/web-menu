import { OrderItem } from '@/db/order-item';

export function formatOrderItem(item: OrderItem, alwaysIncludeQuantity?: boolean) {
  return item.quantity > 1 || alwaysIncludeQuantity ? `${item.quantity}x ${item.name}` : item.name;
}
