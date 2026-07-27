'use client';

import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ExternalLink, LogOut, Menu as MenuIcon, Settings } from 'lucide-react';
import { rSlug } from '@/utils/r-slug';
import { cn } from '@/utils/cn';
import { TEXT } from '@/constants/text';

export function DropdownMenu({
  slug,
}: Readonly<{
  slug: string;
}>) {
  const itemLinkClass = cn(
    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-700 transition-colors data-[focus]:bg-neutral-100',
  );

  return (
    <Menu as="div" className="relative">
      <MenuButton className="focus-visible:ring-red-muted cursor-pointer rounded-full p-2 transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2">
        <MenuIcon size={24} />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        transition
        className="z-50 mt-2 w-56 origin-top-right rounded-xl border border-neutral-200 bg-white p-1 shadow-lg transition duration-150 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <div className="px-3 py-2 text-xs font-semibold tracking-wide text-neutral-400 uppercase">
          {TEXT.restaurant}
        </div>
        <MenuItem>
          <Link href={rSlug(slug)} target="_blank" className={itemLinkClass}>
            <ExternalLink size={18} className="text-neutral-500" />
            {TEXT.viewPublicMenu}
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/admin/settings" className={itemLinkClass}>
            <Settings size={18} className="text-neutral-500" />
            {TEXT.settings}
          </Link>
        </MenuItem>
        <div className="my-1 border-t border-neutral-200" />
        <div className="px-3 py-2 text-xs font-semibold tracking-wide text-neutral-400 uppercase">{TEXT.account}</div>
        <MenuItem>
          <button
            type="button"
            className={cn(itemLinkClass, 'text-red-muted w-full cursor-pointer data-[focus]:bg-red-50')}
          >
            <LogOut size={18} />
            {TEXT.logOut}
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
