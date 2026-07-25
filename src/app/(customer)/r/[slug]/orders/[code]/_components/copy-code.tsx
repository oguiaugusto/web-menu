'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  code: string;
};

export function CopyCode({ code }: Props) {
  const [isCopying, setIsCopying] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (isCopying) return;

    try {
      await navigator.clipboard.writeText(code);

      setIsCopying(true);

      timeoutRef.current = setTimeout(() => {
        setIsCopying(false);
      }, 1500);
    } catch {}
  };

  return (
    <button
      className="flex cursor-pointer items-center justify-between gap-2 rounded-lg bg-neutral-100 px-3 py-2 font-mono font-semibold"
      title={isCopying ? 'Copied!' : 'Copy code'}
      onClick={handleCopy}
      disabled={isCopying}
    >
      <span>{code}</span>
      {isCopying ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
