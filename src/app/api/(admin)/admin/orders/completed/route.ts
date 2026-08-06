import { getCompletedOrders } from '@/db/order';
import { NextResponse } from 'next/server';

export async function GET() {
  const orders = await getCompletedOrders();
  return NextResponse.json(orders);
}
