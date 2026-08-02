import { Metadata } from 'next';
import { Header } from './_components/header';
import { getCurrentUser, requireCurrentUser } from '@/lib/auth/user';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getCurrentUser();

  if (!user) return { title: 'Web Menu' };
  return { title: user.restaurant.name };
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireCurrentUser();

  return (
    <>
      <Header restaurant={user.restaurant} />
      {children}
    </>
  );
}
