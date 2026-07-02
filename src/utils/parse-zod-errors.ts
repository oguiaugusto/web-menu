import { ErrorCode } from '@/types/enums';
import z from 'zod';

export function parseZodErrors(error: z.ZodError) {
  const fieldErrors: Record<string, ErrorCode> = {};

  for (const issue of error.issues) {
    const field = issue.path.join('.');

    switch (issue.code) {
      case 'invalid_type':
        fieldErrors[field] = ErrorCode.INVALID_TYPE;
        break;

      case 'invalid_value':
        fieldErrors[field] = ErrorCode.INVALID_VALUE;
        break;

      case 'invalid_format':
        fieldErrors[field] = ErrorCode.INVALID_FORMAT;
        break;

      case 'too_big':
        fieldErrors[field] = ErrorCode.TOO_BIG;
        break;

      case 'too_small':
        fieldErrors[field] = issue.minimum === 1 ? ErrorCode.REQUIRED : ErrorCode.TOO_SMALL;
        break;

      default:
        fieldErrors[field] = ErrorCode.INVALID_FIELD;
    }
  }

  return fieldErrors;
}
