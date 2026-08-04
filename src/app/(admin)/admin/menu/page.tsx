import { TEXT } from '@/constants/text';
import { EmptyTable } from './_components/empty-table';
import { MenuItemsTable } from './_components/menu-items-table';
import { Toolbar } from './_components/toolbar';
import { getMenuItemsList } from '@/db/menu-item';

type Props = Readonly<{
  searchParams: Promise<{
    query?: string;
    sortBy?: string;
    order?: string;
  }>;
}>;

export default async function MenuPage({ searchParams }: Props) {
  const params = await searchParams;

  const items = await getMenuItemsList({
    query: params.query,
    sortBy: params.sortBy,
    order: params.order,
  });

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
        <div className="mb-7">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">{TEXT.menuItems}</h1>
        </div>
        <Toolbar />
        <div className="mt-6">{!items.length && !params.query ? <EmptyTable /> : <MenuItemsTable items={items} />}</div>
      </div>
    </main>
  );
}
