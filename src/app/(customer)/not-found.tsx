import { NotFoundPage } from '@/components/not-found';
import { TEXT } from '@/constants/text';

export default function NotFound() {
  return (
    <NotFoundPage
      title={TEXT.pageNotFound}
      description={TEXT.customerPageNotFoundDescription}
      actionLabel={TEXT.goBack}
    />
  );
}
