import { requireUser } from '@/lib/auth/user';
import { Metadata } from 'next';
import { Header } from './_components/header';

export async function generateMetadata(): Promise<Metadata> {
  const user = await requireUser();

  if (!user) return { title: 'Web Menu' };
  return { title: user.restaurant.name };
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireUser();

  return (
    <>
      <Header restaurant={user.restaurant} />
      {children}
    </>
  );
}
