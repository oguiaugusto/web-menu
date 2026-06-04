'use client';

import { useState } from 'react';
import { categories } from '@/data/menu-items';
import { cn } from '@/utils/cn';

type Props = Readonly<{
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}>;

export function Categories({ selectedCategory, setSelectedCategory }: Props) {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={cn(
            'cursor-pointer rounded-2xl px-4 py-2 text-sm font-medium whitespace-nowrap transition',
            selectedCategory === category
              ? 'bg-red-muted text-white'
              : 'border border-neutral-300 bg-white hover:bg-neutral-100 active:bg-neutral-200/70',
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
