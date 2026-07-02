'use client';

import { saveOrderCode } from '@/utils/localstorage-orders';
import { useEffect } from 'react';

export function RememberOrder({ code }: { code: string }) {
  useEffect(() => {
    saveOrderCode(code);
  }, [code]);

  return null;
}
