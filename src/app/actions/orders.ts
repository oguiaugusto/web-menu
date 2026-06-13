'use server';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { ErrorCode } from '@/types/enums';
import { parseZodErrors } from '@/utils/parseZodErrors';
import z from 'zod';

const createOrderSchema = z.object({
  customerName: z.string().nonempty(),
  customerPhone: z.string().nonempty(),
  deliveryAddress: z.string().nonempty(),
  notes: z.string().optional(),
  payment: z.string(),
  changeFor: z.number().min(1).optional(),
  items: z.array(
    z.object({
      id: z.string(),
      quantity: z.number().int().positive(),
    }),
  ),
});

type CreateOrderInput = z.infer<typeof createOrderSchema>;

type CreateOrderResult = { success: true } | { success: false; error: ErrorType };

type ItemInput = {
  menuItemId: string;
  name: string;
  price: Prisma.Decimal;
  quantity: number;
};

type ErrorType = { form?: ErrorCode; fields?: Record<string, ErrorCode> };

function returnError(error: ErrorType) {
  return {
    success: false,
    error,
  };
}

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

export async function createOrder(rawData: CreateOrderInput): Promise<CreateOrderResult> {
  const parsed = createOrderSchema.safeParse(rawData);
  if (!parsed.success) {
    return returnError({ fields: parseZodErrors(parsed.error) });
  }

  const { data } = parsed;

  const menuItems = await prisma.menuItem.findMany({
    where: { id: { in: data.items.map((x) => x.id) } },
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
      menuItemId: curr.id,
      name: exItem.name,
      price: exItem.price,
      quantity: curr.quantity,
    });
  }

  if (items.length === 0) {
    return returnError({ form: ErrorCode.EMPTY_ORDER });
  }

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
      code,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      deliveryAddress: data.deliveryAddress,
      notes: data.notes,
      payment: data.payment as 'CASH' | 'CARD',
      changeFor: data.changeFor,
      total: total,
      items: { createMany: { data: items } },
    },
  });

  return { success: true };
}
