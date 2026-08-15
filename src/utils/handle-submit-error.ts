import { FieldErrors, ResultError } from '@/types/misc';
import { Dispatch, SetStateAction } from 'react';
import { toastError } from './toast';
import type { ErrorMessages } from '@/i18n';

export function handleSubmitError(
  result: ResultError,
  setFieldErrors: Dispatch<SetStateAction<FieldErrors>>,
  errorMessages: ErrorMessages,
) {
  if (result.error.form) {
    toastError(errorMessages[result.error.form], { position: 'top-center' });
  } else if (result.error.fields) {
    setFieldErrors(result.error.fields);
  }
}
