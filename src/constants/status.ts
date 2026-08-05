import { TEXT } from '@/constants/text';
import { type OrderStatus } from '@/generated/prisma/enums';

export const STATUS_INFO: Record<OrderStatus, { label: string; description: string }> = {
  PENDING: { label: TEXT.statusLabelPending, description: TEXT.statusDescriptionPending },
  ACCEPTED: { label: TEXT.statusLabelAccepted, description: TEXT.statusDescriptionAccepted },
  PREPARING: { label: TEXT.statusLabelPreparing, description: TEXT.statusDescriptionPreparing },
  READY: { label: TEXT.statusLabelReady, description: TEXT.statusDescriptionReady },
  DELIVERED: { label: TEXT.statusLabelDelivered, description: TEXT.statusDescriptionDelivered },
  CANCELLED: { label: TEXT.statusLabelCancelled, description: TEXT.statusDescriptionCancelled },
} as const;

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
