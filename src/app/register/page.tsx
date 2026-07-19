'use client';

import { AuthCard } from '@/components/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TEXT } from '@/constants/text';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import slugify from 'slugify';

export default function RegisterPage() {
  const [fields, setFields] = useState({
    restaurantName: '',
    restaurantUrl: '',
    email: '',
    password: '',
  });

  const [lastUrlFill, setLastUrlFill] = useState(fields.restaurantUrl);
  const [lockUrlAutofill, setLockUrlAutofill] = useState(false);

  const [url, setUrl] = useState('');
  useEffect(() => {
    if (window) setUrl(window.location.host + '/r/');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((p) => ({ ...p, [e.target.name]: e.target.value }));
    // setFieldErrors((p) => {
    //   const next = { ...p };
    //   delete next[e.target.name];
    //   return next;
    // });
  };

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const restaurantUrl = slugify(e.target.value, { lower: true });
    if (!lockUrlAutofill) {
      setFields((p) => ({ ...p, restaurantUrl }));
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

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-8 lg:px-0">
        <AuthCard title={TEXT.signUpTitle}>
          <form className="space-y-5">
            <Input
              name="restaurantName"
              label={TEXT.restaurantName}
              placeholder={TEXT.restaurantPlaceholder}
              value={fields.restaurantName}
              onChange={handleChange}
              onBlur={handleNameBlur}
              required
            />
            <Input
              name="restaurantUrl"
              label={TEXT.restaurantUrl}
              prefix={{ value: url, noPadding: true }}
              value={fields.restaurantUrl}
              onChange={handleChange}
              onBlur={handleUrlBlur}
              required
            />
            <Input
              name="email"
              label={TEXT.email}
              placeholder={TEXT.emailPlaceholder}
              type="email"
              value={fields.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              label={TEXT.password}
              placeholder="••••••••"
              type="password"
              value={fields.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="primary" className="w-full">
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
