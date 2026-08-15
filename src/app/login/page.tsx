import { getText } from '@/i18n';
import { mountPageMetadata } from '@/utils/mount-page-metadata';
import LoginContent from './_components/login-content';

export const metadata = mountPageMetadata('Web Menu', getText().signInTitle);

export default function LoginPage() {
  return <LoginContent />;
}
