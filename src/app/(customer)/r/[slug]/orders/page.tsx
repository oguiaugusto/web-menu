import { Metadata } from 'next';
import OrdersContent from './_components/orders-content';
import { mountCustomerPageMetadata } from '@/utils/mount-page-metadata';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return mountCustomerPageMetadata(slug, 'ordersTitle');
}

export default async function OrdersPage({ params }: Props) {
  const { slug } = await params;
  return <OrdersContent slug={slug} />;
}
