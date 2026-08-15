import { NotFoundPage } from '@/components/not-found';
import { getText } from '@/i18n';
import { getCurrentUser } from '@/lib/auth/user';
import { mountPageMetadata } from '@/utils/mount-page-metadata';

export const metadata = mountPageMetadata('Web Menu', getText().pageNotFound);

export default async function NotFound() {
  const user = await getCurrentUser();
  const TEXT = getText(user?.restaurant.language);
  return (
    <NotFoundPage
      title={TEXT.pageNotFound}
      description={TEXT.adminPageNotFoundDescription}
      actionLabel={TEXT.backToOrders}
      href="/admin/orders"
    />
  );
}
