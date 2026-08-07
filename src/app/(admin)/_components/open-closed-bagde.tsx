'use client';

import { TEXT } from '@/constants/text';
import { useAdmin } from '@/providers/admin-provider';
import { cn } from '@/utils/cn';

export default function OpenClosedBadge() {
  const { isOpen } = useAdmin();

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-semibold tracking-tight uppercase',
        isOpen ? 'text-green-600' : 'text-red-600',
      )}
    >
      <span className={cn('size-1.5 rounded-full', isOpen ? 'bg-green-600' : 'bg-red-600')} />
      <span className='mb-[-1.2px]'>{isOpen ? TEXT.open : TEXT.closed}</span>
    </span>
  );
}
