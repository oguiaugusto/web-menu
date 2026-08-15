import { Metadata } from 'next';
import CartContent from './_components/cart-content';
import { mountCustomerPageMetadata } from '@/utils/mount-page-metadata';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return mountCustomerPageMetadata(slug, 'yourCart');
}

export default async function CartPage({ params }: Props) {
  const { slug } = await params;
  return <CartContent slug={slug} />;
}
