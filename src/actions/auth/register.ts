'use server';

import { SLUG_PATTERN } from '@/constants/regex';
import { DEFAULT_CURRENCY } from '@/constants/supported-currencies';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/constants/supported-languages';
import { hash } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { ErrorCode } from '@/types/enums';
import { ResultError } from '@/types/misc';
import { checkPasswordStrength } from '@/utils/check-password-strength';
import { parseZodErrors } from '@/utils/parse-zod-errors';
import { returnError } from '@/utils/return-error';
import z from 'zod';

const RegisterSchema = z.object({
  restaurantName: z.string().trim().nonempty().max(100),
  restaurantUrl: z.string().trim().lowercase().regex(SLUG_PATTERN),
  email: z.email().transform((x) => x.trim()),
  password: z.string().nonempty(),
});

type RegisterInput = z.infer<typeof RegisterSchema>;

type ResultSuccess = { success: true };
type RegisterResult = ResultSuccess | ResultError;

export async function register(rawData: RegisterInput, language?: string): Promise<RegisterResult> {
  const parsed = RegisterSchema.safeParse(rawData);
  if (!parsed.success) {
    return returnError({ fields: parseZodErrors(parsed.error) });
  }

  const { data } = parsed;

  const { isValid } = checkPasswordStrength(data.password);
  if (!isValid) {
    return returnError({ fields: { password: ErrorCode.WEAK_PASSWORD } });
  }

  const exEmail = await prisma.user.findUnique({ where: { email: data.email } });
  if (exEmail) {
    return returnError({ fields: { email: ErrorCode.ALREADY_REGISTERED } });
  }

  const exSlug = await prisma.restaurant.findUnique({ where: { slug: data.restaurantUrl } });
  if (exSlug) {
    return returnError({ fields: { restaurantUrl: ErrorCode.ALREADY_IN_USE } });
  }

  const supportedLanguage = SUPPORTED_LANGUAGES.find((x) => x.value === language);

  const passwordHash = await hash(data.password);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      restaurant: {
        create: {
          name: data.restaurantName,
          slug: data.restaurantUrl,
          currency: DEFAULT_CURRENCY,
          language: supportedLanguage?.value ?? DEFAULT_LANGUAGE,
        },
      },
    },
  });

  await createSession(user.id);
  return { success: true };
}
