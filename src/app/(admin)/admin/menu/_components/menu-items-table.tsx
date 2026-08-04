import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { TEXT } from '@/constants/text';
import { MenuItem } from '@/db/menu-item';
import { cn } from '@/utils/cn';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
import { DeleteDialog } from './delete-dialog';

export function MenuItemsTable({ items }: Readonly<{ items: MenuItem[] }>) {
  const actionButtonClass = cn(
    'cursor-pointer rounded-md p-2 text-neutral-500 transition-colors hover:bg-neutral-200/50',
  );

  return (
    <div className="relative overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-sm">
      <table className="w-full min-w-165 border-collapse text-left">
        <thead className="border-b border-neutral-200 bg-neutral-50 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          <tr>
            <th scope="col" className="w-20 px-5 py-3 text-center">
              {TEXT.actions}
            </th>
            <th scope="col" className="px-5 py-3">
              {TEXT.name}
            </th>
            <th scope="col" className="px-5 py-3">
              {TEXT.category}
            </th>
            <th scope="col" className="px-5 py-3">
              {TEXT.price}
            </th>
            <th scope="col" className="w-30 px-5 py-3 text-center">
              {TEXT.available}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {items.map((item) => (
            <tr key={item.id} className="transition-colors hover:bg-neutral-50">
              <td className="flex items-center justify-center gap-2 px-5 py-4">
                <Button variant="clean" as={Link} href={`/admin/menu/${item.id}/edit`} className={actionButtonClass}>
                  <SquarePen size={18} />
                </Button>
                <DeleteDialog itemId={item.id} buttonClass={actionButtonClass} />
              </td>
              <th scope="row" className="px-5 py-4 text-sm font-medium text-neutral-900">
                {item.name}
              </th>
              <td className="px-5 py-4 text-sm text-neutral-600">{item.category}</td>
              <td className="px-5 py-4 text-sm font-medium text-neutral-900">
                {TEXT.currency}
                {item.price.toFixed(2)}
              </td>
              <td className="px-5 py-4">
                <div className="mt-[-6px] flex justify-center">
                  <Switch checked={item.available} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
