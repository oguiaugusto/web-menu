import { OrderCard } from './order-card';
import { Order } from '@/db/order';

type Props = Readonly<{
  title: string;
  orders: Order[];
  onOrderClick(order: Order): void;
  emptyText?: string;
}>;

export function OrdersSection({ title, orders, onOrderClick, emptyText }: Props) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-600">
          {orders.length}
        </span>
      </div>
      {orders.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onClick={() => onOrderClick(order)} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-neutral-200 bg-white px-4 py-8 text-center text-sm text-neutral-500">
          {emptyText}
        </p>
      )}
    </section>
  );
}
