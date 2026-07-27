'use client';

import { login } from '@/actions/auth/login';
import { AuthCard } from '@/components/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ERROR_MESSAGES, TEXT } from '@/constants/text';
import { FieldErrors } from '@/types/misc';
import { getHandleChange } from '@/utils/getHandleChange';
import { toastError } from '@/utils/toast';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [fields, setFields] = useState({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = getHandleChange(setFields, setFieldErrors);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await login({
        email: fields.email,
        password: fields.password,
      });

      if (!result.success) {
        if (result.error.form) {
          toastError(ERROR_MESSAGES[result.error.form], { position: 'top-center' });
        } else if (result.error.fields) {
          setFieldErrors(result.error.fields);
        }

        return;
      }

      router.replace(searchParams.get('next') ?? '/admin');
    } finally {
      setIsSubmitting(false);
    }
  };

  const disableSubmit = fields.email.length < 1 || fields.password.length < 1 || isSubmitting;

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-8 lg:px-0">
        <AuthCard title={TEXT.signInTitle}>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              label={TEXT.email}
              placeholder={TEXT.emailPlaceholder}
              value={fields.email}
              error={fieldErrors.email}
              onChange={handleChange}
              required
            />
            <label className="block">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-900">{TEXT.password}</span>
                <Link
                  href="/forgot-password"
                  className="text-xs text-neutral-500 transition-colors hover:text-neutral-700 hover:underline"
                >
                  {TEXT.forgotPassword}
                </Link>
              </div>
              <Input
                type="password"
                name="password"
                label=""
                placeholder="••••••••"
                value={fields.password}
                error={fieldErrors.password}
                onChange={handleChange}
                required
              />
            </label>
            <Button type="submit" variant="primary" className="w-full" disabled={disableSubmit}>
              {TEXT.signIn}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500">
              <span>{TEXT.dontHaveARestaurant}</span>
              <Link href="/register" className="text-red-muted font-medium transition-colors hover:underline">
                {TEXT.createAnAccount}
              </Link>
            </p>
          </div>
        </AuthCard>
      </div>
    </main>
  );
}
