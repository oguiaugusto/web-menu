import { getOrderSummaries } from '@/db/order';
import { getRestaurant } from '@/lib/restaurant';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;

    const { searchParams } = request.nextUrl;

    const codes: string[] = searchParams.getAll('codes');
    if (!codes.length) return NextResponse.json([]);

    const restaurant = await getRestaurant(slug);
    const orders = await getOrderSummaries(restaurant.id, codes);
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
