import { AuthCard } from '@/components/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TEXT } from '@/constants/text';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-8 lg:px-0">
        <AuthCard title={TEXT.signInTitle}>
          <form className="space-y-5">
            <Input label={TEXT.email} placeholder={TEXT.emailPlaceholder} type="email" />
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
              <Input label="" placeholder="••••••••" type="password" />
            </label>
            <Button type="submit" variant="primary" className="w-full">
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
