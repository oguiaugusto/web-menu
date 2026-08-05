import { STATUS_COLORS, STATUS_DOT_COLORS, STATUS_INFO } from '@/constants/status';
import { cn } from '@/utils/cn';
import type { OrderStatus } from '@/generated/prisma/enums';

type Props = Readonly<{
  status: OrderStatus;
  hideDot?: boolean;
}>;

export function OrderStatusBadge({ status, hideDot }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        STATUS_COLORS[status],
      )}
    >
      {!hideDot ? <span className={cn('size-1.5 rounded-full', STATUS_DOT_COLORS[status])} /> : null}
      {STATUS_INFO[status].label}
    </span>
  );
}
