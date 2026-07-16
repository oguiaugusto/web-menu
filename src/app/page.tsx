'use client';

import { SearchInput } from '@/components/ui/search-input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/constants/text';

type Restaurant = {
  id: string;
  name: string;
  slug: string;
};

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchRestaurants(query: string, _signal: AbortSignal): Promise<Restaurant[]> {
  await delay(500);

  return [
    { id: '1', name: 'Burgerplace', slug: 'burgerplace' },
    { id: '2', name: 'Snack Store', slug: 'snack-store' },
    { id: '3', name: 'Coffee Forever', slug: 'coffeeforever' },
    { id: '3', name: 'Music Place', slug: 'music' },
  ].filter((x) => x.name.toLowerCase().includes(query.toLowerCase()));
}

export default function Home() {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-8 lg:px-0">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Image
            src="/logo-stacked-red.png"
            alt="Web Menu"
            loading="eager"
            className="mb-8"
            sizes="100%"
            height={0}
            width={0}
            style={{
              width: 150,
              height: 'auto',
            }}
          />
          <div className="w-full max-w-xl text-center">
            <h1 className="text-3xl font-bold tracking-tight">{TEXT.homeTitle}</h1>
            <p className="mt-2 mb-8 text-sm text-neutral-500">{TEXT.homeSubtitle}</p>
            <SearchInput<Restaurant>
              label=""
              value={restaurant}
              onChange={setRestaurant}
              onSelect={(x) => router.push(`/r/${x.slug}`)}
              search={searchRestaurants}
              getKey={(item) => item.id}
              getLabel={(item) => item.name}
              placeholder="Search restaurants"
              suffix={<Search size={18} />}
            />
          </div>
        </div>
        <div className="flex justify-center pt-16">
          <Link
            href="/admin"
            className="text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-600 hover:decoration-neutral-600"
          >
            {TEXT.dashboard}
          </Link>
        </div>
      </div>
    </main>
  );
}
