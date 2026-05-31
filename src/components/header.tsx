import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { CartAmountBubble } from './cart-amount-bubble';

export function Header() {
  return (
    <header className="bg-red-muted sticky top-0 z-50 border-b border-red-700 text-white">
      <div className="mx-auto flex h-16 max-w-235 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <img src="/logo-white.png" alt="Web Menu" width={42} height={42} className="block sm:hidden" />
          <img src="/logo-wide-white.png" alt="Web Menu" width={180} height={40} className="hidden sm:block" />
        </Link>
        <Link
          href="/cart"
          aria-label="Cart"
          className="relative cursor-pointer rounded-full p-2 transition-opacity hover:drop-shadow-[0px_1px_1px_rgba(255,255,255,0.6)]"
        >
          <CartAmountBubble />
          <ShoppingCart size={28} />
        </Link>
      </div>
    </header>
  );
}
