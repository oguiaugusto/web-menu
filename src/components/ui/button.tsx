import { cn } from '@/utils/cn';

const VARIANTS = {
  primary: 'bg-red-muted enabled:hover:bg-red-muted-light text-white',
  'primary-outline':
    'ring-red-muted text-red-muted enabled:hover:bg-red-muted ring-1 ring-inset enabled:hover:text-white transition',
  'primary-text': 'text-red-muted hover:text-red-muted-light rounded-none px-0 py-0 font-semibold',
};

type Props = Readonly<{
  children: React.ReactNode;
  variant: keyof typeof VARIANTS;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  disabled?: boolean;
  title?: string;
  onClick?: VoidFunction;
}>;

export function Button(p: Props) {
  const className = cn(
    'rounded-lg px-5 py-3 font-medium enabled:cursor-pointer enabled:active:brightness-106 disabled:opacity-80',
    VARIANTS[p.variant],
    p.className ?? '',
  );

  return (
    <button className={className} type={p.type} onClick={p.onClick} disabled={p.disabled} title={p.title}>
      {p.children}
    </button>
  );
}
