'use client';

import Link from 'next/link';
import { ReceiptText, ShoppingCart, UtensilsCrossed } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { CartAmountBubble } from '@/app/(customer)/_components/cart-amount-bubble';
import { useRestaurant } from '@/providers/restaurant-provider';
import { rSlug } from '@/utils/r-slug';
import { cn } from '@/utils/cn';

type Props = Readonly<{
  slug: string;
}>;

function isPathActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function CustomerBottomNav({ slug }: Props) {
  const pathname = usePathname();
  const { text: TEXT } = useRestaurant();

  const ordersHref = rSlug(slug, 'orders');
  const menuHref = rSlug(slug, 'menu');
  const cartHref = rSlug(slug, 'cart');
  const checkoutHref = rSlug(slug, 'checkout');

  const items = [
    { href: ordersHref, label: TEXT.orders, icon: ReceiptText, active: isPathActive(pathname, ordersHref) },
    { href: menuHref, label: TEXT.menu, icon: UtensilsCrossed, active: isPathActive(pathname, menuHref) },
    {
      href: cartHref,
      label: TEXT.cart,
      icon: ShoppingCart,
      active: isPathActive(pathname, cartHref) || isPathActive(pathname, checkoutHref),
      showCartAmount: true,
    },
  ];

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-neutral-200 bg-white pb-[env(safe-area-inset-bottom)] sm:hidden">
      <div className="mx-auto flex h-16 max-w-235">
        {items.map(({ href, label, icon: Icon, active, showCartAmount }) => (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex min-h-16 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors focus-visible:z-10',
              active
                ? 'text-red-muted'
                : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 active:bg-neutral-100',
            )}
          >
            <span className="relative">
              <Icon aria-hidden="true" size={21} strokeWidth={active ? 2.4 : 2} />
              {showCartAmount ? <CartAmountBubble variant="bottom-nav" /> : null}
            </span>
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
