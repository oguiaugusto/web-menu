'use client';

import { UnavailableItem } from '@/actions/orders';
import { Button } from '@/components/ui/button';
import { useRestaurant } from '@/providers/restaurant-provider';
import { useCart } from '@/providers/cart-provider';
import { rSlug } from '@/utils/r-slug';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { CircleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

type Props = Readonly<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  slug: string;
  items: UnavailableItem[];
}>;

export function UnavailableDialog({ isOpen, setIsOpen, slug, items }: Props) {
  const router = useRouter();
  const { text: TEXT } = useRestaurant();
  const { removeItem } = useCart();

  return (
    <Dialog open={isOpen} as="div" className="relative z-100 focus:outline-none" onClose={setIsOpen}>
      <div className="fixed inset-0 z-100 w-screen overflow-y-auto bg-neutral-800/50">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <div className="mt-1 flex flex-col items-center gap-1">
              <CircleAlert size={50} className="text-red-muted" />
              <DialogTitle className="text-xl font-semibold">{TEXT.someItemsNoLongerAvailable}</DialogTitle>
            </div>
            <div className="mt-2 flex flex-col items-center text-center text-sm text-neutral-500">
              <p>{TEXT.followingItemsNotAvailable}</p>
              <ul className="my-2">
                {items.map((x) => (
                  <li key={x.menuItemId}>{`${x.quantity}x ${x.name}`}</li>
                ))}
              </ul>
              <p>{TEXT.removeFromCart}</p>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              <Button
                variant="primary-outline"
                className="flex-1 text-sm"
                onClick={() => router.replace(rSlug(slug, '/menu'))}
              >
                {TEXT.backToMenu}
              </Button>
              <Button
                variant="primary"
                className="flex-1 text-sm"
                onClick={() => {
                  removeItem(items.map((x) => x.menuItemId));
                  setIsOpen(false);
                }}
              >
                {TEXT.removeUnavailableItems}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
