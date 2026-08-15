import { OrderSummary } from '@/db/order';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { rSlug } from '@/utils/r-slug';
import { OrderStatusBadge } from '@/components/order-status-badge';
import { formatOrderDate } from '@/utils/format-order-date';
import type { TranslationDictionary } from '@/i18n';

type Props = {
  slug: string;
  order: OrderSummary;
  language: string;
  text: TranslationDictionary;
};

export function OrderCard({ slug, order, language, text }: Props) {
  return (
    <Link
      href={rSlug(slug, `/orders/${order.code}`)}
      className="hover:border-red-muted hover:shadow-red-muted/30 flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 transition hover:shadow-xs"
    >
      <div>
        <p className="font-mono font-semibold">{order.code}</p>
        <p className="mt-1 text-sm text-neutral-500">{formatOrderDate(order.createdAt, language)}</p>
      </div>
      <div className="flex items-center gap-1">
        <OrderStatusBadge status={order.status} hideDot text={text} />
        <ChevronRight size={18} />
      </div>
    </Link>
  );
}
