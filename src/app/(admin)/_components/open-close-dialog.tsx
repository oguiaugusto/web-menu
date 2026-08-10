'use client';

import { updateRestaurantOpen } from '@/actions/restaurant';
import { Button } from '@/components/ui/button';
import { ERROR_MESSAGES, TEXT } from '@/constants/text';
import { toastError, toastSuccess } from '@/utils/toast';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { DoorClosed, DoorOpen } from 'lucide-react';
import { useState } from 'react';

type Props = Readonly<{
  mode: 'open' | 'close';
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenRestaurant: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export function OpenCloseDialog({ mode, isDialogOpen, setIsDialogOpen, setOpenRestaurant }: Props) {
  const [pending, setPending] = useState(false);

  const openMode = mode === 'open';

  const handleOpen = async () => {
    setPending(true);

    try {
      const result = await updateRestaurantOpen(openMode);

      if (!result.success) {
        if (result.error.form) toastError(ERROR_MESSAGES[result.error.form], { position: 'top-center' });
        return;
      }

      toastSuccess(openMode ? TEXT.restaurantOpen : TEXT.restaurantClosed, { position: 'bottom-center' });

      setOpenRestaurant(result.open);
      setIsDialogOpen(false);
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      as="div"
      className="relative z-100 focus:outline-none"
      onClose={() => {
        if (!pending) setIsDialogOpen(false);
      }}
    >
      <div className="fixed inset-0 z-100 w-screen overflow-y-auto bg-neutral-800/50">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <div className="mt-1 flex flex-col items-center gap-1">
              {openMode ? (
                <DoorOpen size={50} className="text-red-muted" />
              ) : (
                <DoorClosed size={50} className="text-red-muted" />
              )}
              <DialogTitle className="text-xl font-semibold">
                {openMode ? TEXT.openRestaurant : TEXT.closeRestaurant}?
              </DialogTitle>
            </div>
            <div className="mt-2 flex flex-col items-center text-sm text-neutral-500">
              {openMode ? TEXT.openRestaurantHelper : TEXT.closeRestaurantHelper}
            </div>
            <div className="mt-6 flex justify-center gap-2">
              <Button
                type="button"
                variant="primary-outline"
                className="flex-1 text-sm"
                onClick={() => setIsDialogOpen(false)}
                disabled={pending}
              >
                {TEXT.cancel}
              </Button>
              <Button type="button" variant="primary" className="flex-1 text-sm" onClick={handleOpen} disabled={pending}>
                {openMode ? TEXT.openRestaurant : TEXT.closeRestaurant}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
