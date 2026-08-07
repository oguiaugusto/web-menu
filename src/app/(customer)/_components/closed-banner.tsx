import { TEXT } from '@/constants/text';
import { CircleAlert } from 'lucide-react';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export function ClosedBanner({ children }: Props) {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
      <CircleAlert className="mt-0.5 shrink-0 text-red-700 text-md" size={18} />
      <div>
        <p className="font-semibold text-red-800">{TEXT.restaurantClosed}</p>
        <p className="mt-0.5 text-sm leading-5 text-red-700">{children}</p>
      </div>
    </div>
  );
}
