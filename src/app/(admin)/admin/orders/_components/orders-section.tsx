import { OrderCard } from './order-card';
import { Order } from '@/db/order';
import { OrderCardSkeleton } from './order-card-skeleton';

type Props = Readonly<{
  title: string;
  orders: Order[] | null;
  onOrderClick(order: Order): void;
  emptyText?: string;
}>;

export function OrdersSection({ title, orders, onOrderClick, emptyText }: Props) {
  const renderOrders = () => {
    if (orders === null) {
      return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <OrderCardSkeleton key={`order-skeleton-${i}`} />
          ))}
        </div>
      );
    }

    if (orders.length === 0) {
      return (
        <p className="rounded-xl border border-dashed border-neutral-200 bg-white px-4 py-8 text-center text-sm text-neutral-500">
          {emptyText}
        </p>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onClick={() => onOrderClick(order)} />
        ))}
      </div>
    );
  };

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-600">
          {orders?.length ?? 0}
        </span>
      </div>
      {renderOrders()}
    </section>
  );
}
