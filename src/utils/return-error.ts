import { ErrorType, ResultError } from '@/types/misc';

export function returnError(error: ErrorType): ResultError {
  return {
    success: false,
    error,
  };
}
