import { OrderStatus } from '@/generated/prisma/enums';
import type { TranslationDictionary } from '@/i18n';

export function getStatusInfo(
  text: TranslationDictionary,
): Record<OrderStatus, { label: string; description: string }> {
  return {
    PENDING: { label: text.statusLabelPending, description: text.statusDescriptionPending },
    ACCEPTED: { label: text.statusLabelAccepted, description: text.statusDescriptionAccepted },
    PREPARING: { label: text.statusLabelPreparing, description: text.statusDescriptionPreparing },
    READY: { label: text.statusLabelReady, description: text.statusDescriptionReady },
    DELIVERED: { label: text.statusLabelDelivered, description: text.statusDescriptionDelivered },
    CANCELLED: { label: text.statusLabelCancelled, description: text.statusDescriptionCancelled },
  };
}

export const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  ACCEPTED: 'bg-amber-100 text-amber-700',
  PREPARING: 'bg-orange-100 text-orange-700',
  READY: 'bg-green-100 text-green-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
} as const;

export const STATUS_DOT_COLORS: Record<OrderStatus, string> = {
  PENDING: 'bg-amber-500',
  ACCEPTED: 'bg-amber-500',
  PREPARING: 'bg-orange-500',
  READY: 'bg-green-500',
  DELIVERED: 'bg-green-500',
  CANCELLED: 'bg-red-500',
} as const;

export const NEXT_STATUS = {
  [OrderStatus.PENDING]: OrderStatus.ACCEPTED,
  [OrderStatus.ACCEPTED]: OrderStatus.PREPARING,
  [OrderStatus.PREPARING]: OrderStatus.READY,
  [OrderStatus.READY]: OrderStatus.DELIVERED,
} as const;
