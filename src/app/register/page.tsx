'use client';

import { AuthCard } from '@/components/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TEXT } from '@/constants/text';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PasswordInput } from './_components/password-input';
import { generateSlug } from '@/constants/generate-slug';
import { FieldErrors } from '@/types/misc';
import { register } from '@/actions/auth/register';
import { useRouter } from 'next/navigation';
import { getHandleChange } from '@/utils/getHandleChange';
import { handleSubmitError } from '@/utils/handle-submit-error';

export default function RegisterPage() {
  const router = useRouter();

  const [fields, setFields] = useState({
    restaurantName: '',
    restaurantUrl: '',
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [lastUrlFill, setLastUrlFill] = useState(fields.restaurantUrl);
  const [lockUrlAutofill, setLockUrlAutofill] = useState(false);

  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(window.location.host + '/r/');
  }, []);

  const handleChange = getHandleChange(setFields, setFieldErrors);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const restaurantUrl = generateSlug(e.target.value);
    if (!lockUrlAutofill) {
      setFields((p) => ({ ...p, restaurantName: e.target.value, restaurantUrl }));
      setLastUrlFill(restaurantUrl);
    }
  };

  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setLockUrlAutofill(false);
      setLastUrlFill('');
      return;
    }

    if (e.target.value !== lastUrlFill) setLockUrlAutofill(true);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await register({
        email: fields.email,
        password: fields.password,
        restaurantName: fields.restaurantName,
        restaurantUrl: fields.restaurantUrl,
      });

      if (!result.success) return handleSubmitError(result, setFieldErrors);

      router.replace('/admin');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputProps: React.ComponentProps<'input'> = { 'aria-autocomplete': 'none', autoComplete: 'new-password' };
  const disableSubmit =
    !isPasswordValid ||
    fields.email.length < 1 ||
    fields.restaurantName.length < 1 ||
    fields.restaurantUrl.length < 1 ||
    isSubmitting;

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-8 lg:px-0">
        <AuthCard title={TEXT.signUpTitle}>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              name="restaurantName"
              label={TEXT.restaurantName}
              placeholder={TEXT.restaurantPlaceholder}
              error={fieldErrors.restaurantName}
              value={fields.restaurantName}
              onChange={handleNameChange}
              additionalInputProps={inputProps}
              required
            />
            <Input
              name="restaurantUrl"
              prefix={{ value: url, noPadding: true }}
              label={TEXT.restaurantUrl}
              value={fields.restaurantUrl}
              error={fieldErrors.restaurantUrl}
              onChange={handleChange}
              onBlur={handleUrlBlur}
              additionalInputProps={inputProps}
              required
            />
            <Input
              type="email"
              name="email"
              label={TEXT.email}
              placeholder={TEXT.emailPlaceholder}
              value={fields.email}
              error={fieldErrors.email}
              onChange={handleChange}
              additionalInputProps={inputProps}
              required
            />
            <PasswordInput
              value={fields.password}
              error={fieldErrors.password}
              onChange={handleChange}
              setIsValid={setIsPasswordValid}
            />
            <Button type="submit" variant="primary" className="w-full" disabled={disableSubmit}>
              {TEXT.signUp}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500">
              <span>{TEXT.alreadyHaveAnAccount}</span>
              <Link href="/login" className="text-red-muted font-medium transition-colors hover:underline">
                {TEXT.signIn}
              </Link>
            </p>
          </div>
        </AuthCard>
      </div>
    </main>
  );
}
