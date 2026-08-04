'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { TEXT } from '@/constants/text';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { ArrowDownUp, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SORT_BY_FIELDS = [
  { value: 'category', label: TEXT.category },
  { value: 'name', label: TEXT.name },
  { value: 'price', label: TEXT.price },
  { value: 'updatedAt', label: TEXT.lastUpdated },
];

const MIN_LENGTH = 2;

export function Toolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 300);

  const [sortBy, setSortBy] = useState('');

  const updateQuery = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    const sortBy = params.get('sortBy');
    const order = params.get('order') ?? 'asc';

    const next: Record<string, string> = { [name]: value };

    if (name === 'sortBy') {
      if (value !== sortBy) {
        if (['category', 'name'].includes(value)) next.order = 'asc';
        if (['price', 'updatedAt'].includes(value)) next.order = 'desc';
      }
    }

    if (name === 'order') {
      next.order = order === 'asc' ? 'desc' : 'asc';
    }

    Object.entries(next).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    router.replace(`${pathname}?${params}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const pQuery = params.get('query');
    const pSortBy = params.get('sortBy');

    setQuery(pQuery ?? '');
    setSortBy(SORT_BY_FIELDS.some((x) => x.value === pSortBy) ? pSortBy! : 'category');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (debouncedQuery !== query) return;

    updateQuery('query', trimmed.length >= MIN_LENGTH ? trimmed : '');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, query]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="grid flex-1 gap-3 sm:grid-cols-[minmax(0,1fr)_14rem]">
        <Input
          label=""
          placeholder={TEXT.searchMenuItems}
          suffix={{ value: <Search className="text-neutral-400" size={18} /> }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex gap-2">
          <div className="min-w-0 flex-1">
            <Select
              value={sortBy}
              onChange={(e) => {
                updateQuery('sortBy', e.target.value);
                setSortBy(e.target.value);
              }}
              options={SORT_BY_FIELDS}
            />
          </div>
          <Button
            type="button"
            variant="primary-outline"
            className="flex size-12 shrink-0 items-center justify-center p-0"
            title={TEXT.reverse}
            onClick={() => updateQuery('order', '')}
          >
            <ArrowDownUp size={18} />
          </Button>
        </div>
      </div>
      <Button
        as={Link}
        variant="primary"
        href="/admin/menu/new"
        className="flex items-center justify-center gap-2 whitespace-nowrap"
      >
        <Plus size={18} />
        {TEXT.newItem}
      </Button>
    </div>
  );
}
