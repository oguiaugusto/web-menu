import { FieldErrors, ResultError } from '@/types/misc';
import { Dispatch, SetStateAction } from 'react';
import { toastError } from './toast';
import { ERROR_MESSAGES } from '@/constants/text';

export function handleSubmitError(result: ResultError, setFieldErrors: Dispatch<SetStateAction<FieldErrors>>) {
  if (result.error.form) {
    toastError(ERROR_MESSAGES[result.error.form], { position: 'top-center' });
  } else if (result.error.fields) {
    setFieldErrors(result.error.fields);
  }
}
