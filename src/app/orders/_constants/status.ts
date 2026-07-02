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
