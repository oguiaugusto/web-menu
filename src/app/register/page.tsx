import { getText } from '@/i18n';
import { mountPageMetadata } from '@/utils/mount-page-metadata';
import RegisterContent from './_components/register-content';

export const metadata = mountPageMetadata('Web Menu', getText().signUpTitle);

export default function RegisterPage() {
  return <RegisterContent />;
}
