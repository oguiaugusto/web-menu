'use client';

import { Button } from '@/components/ui/button';
import { TEXT } from '@/constants/text';
import { rSlug } from '@/utils/r-slug';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { CircleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = Readonly<{
  isOpen: boolean;
  slug: string;
}>;

export function ClosedDialog({ isOpen, slug }: Props) {
  const router = useRouter();

  return (
    <Dialog open={isOpen} as="div" className="relative z-100 focus:outline-none" onClose={() => {}}>
      <div className="fixed inset-0 z-100 w-screen overflow-y-auto bg-neutral-800/50">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <div className="mt-1 flex flex-col items-center gap-1">
              <CircleAlert size={50} className="text-red-muted" />
              <DialogTitle className="text-xl font-semibold">{TEXT.restaurantClosed}</DialogTitle>
            </div>
            <div className="mt-2 flex flex-col items-center text-center text-sm text-neutral-500">
              {TEXT.orderCouldNotBePlaced}
            </div>
            <div className="mt-6 flex justify-center">
              <Button
                variant="primary-outline"
                className="flex-1 text-sm"
                onClick={() => router.replace(rSlug(slug, '/menu'))}
              >
                {TEXT.backToMenu}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
