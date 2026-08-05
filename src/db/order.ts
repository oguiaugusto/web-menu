import { PAYMENT_METHODS } from '@/constants/text';
import { Order as PrismaOrder, OrderStatus } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { OrderItem } from './orderItem';

export type Order = Omit<PrismaOrder, 'changeFor' | 'deliveryFee' | 'total' | 'payment'> & {
  changeFor: number | null;
  deliveryFee: number | null;
  total: number;
  payment: string;
  items: OrderItem[];
};

export type OrderSummary = {
  code: string;
  status: OrderStatus;
  createdAt: Date;
};

export async function getOrder(restaurantId: string, code: string): Promise<Order | null> {
  const order = await prisma.order.findUnique({
    where: { restaurantId, code: code.toUpperCase() },
    include: { items: true },
  });

  if (!order) return null;

  return {
    ...order,
    changeFor: order.changeFor?.toNumber() ?? null,
    deliveryFee: order.deliveryFee?.toNumber() ?? null,
    total: order.total.toNumber(),
    payment: PAYMENT_METHODS[order.payment],
    items: order.items.map((x) => ({ ...x, price: x.price.toNumber() })),
  };
}

export async function getOrderStatus(restaurantId: string, code: string): Promise<string | null> {
  const order = await prisma.order.findUnique({
    where: { restaurantId, code: code.toUpperCase() },
    select: { status: true },
  });

  if (!order) return null;
  return order.status;
}

export async function getOrderSummaries(restaurantId: string, codes: string[]): Promise<OrderSummary[]> {
  const orders = await prisma.order.findMany({
    where: { restaurantId, code: { in: codes } },
    select: { code: true, status: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });

  return orders;
}
