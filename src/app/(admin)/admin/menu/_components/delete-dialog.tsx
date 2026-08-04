'use client';

import { deleteMenuItem } from '@/actions/menuItem';
import { Button } from '@/components/ui/button';
import { ERROR_MESSAGES, TEXT } from '@/constants/text';
import { toastError, toastSuccess } from '@/utils/toast';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Trash2, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = Readonly<{
  itemId: string;
  buttonClass: string;
}>;

export function DeleteDialog({ itemId, buttonClass }: Props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    setPending(true);

    try {
      const result = await deleteMenuItem(itemId);

      if (!result.success && result.error.form) {
        toastError(ERROR_MESSAGES[result.error.form], { position: 'top-center' });
        return;
      }

      toastSuccess(TEXT.menuItemDeleted, { position: 'bottom-center' });
      router.refresh();
    } finally {
      setPending(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button variant="clean" className={buttonClass} onClick={() => setIsOpen(true)}>
        <Trash2 size={18} />
      </Button>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-100 focus:outline-none"
        onClose={() => {
          if (!pending) setIsOpen(false);
        }}
      >
        <div className="fixed inset-0 z-100 w-screen overflow-y-auto bg-neutral-800/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <div className="mt-1 flex flex-col items-center gap-1">
                <TriangleAlert size={50} className="text-red-600" />
                <DialogTitle className="text-xl font-semibold">{TEXT.deleteItem}</DialogTitle>
              </div>
              <div className="mt-2 flex flex-col items-center text-sm text-neutral-500">
                <p>{TEXT.deleteItemAreYouSure}</p>
                <p>{TEXT.deleteItemCannotBeUndone}</p>
              </div>
              <div className="mt-6 flex justify-center gap-2">
                <Button
                  variant="primary-outline"
                  className="flex-1 text-sm"
                  onClick={() => setIsOpen(false)}
                  disabled={pending}
                >
                  {TEXT.cancel}
                </Button>
                <Button variant="primary" className="flex-1 text-sm" onClick={handleDelete} disabled={pending}>
                  {pending ? TEXT.deleting : TEXT.delete}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
