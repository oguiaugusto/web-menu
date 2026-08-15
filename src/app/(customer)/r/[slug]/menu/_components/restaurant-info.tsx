import type { TranslationDictionary } from '@/i18n';
import { formatCurrency } from '@/utils/money';
import { Clock3, MessageCircle, Truck } from 'lucide-react';

type Props = Readonly<{
  currency: string;
  deliveryFee?: number | null;
  openingHours?: string | null;
  contact?: string | null;
  text: TranslationDictionary;
}>;

export function RestaurantInfo({ currency, deliveryFee, openingHours, contact, text: TEXT }: Props) {
  const columns = 1 + Number(Boolean(openingHours)) + Number(Boolean(contact));

  return (
    <div
      className="mb-4 space-y-3 rounded-lg border border-neutral-200 bg-white p-4 sm:grid sm:gap-3 sm:space-y-0"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      <div className="flex items-start gap-2.5">
        <Truck className="shrink-0 text-neutral-400" size={17} />
        <div className="min-w-0">
          <p className="text-xs font-medium text-neutral-500">{TEXT.deliveryFee}</p>
          <p className="mt-0.5 text-sm font-medium text-neutral-800">{formatCurrency(deliveryFee ?? 0, currency)}</p>
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
