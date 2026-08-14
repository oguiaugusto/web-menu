import { Metadata } from 'next';
import OrdersContent from './_components/orders-content';
import { mountCustomerPageMetadata } from '@/utils/mount-page-metadata';
import { TEXT } from '@/constants/text';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return mountCustomerPageMetadata(slug, TEXT.ordersTitle);
}

export default async function OrdersPage({ params }: Props) {
  const { slug } = await params;
  return <OrdersContent slug={slug} />;
}
