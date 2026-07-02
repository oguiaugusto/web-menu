import { PAYMENT_METHODS } from '@/constants/text';
import { OrderItem as PrismaOrderItem, Order as PrismaOrder, OrderStatus } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export type Order = Omit<PrismaOrder, 'changeFor' | 'total' | 'payment'> & {
  changeFor: number | null;
  total: number;
  payment: string;
  items: (Omit<PrismaOrderItem, 'price'> & { price: number })[];
};

export type OrderSummary = {
  code: string;
  status: OrderStatus;
  createdAt: Date;
};

export async function getOrder(code: string): Promise<Order | null> {
  const order = await prisma.order.findUnique({
    where: { code: code.toUpperCase() },
    include: { items: true },
  });

  if (!order) return null;

  return {
    ...order,
    changeFor: order.changeFor?.toNumber() ?? null,
    total: order.total.toNumber(),
    payment: PAYMENT_METHODS[order.payment],
    items: order.items.map((x) => ({ ...x, price: x.price.toNumber() })),
  };
}

export async function getOrderStatus(code: string): Promise<string | null> {
  const order = await prisma.order.findUnique({
    where: { code: code.toUpperCase() },
    select: { status: true },
  });

  if (!order) return null;
  return order.status;
}

export async function getOrderSummaries(codes: string[]): Promise<OrderSummary[]> {
  const orders = await prisma.order.findMany({
    where: { code: { in: codes } },
    select: { code: true, status: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });

  return orders;
}
