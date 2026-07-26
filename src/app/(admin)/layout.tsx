import { requireUser } from '@/lib/auth/user';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const user = await requireUser();

  if (!user) return { title: 'Web Menu' };
  return { title: user.restaurant.name }
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireUser();

  return <>{children}</>;
}
