import { Header } from '../_components/header';
import { requireCurrentUser } from '@/lib/auth/user';
import { AdminProvider } from '@/providers/admin-provider';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireCurrentUser();

  return (
    <AdminProvider restaurant={user.restaurant}>
      <Header />
      {children}
    </AdminProvider>
  );
}
