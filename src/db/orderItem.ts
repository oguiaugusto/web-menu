import { OrderItem as PrismaOrderItem } from '@/generated/prisma/client';

export type OrderItem = Omit<PrismaOrderItem, 'price'> & { price: number };
