'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="cursor-pointer rounded-full border border-neutral-200 bg-neutral-100 p-1 shadow-md hover:opacity-90"
    >
      <ChevronLeft size={24} className="ms-[-1px] me-[2px] text-black" />
    </button>
  );
}
