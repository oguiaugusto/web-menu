import { getCurrentUser } from '@/lib/auth/user';
import { redirect } from 'next/navigation';

export default async function RegisterLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();
  if (user) redirect('/admin');

  return children;
}
