import { CalendarClock, ChevronRight } from 'lucide-react';
import { formatOrderDate, formatOrderItem } from '../_helpers/format-order';
import { OrderStatusBadge } from '../../../../../components/order-status-badge';
import { Order } from '@/db/order';

type Props = Readonly<{
  order: Order;
  onClick(): void;
}>;

const PREVIEW_ITEM_COUNT = 2;

export function OrderCard({ order, onClick }: Props) {
  const previewItems = order.items
    .slice(0, PREVIEW_ITEM_COUNT)
    .map((x) => formatOrderItem(x))
    .join(' · ');
  const remainingItems = order.items.length - PREVIEW_ITEM_COUNT;

  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:border-red-muted hover:shadow-red-muted/30 group w-full cursor-pointer rounded-xl border border-neutral-200 bg-white p-4 text-left transition hover:shadow-xs"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-sm font-semibold">{order.code}</p>
          <p className="mt-1 truncate text-sm text-neutral-500">{order.customerName}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="mt-4 border-t border-neutral-100 pt-3">
        <p className="line-clamp-1 text-sm text-neutral-700">
          {previewItems}
          {remainingItems > 0 ? <span className="text-neutral-500"> {`+${remainingItems}`}</span> : null}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2 text-xs text-neutral-500">
          <span className="flex items-center gap-1.5">
            <CalendarClock size={14} />
            {formatOrderDate(order.createdAt)}
          </span>
          <ChevronRight className="text-neutral-400 transition-transform group-hover:translate-x-0.5" size={18} />
        </div>
      </div>
    </button>
  );
}
