import { LocalizedNotFound } from '@/components/localized-not-found';
import { getText } from '@/i18n';
import { mountPageMetadata } from '@/utils/mount-page-metadata';

const TEXT = getText();

export const metadata = mountPageMetadata('Web Menu', TEXT.pageNotFound);

export default function NotFound() {
  return <LocalizedNotFound />;
}
