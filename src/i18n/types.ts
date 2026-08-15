import type { PaymentMethod } from '@/generated/prisma/enums';
import type { ErrorCode } from '@/types/enums';
import type { EN } from './en';

export type TranslationDictionary = { [Key in keyof typeof EN]: string };
export type TranslationKey = keyof TranslationDictionary;
export type ErrorMessages = Record<ErrorCode, string>;
export type PaymentMethodLabels = Record<PaymentMethod, string>;
