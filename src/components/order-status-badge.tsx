import { STATUS_COLORS, STATUS_DOT_COLORS, getStatusInfo } from '@/constants/status';
import { cn } from '@/utils/cn';
import type { OrderStatus } from '@/generated/prisma/enums';
import type { TranslationDictionary } from '@/i18n';

type Props = Readonly<{
  status: OrderStatus;
  hideDot?: boolean;
  text: TranslationDictionary;
}>;

export function OrderStatusBadge({ status, hideDot, text }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
        STATUS_COLORS[status],
      )}
    >
      {!hideDot ? <span className={cn('size-1.5 rounded-full', STATUS_DOT_COLORS[status])} /> : null}
      <span className="mb-[-1px]">{getStatusInfo(text)[status].label}</span>
    </span>
  );
}
