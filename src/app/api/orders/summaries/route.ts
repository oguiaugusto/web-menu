import { getOrderSummaries } from '@/db/order';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const codes: string[] = searchParams.getAll('codes');
    if (!codes.length) return NextResponse.json([]);

    const orders = await getOrderSummaries(codes);
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
