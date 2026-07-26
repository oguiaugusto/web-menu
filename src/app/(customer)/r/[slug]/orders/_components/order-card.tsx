import { OrderSummary } from '@/db/order';
import Link from 'next/link';
import { STATUS_INFO } from '../_constants/status';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { rSlug } from '@/utils/r-slug';

type Props = {
  slug: string;
  order: OrderSummary;
};

export function OrderCard({ slug, order }: Props) {
  const date = new Date(order.createdAt).toLocaleString();

  return (
    <Link
      href={rSlug(slug, `/orders/${order.code}`)}
      className="hover:border-red-muted hover:shadow-red-muted/30 flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 transition hover:shadow-xs"
    >
      <div>
        <p className="font-mono font-semibold">{order.code}</p>
        <p className="mt-1 text-sm text-neutral-500">{date}</p>
      </div>
      <div className="flex items-center gap-1">
        <p
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium',
            order.status === 'DELIVERED' && 'bg-green-100 text-green-700',
            order.status === 'CANCELLED' && 'bg-red-100 text-red-700',
            order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && 'bg-amber-100 text-amber-700',
          )}
        >
          {STATUS_INFO[order.status]?.label}
        </p>
        <ChevronRight size={18} />
      </div>
    </Link>
  );
}
