import { Metadata } from 'next';
import { mountAdminPageMetadata } from '@/utils/mount-page-metadata';
import OrdersContent from './_components/orders-content';

export async function generateMetadata(): Promise<Metadata> {
  return mountAdminPageMetadata('ordersPageTitle');
}

export default function OrdersPage() {
  return <OrdersContent />;
}
