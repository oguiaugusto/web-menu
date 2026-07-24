import { ErrorCode } from './enums';

export type FieldErrors = Record<string, ErrorCode>;

export type ErrorType = { form?: ErrorCode; fields?: Record<string, ErrorCode> };

export type ResultError = { success: false; error: ErrorType };
