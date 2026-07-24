'use server';

import { compare } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { ErrorCode } from '@/types/enums';
import { ResultError } from '@/types/misc';
import { parseZodErrors } from '@/utils/parse-zod-errors';
import { returnError } from '@/utils/return-error';
import z from 'zod';

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});

type LoginInput = z.infer<typeof LoginSchema>;

type ResultSuccess = { success: true };
type LoginResult = ResultSuccess | ResultError;

export async function login(rawData: LoginInput): Promise<LoginResult> {
  const parsed = LoginSchema.safeParse(rawData);
  if (!parsed.success) {
    return returnError({ fields: parseZodErrors(parsed.error) });
  }

  const { data } = parsed;

  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    return returnError({ form: ErrorCode.WRONG_CREDENTIALS });
  }

  const passwordMatches = await compare(data.password, user.passwordHash);
  if (!passwordMatches) {
    return returnError({ form: ErrorCode.WRONG_CREDENTIALS });
  }

  await createSession(user.id);
  return { success: true };
}
