'use client';

import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { TEXT } from '@/constants/text';
import { OrderDialog } from './_components/order-dialog';
import { MOCK_ORDERS } from './_components/mock-orders';
import { OrdersSection } from './_components/orders-section';
import { Order } from '@/db/order';

function isTerminalStatus(status: Order['status']) {
  return status === 'DELIVERED' || status === 'CANCELLED';
}

export default function OrdersPage() {
  const [query, setQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { activeOrders, completedOrders } = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    const matchingOrders = !searchTerm
      ? MOCK_ORDERS
      : MOCK_ORDERS.filter((order) =>
          [order.customerName, order.code].some((value) => value.toLowerCase().includes(searchTerm)),
        );

    return {
      activeOrders: matchingOrders.filter((order) => !isTerminalStatus(order.status)),
      completedOrders: matchingOrders.filter((order) => isTerminalStatus(order.status)),
    };
  }, [query]);

  const handleAdvance = (_order: Order) => {
    // Placeholder for a future status update.
  };

  const handleCancelOrder = (_order: Order) => {
    // Placeholder for a future cancellation update.
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
          <OrdersSection title={TEXT.activeOrders} orders={activeOrders} onOrderClick={setSelectedOrder} />
        </div>
        <div className="my-10 border-t border-neutral-200" />
        <OrdersSection title={TEXT.completedOrders} orders={completedOrders} onOrderClick={setSelectedOrder} />
      </div>

      <OrderDialog
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onAdvance={handleAdvance}
        onCancelOrder={handleCancelOrder}
      />
    </main>
  );
}
