import { searchRestaurants } from '@/db/restaurant';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get('query');
  if (!query) return NextResponse.json([]);

  const data = await searchRestaurants(query);
  return NextResponse.json(data);
}
