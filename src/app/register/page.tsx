'use client';

import { AuthCard } from '@/components/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TEXT } from '@/constants/text';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-8 lg:px-0">
        <AuthCard title={TEXT.signUpTitle}>
          <form className="space-y-5">
            <Input label={TEXT.restaurantName} placeholder={TEXT.restaurantPlaceholder} />
            <Input label={TEXT.restaurantURL} />
            <Input label={TEXT.email} placeholder={TEXT.emailPlaceholder} type="email" />
            <Input label={TEXT.password} placeholder="••••••••" type="password" />
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
