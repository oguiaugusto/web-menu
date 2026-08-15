import type { TranslationDictionary } from '@/i18n';
import { cn } from '@/utils/cn';
import { rSlug } from '@/utils/r-slug';
import Link from 'next/link';

type Props = Readonly<{
  slug: string;
  categories: string[];
  selected?: string;
  text: TranslationDictionary;
}>;

export async function Categories({ slug, categories, selected, text: TEXT }: Props) {
  const renderLink = (category: string, noCategory?: boolean) => (
    <Link
      key={category}
      href={rSlug(slug, noCategory ? '/menu' : `/menu?category=${category}`)}
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
    <div className="mb-6 flex gap-2 overflow-x-auto py-2">
      {renderLink(TEXT.all, true)}
      {categories.map((category) => renderLink(category))}
    </div>
  );
}
