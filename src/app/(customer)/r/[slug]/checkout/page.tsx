import { Metadata } from 'next';
import CheckoutContent from './_components/checkout-content';
import { mountCustomerPageMetadata } from '@/utils/mount-page-metadata';
import { TEXT } from '@/constants/text';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return mountCustomerPageMetadata(slug, TEXT.checkout);
}

export default async function CheckoutPage({ params }: Props) {
  const { slug } = await params;
  return <CheckoutContent slug={slug} />;
}
