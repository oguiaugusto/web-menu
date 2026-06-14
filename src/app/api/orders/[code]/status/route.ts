import { getOrderStatus } from '@/db/order';
import { ErrorCode } from '@/types/enums';
import { NextResponse } from 'next/server';

type Props = {
  params: Promise<{ code: string }>;
};

export async function GET(_: Request, { params }: Props) {
  const { code } = await params;

  const status = await getOrderStatus(code);

  if (!status) {
    return NextResponse.json({ error: ErrorCode.ORDER_NOT_FOUND }, { status: 404 });
  }

  return NextResponse.json({ status });
}
