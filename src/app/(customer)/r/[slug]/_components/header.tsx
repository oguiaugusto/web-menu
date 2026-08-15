import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { CartAmountBubble } from '../../../_components/cart-amount-bubble';
import type { TranslationDictionary } from '@/i18n';
import Image from 'next/image';
import { rSlug } from '@/utils/r-slug';

export function Header({ slug, text: TEXT }: Readonly<{ slug: string; text: TranslationDictionary }>) {
  return (
    <header className="bg-red-muted sticky top-0 z-50 border-b border-red-700 text-white">
      <div className="mx-auto flex h-16 max-w-235 items-center justify-center px-4 sm:justify-between">
        <Link href={rSlug(slug)} className="flex items-center outline-white">
          <Image
            src="/logo-wide-white.png"
            alt="Web Menu"
            loading="eager"
            width={0}
            height={0}
            style={{ width: 180, height: 'auto' }}
            sizes="100%"
          />
        </Link>
        <nav className="hidden items-center gap-4 sm:flex">
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
            aria-label={TEXT.cart}
            className="relative mb-[1px] cursor-pointer rounded-full p-2 outline-white transition-opacity hover:bg-neutral-200/10"
          >
            <CartAmountBubble />
            <ShoppingCart size={26} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
