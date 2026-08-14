'use client';

import { ArrowLeft, FileQuestion } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

type Props = Readonly<{
  title: string;
  description: string;
  actionLabel: string;
  href?: string;
}>;

export function NotFoundPage({ title, description, actionLabel, href }: Props) {
  const router = useRouter();

  const handleAction = () => {
    if (href) {
      router.replace(href);
      return;
    }

    router.back();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-red-muted/10 text-red-muted mx-auto flex size-32 items-center justify-center rounded-full">
          <FileQuestion size={72} strokeWidth={1.75} />
        </div>
        <p className="mt-5 text-sm font-semibold text-neutral-400">404</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">{title}</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-500">{description}</p>
        <div className="mt-6 flex justify-center">
          <Button variant="primary" className="flex items-center gap-2" onClick={handleAction}>
            <ArrowLeft size={17} />
            {actionLabel}
          </Button>
        </div>
      </div>
    </main>
  );
}
