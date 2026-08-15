'use client';

import { useLocale } from '@/providers/locale-provider';
import { NotFoundPage } from './not-found';

export function LocalizedNotFound() {
  const { text: TEXT } = useLocale();

  return (
    <NotFoundPage
      title={TEXT.pageNotFound}
      description={TEXT.pageNotFoundDescription}
      actionLabel={TEXT.goToHomePage}
      href="/"
    />
  );
}
