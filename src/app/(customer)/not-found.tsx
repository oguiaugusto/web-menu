import { NotFoundPage } from '@/components/not-found';
import { getText } from '@/i18n';
import { mountPageMetadata } from '@/utils/mount-page-metadata';

const TEXT = getText();

export const metadata = mountPageMetadata('Web Menu', TEXT.pageNotFound);

export default function NotFound() {
  return (
    <NotFoundPage
      title={TEXT.pageNotFound}
      description={TEXT.customerPageNotFoundDescription}
      actionLabel={TEXT.goBack}
    />
  );
}
