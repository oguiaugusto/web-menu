'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/providers/admin-provider';

type Props = Readonly<{
  open: boolean;
  onClose(): void;
  onConfirm(): void;
  pending: boolean;
}>;

export function CancelOrderDialog({ open, onClose, onConfirm, pending }: Props) {
  const { text: TEXT } = useAdmin();
  return (
    <Dialog open={open} as="div" className="relative z-[110] focus:outline-none" onClose={onClose}>
      <div className="fixed inset-0 z-[110] w-screen overflow-y-auto bg-neutral-800/50">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <div className="mt-1 flex flex-col items-center gap-1">
              <TriangleAlert size={50} className="text-red-600" />
              <DialogTitle className="text-xl font-semibold">{TEXT.cancelOrder}</DialogTitle>
            </div>
            <div className="mt-2 flex flex-col items-center text-sm text-neutral-500">
              <p>{TEXT.cancelOrderAreYouSure}</p>
              <p>{TEXT.thisActionCannotBeUndone}</p>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              <Button variant="primary-outline" className="flex-1 text-sm" onClick={onClose}>
                {TEXT.keepOrder}
              </Button>
              <Button
                variant="primary"
                className="flex-1 text-sm"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                disabled={pending}
              >
                {TEXT.cancelOrder}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
