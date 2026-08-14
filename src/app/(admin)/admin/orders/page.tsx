import { Metadata } from 'next';
import { mountAdminPageMetadata } from '@/utils/mount-page-metadata';
import { TEXT } from '@/constants/text';
import OrdersContent from './_components/orders-content';

export async function generateMetadata(): Promise<Metadata> {
  return mountAdminPageMetadata(TEXT.ordersPageTitle);
}

export default function OrdersPage() {
  return <OrdersContent />;
}
