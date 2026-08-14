import { NotFoundPage } from '@/components/not-found';
import { TEXT } from '@/constants/text';
import { mountPageMetadata } from '@/utils/mount-page-metadata';

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
