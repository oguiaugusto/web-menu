import type { ErrorMessages } from '@/i18n';
import type { ErrorCode } from '@/types/enums';

export function formatFieldError(label: string, error: ErrorCode, errorMessages: ErrorMessages) {
  return `${label}: ${errorMessages[error]}`;
}
