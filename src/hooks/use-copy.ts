import { useEffect, useRef, useState } from 'react';

export function useCopy() {
  const [isCopying, setIsCopying] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async (value: string) => {
    if (isCopying) return;

    try {
      await navigator.clipboard.writeText(value);

      setIsCopying(true);

      timeoutRef.current = setTimeout(() => {
        setIsCopying(false);
      }, 1500);
    } catch {}
  };

  return [handleCopy, isCopying] as [typeof handleCopy, typeof isCopying];
}
