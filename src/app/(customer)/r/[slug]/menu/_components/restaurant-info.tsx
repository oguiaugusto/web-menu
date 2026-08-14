import { TEXT } from '@/constants/text';
import { cn } from '@/utils/cn';
import { Clock3, MessageCircle, Truck } from 'lucide-react';

type Props = Readonly<{
  deliveryFee?: number | null;
  openingHours?: string | null;
  contact?: string | null;
}>;

export function RestaurantInfo({ deliveryFee, openingHours, contact }: Props) {
  const columns = 1 + Number(Boolean(openingHours)) + Number(Boolean(contact));

  return (
    <div className={cn('mb-4 grid gap-3 rounded-lg border border-neutral-200 bg-white p-4', `sm:grid-cols-${columns}`)}>
      <div className="flex items-start gap-2.5">
        <Truck className="shrink-0 text-neutral-400" size={17} />
        <div className="min-w-0">
          <p className="text-xs font-medium text-neutral-500">{TEXT.deliveryFee}</p>
          <p className="mt-0.5 text-sm font-medium text-neutral-800">
            {`${TEXT.currency}${(deliveryFee ?? 0).toFixed(2)}`}
          </p>
        </div>
      </div>
      {openingHours ? (
        <div className="flex items-start gap-2.5">
          <Clock3 className="shrink-0 text-neutral-400" size={17} />
          <div className="min-w-0">
            <p className="text-xs font-medium text-neutral-500">{TEXT.openingHours}</p>
            <p className="mt-0.5 text-sm font-medium text-neutral-800">{openingHours}</p>
          </div>
        </div>
      ) : null}
      {contact ? (
        <div className="flex items-start gap-2.5">
          <MessageCircle className="shrink-0 text-neutral-400" size={17} />
          <div className="min-w-0">
            <p className="text-xs font-medium text-neutral-500">{TEXT.contact}</p>
            <p className="mt-0.5 text-sm font-medium break-words text-neutral-800">{contact}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
