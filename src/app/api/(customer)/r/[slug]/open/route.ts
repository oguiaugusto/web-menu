import { getRestaurant } from '@/lib/restaurant';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;

    const restaurant = await getRestaurant(slug);
    return NextResponse.json({ open: restaurant.open });
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
