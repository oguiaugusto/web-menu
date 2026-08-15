'use client';

import { SearchInput } from '@/components/ui/search-input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/providers/locale-provider';
import { rSlug } from '@/utils/r-slug';
import { RestaurantSearch } from '@/db/restaurant';

async function searchRestaurants(query: string, signal: AbortSignal): Promise<RestaurantSearch[]> {
  const response = await fetch(`/api/restaurants?query=${encodeURIComponent(query)}`, { signal });

  if (!response.ok) {
    throw new Error('Unable to search restaurants.');
  }

  return (await response.json()) as RestaurantSearch[];
}

export default function Home() {
  const router = useRouter();
  const { text: TEXT, errorMessages } = useLocale();
  const [restaurant, setRestaurant] = useState<RestaurantSearch | null>(null);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-8 lg:px-0">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Image
            src="/logo-stacked-red.png"
            alt="Web Menu Logo"
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
            <SearchInput<RestaurantSearch>
              label=""
              value={restaurant}
              onChange={setRestaurant}
              onSelect={(x) => router.push(rSlug(x.slug))}
              search={searchRestaurants}
              getKey={(item) => item.id}
              getLabel={(item) => item.name}
              placeholder={TEXT.searchRestaurants}
              text={TEXT}
              errorMessages={errorMessages}
              suffix={<Search size={18} />}
            />
          </div>
        </div>
        <div className="flex justify-center pt-16">
          <Link
            href="/admin"
            className="text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-600 hover:decoration-neutral-600"
          >
            {TEXT.management}
          </Link>
        </div>
      </div>
    </main>
  );
}
