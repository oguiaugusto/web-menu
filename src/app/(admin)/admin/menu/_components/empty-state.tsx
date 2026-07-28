import { Button } from '@/components/ui/button';
import { TEXT } from '@/constants/text';
import { Package } from 'lucide-react';

export function EmptyState() {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="bg-red-muted/10 text-red-muted mx-auto flex size-12 items-center justify-center rounded-full">
        <Package size={24} />
      </div>
      <h2 className="mt-5 text-lg font-semibold">{TEXT.noMenuItems}</h2>
      <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-neutral-500">{TEXT.noMenuItemsSubtitle}</p>
      <Button variant="primary" className="mt-6">
        {TEXT.createMenuItem}
      </Button>
    </section>
  );
}
