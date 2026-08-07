import Link from 'next/link';
import Image from 'next/image';
import { TEXT } from '@/constants/text';
import { DropdownMenu } from './dropdown-menu';
import OpenClosedBadge from './open-closed-bagde';

type Props = Readonly<{
  restaurantName: string;
  restaurantSlug: string;
}>

export function Header({ restaurantName, restaurantSlug }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-235 items-center justify-between px-4">
        <Link href="/admin/orders" className="flex items-center gap-3">
          <Image
            src="/logo-red.png"
            alt="Web Menu"
            loading="eager"
            width={0}
            height={0}
            style={{ width: 42, height: 'auto' }}
            sizes="100%"
          />
          <div className="flex flex-col justify-start gap-[0.8px]">
            <p className="text-red-muted text-sm font-semibold">{restaurantName}</p>
            <OpenClosedBadge />
          </div>
        </Link>
        <nav className="text-red-muted flex items-center gap-2 sm:gap-4">
          {[
            { link: 'menu', label: TEXT.menu },
            { link: 'orders', label: TEXT.orders },
          ].map((x) => (
            <Link
              key={`link-${x.link}`}
              href={`/admin/${x.link}`}
              className="after:bg-red-muted relative py-1 text-sm font-medium transition-colors after:bottom-0 after:left-0 after:h-[.5px] after:w-full hover:after:absolute active:after:absolute"
            >
              {x.label}
            </Link>
          ))}
          <DropdownMenu slug={restaurantSlug} />
        </nav>
      </div>
    </header>
  );
}
