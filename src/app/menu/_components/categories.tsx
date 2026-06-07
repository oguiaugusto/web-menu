import { TEXT } from '@/constants/text';
import { cn } from '@/utils/cn';
import Link from 'next/link';

type Props = Readonly<{
  categories: string[];
  selected?: string;
}>;

export function Categories({ categories, selected }: Props) {
  const renderLink = (category: string, noCategory?: boolean) => (
    <Link
      key={category}
      href={noCategory ? '/menu' : `/menu?category=${category}`}
      className={cn(
        'cursor-pointer rounded-2xl px-4 py-2 text-sm font-medium whitespace-nowrap transition',
        selected === category || (!selected && category === TEXT.all)
          ? 'bg-red-muted text-white'
          : 'border border-neutral-300 bg-white hover:bg-neutral-100 active:bg-neutral-200/70',
      )}
    >
      {category}
    </Link>
  );

  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
      {renderLink(TEXT.all, true)}
      {categories.map((category) => renderLink(category))}
    </div>
  );
}
