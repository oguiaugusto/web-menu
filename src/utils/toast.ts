import { inter } from '@/constants/fonts';
import { ExternalToast, toast } from 'sonner';

type titleT = (() => React.ReactNode) | React.ReactNode;

const commonClass = '!bg-red-muted !border-red-muted !text-white';
const commonConfig: ExternalToast = {
  duration: 4000,
  className: `${inter.className}`,
  classNames: {
    success: commonClass,
    error: commonClass,
    icon: 'text-white',
    actionButton: '!bg-white !text-red-muted',
  },
};

export function toastSuccess(message: titleT | React.ReactNode, data?: ExternalToast) {
  toast.success(message, {
    ...commonConfig,
    ...data,
  });
}

export function toastError(message: titleT | React.ReactNode, data?: ExternalToast) {
  toast.error(message, {
    ...commonConfig,
    ...data,
  });
}
