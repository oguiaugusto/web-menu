import { getActiveOrders } from '@/db/order';
import { NextResponse } from 'next/server';

export async function GET() {
  const orders = await getActiveOrders();
  return NextResponse.json(orders);
}
