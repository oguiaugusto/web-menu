'use client';

import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Check, Copy, DoorClosed, DoorOpen, ExternalLink, LogOut, Menu as MenuIcon, Settings } from 'lucide-react';
import { rSlug } from '@/utils/r-slug';
import { cn } from '@/utils/cn';
import { TEXT } from '@/constants/text';
import { logout } from '@/actions/auth/logout';
import { useCopy } from '@/hooks/use-copy';
import { useEffect, useState } from 'react';
import { OpenCloseDialog } from './open-close-dialog';
import { useAdmin } from '@/providers/admin-provider';

export function DropdownMenu({ slug }: Readonly<{ slug: string }>) {
  const { isOpen, setIsOpen } = useAdmin();

  const [openDialogOpen, setOpenDialogOpen] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);

  const [handleCopy, isCopying] = useCopy();

  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(window.location.host + '/r/');
  }, []);

  const itemClass = cn(
    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-700 transition-colors data-[focus]:bg-neutral-100',
  );

  return (
    <>
      <OpenCloseDialog
        mode="open"
        isDialogOpen={openDialogOpen}
        setIsDialogOpen={setOpenDialogOpen}
        setOpenRestaurant={setIsOpen}
      />
      <OpenCloseDialog
        mode="close"
        isDialogOpen={closeDialogOpen}
        setIsDialogOpen={setCloseDialogOpen}
        setOpenRestaurant={setIsOpen}
      />
      <Menu as="div" className="relative">
        <MenuButton className="cursor-pointer rounded-full p-2 transition-colors hover:bg-neutral-100">
          <MenuIcon size={24} />
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          transition
          className="z-50 mt-2 w-56 origin-top-right rounded-xl border border-neutral-200 bg-white p-1 shadow-lg transition duration-150 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="relative px-3 py-2 text-xs font-semibold tracking-wide text-neutral-400 uppercase">
            {TEXT.restaurant}
          </div>
          <MenuItem>
            {() => (
              <button
                type="button"
                className={cn(itemClass, 'w-full cursor-pointer')}
                onClick={(e) => {
                  e.preventDefault();
                  if (isOpen) setCloseDialogOpen(true);
                  else setOpenDialogOpen(true);
                }}
              >
                {isOpen ? (
                  <DoorClosed size={18} className="text-neutral-500" />
                ) : (
                  <DoorOpen size={18} className="text-neutral-500" />
                )}
                {isOpen ? TEXT.closeRestaurant : TEXT.openRestaurant}
              </button>
            )}
          </MenuItem>
          <div className="mx-auto my-1 w-9/10 border-t border-neutral-200" />
          <MenuItem>
            <Link href="/admin/settings" className={itemClass}>
              <Settings size={18} className="text-neutral-500" />
              {TEXT.settings}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href={rSlug(slug)} target="_blank" className={itemClass}>
              <ExternalLink size={18} className="text-neutral-500" />
              {TEXT.viewPublicMenu}
            </Link>
          </MenuItem>
          <div className="mx-auto my-1 w-9/10 border-t border-neutral-200" />
          <MenuItem>
            {() => (
              <button
                type="button"
                className={cn(itemClass, 'w-full cursor-pointer')}
                disabled={isCopying}
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy(url + slug);
                }}
              >
                {isCopying ? (
                  <Check size={18} className="text-neutral-500" />
                ) : (
                  <Copy size={18} className="text-neutral-500" />
                )}
                {isCopying ? TEXT.linkCopied : TEXT.copyPublicLink}
              </button>
            )}
          </MenuItem>
          <div className="mx-auto my-1 w-9/10 border-t border-neutral-200" />
          <div className="px-3 py-2 text-xs font-semibold tracking-wide text-neutral-400 uppercase">{TEXT.account}</div>
          <form action={logout}>
            <MenuItem>
              <button
                type="submit"
                className={cn(itemClass, 'text-red-muted w-full cursor-pointer data-[focus]:bg-red-50')}
              >
                <LogOut size={18} />
                {TEXT.logOut}
              </button>
            </MenuItem>
          </form>
        </MenuItems>
      </Menu>
    </>
  );
}
