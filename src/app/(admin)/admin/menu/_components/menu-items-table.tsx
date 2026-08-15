import { Button } from '@/components/ui/button';
import { TEXT } from '@/constants/text';
import { MenuItem } from '@/db/menu-item';
import { cn } from '@/utils/cn';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
import { DeleteDialog } from './delete-dialog';
import { AvailableSwitch } from './available-switch';
import { formatCurrency } from '@/utils/money';

type Props = Readonly<{ items: MenuItem[]; currency: string }>;

export function MenuItemsTable({ items, currency }: Props) {
  const actionButtonClass = cn(
    'cursor-pointer rounded-md p-2 text-neutral-500 transition-colors hover:bg-neutral-200/50',
  );

  const renderEmpty = () => (
    <tr>
      <td colSpan={5} className="px-5 py-4 text-center text-sm font-medium text-neutral-600">
        {TEXT.noItemsFound}
      </td>
    </tr>
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
              <td className="px-5 py-4 text-start text-sm font-medium text-neutral-900">
                {formatCurrency(item.price, currency)}
              </td>
              <td className="px-5 py-4">
                <div className="mt-[-6px] flex justify-center">
                  <AvailableSwitch itemId={item.id} available={item.available} />
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 ? renderEmpty() : null}
        </tbody>
      </table>
    </div>
  );
}
