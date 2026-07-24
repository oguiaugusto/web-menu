'use server';

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
  restaurantName: z.string().nonempty().max(100),
  restaurantUrl: z
    .string()
    .lowercase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  email: z.email(),
  password: z.string().nonempty(),
});

type RegisterInput = z.infer<typeof RegisterSchema>;

type ResultSuccess = { success: true };
type RegisterResult = ResultSuccess | ResultError;

export async function register(rawData: RegisterInput): Promise<RegisterResult> {
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

  const passwordHash = await hash(data.password);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      restaurant: {
        create: {
          name: data.restaurantName,
          slug: data.restaurantUrl,
        },
      },
    },
  });

  await createSession(user.id);
  return { success: true };
}
