import Link from 'next/link';
import Image from 'next/image';
import { TEXT } from '@/constants/text';
import { Restaurant } from '@/db/restaurant';
import { DropdownMenu } from './dropdown-menu';

export function Header({ restaurant }: Readonly<{ restaurant: Restaurant }>) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-235 items-center justify-between px-4">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/logo-red.png"
            alt="Web Menu"
            loading="eager"
            width={0}
            height={0}
            style={{ width: 42, height: 'auto' }}
            sizes="100%"
          />
          <div className="hidden leading-tight sm:block">
            <p className="text-red-muted text-sm font-semibold">{restaurant.name}</p>
            <p className="text-xs text-neutral-500">{TEXT.management}</p>
          </div>
        </Link>
        <nav className="text-red-muted flex items-center gap-2 sm:gap-4">
          {[
            { link: 'dashboard', label: TEXT.dashboard },
            { link: 'menu', label: TEXT.menu },
            { link: 'orders', label: TEXT.orders },
          ].map((x) => (
            <Link
              key={`link-${x.link}`}
              href={`/admin/${x.link}`}
              className="after:bg-red-muted relative py-1 text-sm font-medium transition-colors after:bottom-0 after:left-0 after:h-[.5px] after:w-full hover:after:absolute focus-visible:outline-0 active:after:absolute"
            >
              {x.label}
            </Link>
          ))}
          <DropdownMenu slug={restaurant.slug} />
        </nav>
      </div>
    </header>
  );
}
