'use client';

import { Button } from '@/components/ui/button';
import { TEXT } from '@/constants/text';
import { useAdmin } from '@/providers/admin-provider';
import { useState } from 'react';
import { OpenCloseDialog } from '../../../_components/open-close-dialog';

export function StatusSection() {
  const { isOpen, setIsOpen } = useAdmin();

  const [openDialogOpen, setOpenDialogOpen] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);

  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-center text-lg font-semibold sm:text-left">{TEXT.restaurantStatus}</h2>
          <p className="mt-1 text-center text-sm text-neutral-500 sm:text-left">{TEXT.restaurantStatusDescription}</p>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <div className="flex flex-1 border-spacing-x-1 items-center justify-center gap-4 border-neutral-200 sm:flex-none sm:justify-start sm:ps-4 md:gap-8 md:border-l md:ps-8">
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs font-medium text-neutral-500">{TEXT.currentStatus}</span>
              <span
                className={
                  isOpen
                    ? 'text-sm font-semibold text-green-600 uppercase'
                    : 'text-sm font-semibold text-red-600 uppercase'
                }
              >
                {isOpen ? TEXT.open : TEXT.closed}
              </span>
            </div>
            <Button
              type="button"
              variant="primary-outline"
              className="px-4 py-2 text-sm"
              onClick={() => (isOpen ? setCloseDialogOpen(true) : setOpenDialogOpen(true))}
            >
              {isOpen ? TEXT.closeRestaurant : TEXT.openRestaurant}
            </Button>
          </div>
        </div>
      </div>
      <OpenCloseDialog
        mode="open"
        isDialogOpen={openDialogOpen}
        setIsDialogOpen={setOpenDialogOpen}
        setOpenRestaurant={setIsOpen}
      />
      <OpenCloseDialog
        mode="close"
        isDialogOpen={closeDialogOpen}
        setIsDialogOpen={setCloseDialogOpen}
        setOpenRestaurant={setIsOpen}
      />
    </section>
  );
}
