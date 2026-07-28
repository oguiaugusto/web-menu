import { TEXT } from '@/constants/text';
import { cn } from '@/utils/cn';
import { SquarePen, Trash2 } from 'lucide-react';

// Temporary type
// Add "available" to MenuItem schema
export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  available: boolean;
};

export function MenuItemsTable({ items }: Readonly<{ items: MenuItem[] }>) {
  const actionButtonClass = cn(
    'focus-visible:ring-red-muted rounded-md p-2 text-neutral-500 transition-colors hover:bg-neutral-100 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none cursor-pointer',
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
                <button type="button" className={actionButtonClass}>
                  <SquarePen size={18} />
                </button>
                <button type="button" className={actionButtonClass}>
                  <Trash2 size={18} />
                </button>
              </td>
              <th scope="row" className="px-5 py-4 text-sm font-medium text-neutral-900">
                {item.name}
              </th>
              <td className="px-5 py-4 text-sm text-neutral-600">{item.category}</td>
              <td className="px-5 py-4 text-sm font-medium text-neutral-900">{item.price}</td>
              <td className="px-5 py-4">
                <div className="mt-[-6px] flex justify-center">
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" defaultChecked={item.available} />
                    <span className="peer-checked:bg-red-muted peer-focus-visible:ring-red-muted relative h-6 w-11 rounded-full bg-neutral-200 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-5" />
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
