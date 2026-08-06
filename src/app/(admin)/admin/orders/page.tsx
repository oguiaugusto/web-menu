'use client';

import { Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { ERROR_MESSAGES, TEXT } from '@/constants/text';
import { OrderDialog } from './_components/order-dialog';
import { OrdersSection } from './_components/orders-section';
import { Order } from '@/db/order';
import { updateOrderStatus } from '@/actions/orders';
import { OrderStatus } from '@/generated/prisma/enums';
import { toastError, toastSuccess } from '@/utils/toast';

function filterOrders(orders: Order[], query: string): Order[] {
  const searchTerm = query.trim().toLowerCase();
  if (!searchTerm) return orders;

  return orders.filter((order) =>
    [order.customerName, order.code].some((value) => value.toLowerCase().includes(searchTerm)),
  );
}

export default function OrdersPage() {
  const [query, setQuery] = useState('');

  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [pending, setPending] = useState(false);

  const fetchActive = async () => {
    const response = await fetch('/api/admin/orders/active');
    if (!response.ok) return;

    const data = (await response.json()) as Order[];
    setActiveOrders(data);
  };

  const fetchCompleted = async () => {
    const response = await fetch('/api/admin/orders/completed');
    if (!response.ok) return;

    const data = (await response.json()) as Order[];
    setCompletedOrders(data);
  };

  const refreshOrders = useCallback(() => Promise.all([fetchActive(), fetchCompleted()]), []);

  useEffect(() => {
    refreshOrders();

    const interval = setInterval(fetchActive, 15000);
    return () => clearInterval(interval);
  }, [refreshOrders]);

  const filteredActiveOrders = filterOrders(activeOrders, query);
  const filteredCompletedOrders = filterOrders(completedOrders, query);

  const handleAdvance = (_order: Order) => {
    // Placeholder for a future status update.
  };

  const handleCancelOrder = async (order: Order) => {
    setPending(true);

    try {
      const result = await updateOrderStatus(order.id, OrderStatus.CANCELLED);

      if (!result.success && result.error.form) {
        toastError(ERROR_MESSAGES[result.error.form], { position: 'top-center' });
        return;
      }

      toastSuccess(TEXT.orderCancelled, { position: 'bottom-center' });

      await refreshOrders();
      setSelectedOrder(null);
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
        <div className="mb-7">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{TEXT.ordersPageTitle}</h1>
        </div>
        <div className="max-w-xl">
          <Input
            label=""
            placeholder={TEXT.searchOrdersPlaceholder}
            suffix={{ value: <Search className="text-neutral-400" size={18} /> }}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            additionalInputProps={{ 'aria-label': TEXT.searchOrdersPlaceholder }}
          />
        </div>
        <div className="mt-8">
          <OrdersSection title={TEXT.activeOrders} orders={filteredActiveOrders} onOrderClick={setSelectedOrder} />
        </div>
        <div className="my-10 border-t border-neutral-200" />
        <OrdersSection title={TEXT.completedOrders} orders={filteredCompletedOrders} onOrderClick={setSelectedOrder} />
      </div>
      <OrderDialog
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onAdvance={handleAdvance}
        onCancelOrder={handleCancelOrder}
        pending={pending}
      />
    </main>
  );
}
