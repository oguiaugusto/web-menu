import { TEXT } from '@/constants/text';
import { EmptyState } from './_components/empty-state';
import { MenuItemsTable } from './_components/menu-items-table';
import { Toolbar } from './_components/toolbar';

export default function MenuPage() {
  const menuItems: any = [];

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
        <div className="mb-7">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">{TEXT.menuItems}</h1>
        </div>
        <Toolbar />
        <div className="mt-6">{menuItems.length ? <MenuItemsTable items={menuItems} /> : <EmptyState />}</div>
      </div>
    </main>
  );
}
