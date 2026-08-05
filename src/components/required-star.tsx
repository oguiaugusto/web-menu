import { Asterisk } from 'lucide-react';

export default function RequiredStar({ required }: Readonly<{ required?: boolean }>) {
  if (!required) return null;

  return <Asterisk size={11} className='text-red-muted ms-[-6px] mt-[-6px]' />;
}
