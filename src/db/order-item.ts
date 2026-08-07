import { OrderItem as PrismaOrderItem } from '@/generated/prisma/client';

export type OrderItem = Omit<PrismaOrderItem, 'price'> & { price: number };

export function parseOrderItem(orderItem: PrismaOrderItem): OrderItem {
  return { ...orderItem, price: orderItem.price.toNumber() };
}
