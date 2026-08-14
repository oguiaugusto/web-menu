import { TEXT } from '@/constants/text';
import { mountPageMetadata } from '@/utils/mount-page-metadata';
import LoginContent from './_components/login-content';

export const metadata = mountPageMetadata('Web Menu', TEXT.signInTitle);

export default function LoginPage() {
  return <LoginContent />;
}
