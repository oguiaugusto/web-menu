'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ArrowRight, MapPin, Phone, UserRound, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TEXT } from '@/constants/text';
import { NEXT_STATUS } from '@/constants/status';
import { AdvanceStatusButton } from './advance-status-button';
import { CancelOrderDialog } from './cancel-order-dialog';
import { formatOrderDate } from '@/utils/format-order-date';
import { formatOrderItem } from '../_helpers/format-order-item';
import { OrderStatusBadge } from '../../../../../components/order-status-badge';
import { Order } from '@/db/order';
import { formatCurrency } from '@/utils/money';

type Props = Readonly<{
  order: Order | null;
  onClose(): void;
  onAdvance(order: Order, restart: VoidFunction): void;
  onCancelOrder(order: Order): void;
  pending: boolean;
  currency: string;
  language: string;
}>;

export function OrderDialog({ order, onClose, onAdvance, onCancelOrder, pending, currency, language }: Props) {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  useEffect(() => {
    if (!order) setIsCancelDialogOpen(false);
  }, [order]);

  if (!order) return null;

  const nextStatus = NEXT_STATUS[order.status as keyof typeof NEXT_STATUS];

  return (
    <>
      <Dialog open as="div" className="relative z-100 focus:outline-none" onClose={pending ? () => {} : onClose}>
        <div className="fixed inset-0 z-100 w-screen overflow-y-auto bg-neutral-800/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-lg rounded-xl border border-neutral-200 bg-white px-5 pt-4 pb-5 shadow-sm duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 sm:px-6 sm:pt-5 sm:pb-6"
            >
              <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-5">
                <div>
                  <OrderStatusBadge status={order.status} />
                  <DialogTitle className="mt-3 font-mono text-xl font-semibold">{order.code}</DialogTitle>
                  <p className="mt-1 text-sm text-neutral-500">{formatOrderDate(order.createdAt, language)}</p>
                </div>
                <Button
                  type="button"
                  variant="clean"
                  className="cursor-pointer rounded-md p-2 text-neutral-500 transition-colors hover:bg-neutral-100"
                  onClick={onClose}
                  aria-label={TEXT.close}
                  disabled={pending}
                >
                  <X size={20} />
                </Button>
              </div>
              <div className="divide-y divide-neutral-100">
                <section className="py-3">
                  <h2 className="text-sm font-semibold">{TEXT.customer}</h2>
                  <div className="mt-1 space-y-1 text-neutral-600">
                    <div className="flex items-center gap-1">
                      <UserRound size={14} />
                      <p className="text-sm">{order.customerName}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone size={14} />
                      <a
                        className="text-sm underline transition-colors hover:text-neutral-700"
                        href={`tel:${order.customerPhone}`}
                      >
                        {order.customerPhone}
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.deliveryAddress)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm underline transition-colors hover:text-neutral-700"
                      >
                        {order.deliveryAddress}
                      </a>
                    </div>
                  </div>
                </section>
                <section className="py-3">
                  <h2 className="text-sm font-semibold">{TEXT.payment}</h2>
                  <p className="mt-1 flex items-center text-sm text-neutral-600">
                    {order.payment}
                    {order.changeFor ? (
                      <>
                        <span className="mx-1">•</span>
                        {formatCurrency(order.changeFor, currency)}
                        <ArrowRight size={12} className="mx-1 text-neutral-600" />
                        <span className="font-medium text-neutral-900">
                          {formatCurrency(order.changeFor - order.total, currency)} {TEXT.change.toLowerCase()}
                        </span>
                      </>
                    ) : null}
                  </p>
                </section>
                <section className="py-3">
                  <h2 className="text-sm font-semibold">{TEXT.orderItems}</h2>
                  <ul className="mt-1 space-y-1">
                    {order.items.map((item) => (
                      <li key={item.id} className="text-sm">
                        <p className="text-neutral-600">{formatOrderItem(item, true)}</p>
                      </li>
                    ))}
                  </ul>
                </section>
                {order.notes ? (
                  <section className="py-3">
                    <h2 className="text-sm font-semibold">{TEXT.notes}</h2>
                    <p className="text-sm leading-6 text-neutral-600">{order.notes}</p>
                  </section>
                ) : null}
                <section className="space-y-1 py-3 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>{TEXT.subtotal}</span>
                    <span>
                      {formatCurrency(
                        order.items.reduce<number>((acc, curr) => acc + curr.price * curr.quantity, 0),
                        currency,
                      )}
                    </span>
                  </div>
                  {order.deliveryFee ? (
                    <div className="flex justify-between text-neutral-600">
                      <span>{TEXT.delivery}</span>
                      <span>{formatCurrency(order.deliveryFee, currency)}</span>
                    </div>
                  ) : null}
                  <div className="flex justify-between border-t border-neutral-100 pt-3 font-semibold">
                    <span>{TEXT.total}</span>
                    <span>{formatCurrency(order.total, currency)}</span>
                  </div>
                </section>
              </div>
              {nextStatus ? (
                <div className="space-y-3 border-t border-neutral-100 pt-5">
                  <AdvanceStatusButton
                    nextStatus={nextStatus}
                    onComplete={(reset) => onAdvance(order, reset)}
                    pending={pending}
                  />
                  <Button
                    type="button"
                    variant="primary-text"
                    className="mx-auto text-sm"
                    onClick={() => setIsCancelDialogOpen(true)}
                    disabled={pending}
                  >
                    {TEXT.cancelOrder}
                  </Button>
                </div>
              ) : null}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <CancelOrderDialog
        open={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={() => onCancelOrder(order)}
        pending={pending}
      />
    </>
  );
}
