import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { CartAmountBubble } from '../../../../../components/cart-amount-bubble';
import { TEXT } from '@/constants/text';
import Image from 'next/image';
import { rSlug } from '@/utils/r-slug';

export function Header({ slug }: Readonly<{ slug: string }>) {
  return (
    <header className="bg-red-muted sticky top-0 z-50 border-b border-red-700 text-white">
      <div className="mx-auto flex h-16 max-w-235 items-center justify-between px-4">
        <Link href={rSlug(slug)} className="flex items-center outline-white">
          <Image
            src="/logo-white.png"
            alt="Web Menu"
            loading="eager"
            width={0}
            height={0}
            style={{ width: 42, height: 'auto' }}
            className="block sm:hidden"
            sizes="100%"
          />
          <Image
            src="/logo-wide-white.png"
            alt="Web Menu"
            loading="eager"
            width={0}
            height={0}
            style={{ width: 180, height: 'auto' }}
            className="hidden sm:block"
            sizes="100%"
          />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          {[
            { link: 'menu', label: TEXT.menu },
            { link: 'orders', label: TEXT.orders },
          ].map((x) => (
            <Link
              key={`link-${x.link}`}
              href={rSlug(slug, x.link)}
              className="relative py-1 text-sm font-medium outline-white transition-colors after:bottom-0 after:left-0 after:h-[.5px] after:w-full after:bg-white hover:after:absolute active:after:absolute"
            >
              {x.label}
            </Link>
          ))}
          <Link
            href={rSlug(slug, '/cart')}
            aria-label="Cart"
            className="relative mb-[1px] cursor-pointer rounded-full p-2 outline-white transition-opacity hover:drop-shadow-[0px_1px_1px_rgba(255,255,255,0.4)]"
          >
            <CartAmountBubble />
            <ShoppingCart size={26} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
