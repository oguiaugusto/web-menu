import { TEXT } from '@/constants/text';
import { mountPageMetadata } from '@/utils/mount-page-metadata';
import RegisterContent from './_components/register-content';

export const metadata = mountPageMetadata('Web Menu', TEXT.signUpTitle);

export default function RegisterPage() {
  return <RegisterContent />;
}
