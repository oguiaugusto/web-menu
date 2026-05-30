import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-red-muted sticky top-0 z-50 border-b border-red-700 text-white">
      <div className="mx-auto flex h-16 max-w-235 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <img src="/logo-white.png" alt="Web Menu" width={42} height={42} className="block sm:hidden" />
          <img src="/logo-wide-white.png" alt="Web Menu" width={180} height={40} className="hidden sm:block" />
        </Link>
        <button aria-label="Cart" className="cursor-pointer rounded-full p-2 transition-opacity hover:opacity-80">
          <ShoppingCart size={28} />
        </button>
      </div>
    </header>
  );
}
