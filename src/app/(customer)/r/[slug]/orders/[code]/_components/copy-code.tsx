'use client';

import { useCopy } from '@/hooks/use-copy';
import { Check, Copy } from 'lucide-react';

type Props = {
  code: string;
};

export function CopyCode({ code }: Props) {
  const [handleCopy, isCopying] = useCopy();

  return (
    <button
      className="flex cursor-pointer items-center justify-between gap-2 rounded-lg bg-neutral-100 px-3 py-2 font-mono font-semibold"
      onClick={() => handleCopy(code)}
      disabled={isCopying}
    >
      <span>{code}</span>
      {isCopying ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
