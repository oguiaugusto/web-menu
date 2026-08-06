'use server';

import { OrderStatus, Prisma } from '@/generated/prisma/client';
import { requireCurrentUser } from '@/lib/auth/user';
import { prisma } from '@/lib/prisma';
import { ErrorCode } from '@/types/enums';
import { ResultError } from '@/types/misc';
import { parseZodErrors } from '@/utils/parse-zod-errors';
import { returnError } from '@/utils/return-error';
import { notFound } from 'next/navigation';
import z from 'zod';

const CreateOrderSchema = z.object({
  name: z.string().trim().nonempty(),
  phone: z.string().trim().nonempty(),
  address: z.string().trim().nonempty(),
  notes: z.string().trim().optional(),
  payment: z.string().trim(),
  changeFor: z.number().min(1).optional(),
  items: z.array(
    z.object({
      id: z.string().trim(),
      quantity: z.number().int().positive(),
    }),
  ),
});

type CreateOrderInput = z.infer<typeof CreateOrderSchema>;

type ResultSuccess = { success: true };
type CreateOrderResult = (ResultSuccess & { code: string }) | ResultError;
type UpdateOrderStatusResult = (ResultSuccess & { status: OrderStatus }) | ResultError;

type ItemInput = {
  menuItemId: string;
  name: string;
  price: Prisma.Decimal;
  quantity: number;
  restaurantId: string;
};

function generateCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'WM-';

  let index = 0;
  while (index < 6) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    code += alphabet[randomIndex];
    index++;
  }

  return code;
}

export async function createOrder(restaurantId: string, rawData: CreateOrderInput): Promise<CreateOrderResult> {
  const restaurant = await prisma.restaurant.findUnique({ where: { id: restaurantId } });
  if (!restaurant) notFound();

  const parsed = CreateOrderSchema.safeParse(rawData);
  if (!parsed.success) {
    return returnError({ fields: parseZodErrors(parsed.error) });
  }

  const { data } = parsed;

  const menuItems = await prisma.menuItem.findMany({
    where: { restaurantId: restaurant.id, id: { in: data.items.map((x) => x.id) } },
    select: { id: true, name: true, price: true },
  });
  const menuItemMap = new Map(menuItems.map((x) => [x.id, x]));

  let total = new Prisma.Decimal(0);
  const items: ItemInput[] = [];

  for (const curr of data.items) {
    const exItem = menuItemMap.get(curr.id);

    if (!exItem) continue;

    total = total.plus(exItem.price.mul(curr.quantity));

    items.push({
      restaurantId: restaurant.id,
      menuItemId: curr.id,
      name: exItem.name,
      price: exItem.price,
      quantity: curr.quantity,
    });
  }

  if (items.length === 0) {
    return returnError({ form: ErrorCode.EMPTY_ORDER });
  }

  if (restaurant.deliveryFee) total = total.plus(restaurant.deliveryFee);

  if (!['CASH', 'CARD'].includes(data.payment)) {
    return returnError({ fields: { payment: ErrorCode.INVALID_PAYMENT_METHOD } });
  }

  if (data.changeFor !== undefined) {
    if (data.payment !== 'CASH') {
      data.changeFor = undefined;
    } else {
      if (new Prisma.Decimal(data.changeFor).lessThanOrEqualTo(total)) {
        return returnError({ fields: { changeFor: ErrorCode.CHANGE_FOR_SMALLER_THAN_TOTAL } });
      }
    }
  }

  let code: string;

  do {
    code = generateCode();
  } while (await prisma.order.findUnique({ where: { code } }));

  await prisma.order.create({
    data: {
      restaurantId: restaurant.id,
      code,
      customerName: data.name,
      customerPhone: data.phone,
      deliveryAddress: data.address,
      notes: data.notes,
      payment: data.payment as 'CASH' | 'CARD',
      changeFor: data.changeFor,
      deliveryFee: restaurant.deliveryFee,
      total: total,
      items: { createMany: { data: items } },
    },
  });

  return { success: true, code };
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<UpdateOrderStatusResult> {
  const user = await requireCurrentUser();

  try {
    const order = await prisma.order.update({
      where: { restaurantId: user.restaurant.id, id },
      data: { status },
    });

    return { success: true, status: order.status };
  } catch {
    return returnError({ form: ErrorCode.STATUS_NOT_UPDATED });
  }
}
