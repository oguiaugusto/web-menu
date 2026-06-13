import { inter } from '@/constants/fonts';
import { ExternalToast, toast } from 'sonner';

type titleT = (() => React.ReactNode) | React.ReactNode;
export function toastSuccess(message: titleT | React.ReactNode, data?: ExternalToast) {
  toast.success(message, {
    duration: 4000,
    className: `${inter.className}`,
    classNames: {
      success: '!bg-red-muted !border-red-muted !text-white',
      icon: 'text-white',
      actionButton: '!bg-white !text-red-muted',
    },
    ...data,
  });
}
