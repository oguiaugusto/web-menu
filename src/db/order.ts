import { PAYMENT_METHODS } from '@/constants/text';
import { Order as PrismaOrder, OrderStatus, OrderItem as PrismaOrderItem } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { OrderItem, parseOrderItem } from './orderItem';
import { requireCurrentUser } from '@/lib/auth/user';

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

function parseOrder(order: PrismaOrder & { items: PrismaOrderItem[] }): Order {
  return {
    ...order,
    changeFor: order.changeFor?.toNumber() ?? null,
    deliveryFee: order.deliveryFee?.toNumber() ?? null,
    total: order.total.toNumber(),
    payment: PAYMENT_METHODS[order.payment],
    items: order.items.map(parseOrderItem),
  };
}

export async function getOrder(restaurantId: string, code: string): Promise<Order | null> {
  const order = await prisma.order.findUnique({
    where: { restaurantId, code: code.toUpperCase() },
    include: { items: true },
  });

  if (!order) return null;
  return parseOrder(order);
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

export async function getActiveOrders(): Promise<Order[]> {
  const user = await requireCurrentUser();

  const orders = await prisma.order.findMany({
    where: {
      restaurantId: user.restaurant.id,
      status: { notIn: [OrderStatus.CANCELLED, OrderStatus.DELIVERED] },
    },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  return orders.map(parseOrder);
}

export async function getCompletedOrders(): Promise<Order[]> {
  const user = await requireCurrentUser();

  const orders = await prisma.order.findMany({
    where: {
      restaurantId: user.restaurant.id,
      status: { in: [OrderStatus.CANCELLED, OrderStatus.DELIVERED] },
    },
    include: { items: true },
    orderBy: { updatedAt: 'desc' },
  });

  return orders.map(parseOrder);
}
