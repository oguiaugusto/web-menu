'use client';

import { menuItems } from '@/data/menu-items';
import { MenuCard } from './_components/menu-card';
import { TEXT } from '@/constants/text';
import { Categories } from './_components/categories';
import { useState } from 'react';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems =
    selectedCategory === 'All' ? menuItems : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-235 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{TEXT.menuTitle}</h1>
          <p className="mt-1 text-sm text-neutral-500">{TEXT.menuSubtitle}</p>
        </div>
        <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((x) => (
            <MenuCard key={`menu-item-${x.id}`} item={x} />
          ))}
        </div>
      </div>
    </main>
  );
}
