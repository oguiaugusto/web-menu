import { getOrderStatus } from '@/db/order';
import { getRestaurant } from '@/lib/restaurant';
import { ErrorCode } from '@/types/enums';
import { NextResponse } from 'next/server';

type Props = {
  params: Promise<{ slug: string; code: string }>;
};

export async function GET(_: Request, { params }: Props) {
  const { slug, code } = await params;

  const restaurant = await getRestaurant(slug);
  const status = await getOrderStatus(restaurant.id, code);

  if (!status) {
    return NextResponse.json({ error: ErrorCode.ORDER_NOT_FOUND }, { status: 404 });
  }

  return NextResponse.json({ status });
}
