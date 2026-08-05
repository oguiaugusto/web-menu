import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

const VARIANTS = {
  primary: 'bg-red-muted hover:bg-red-muted-light disabled:hover:bg-red-muted text-white',
  'primary-outline':
    'ring-red-muted text-red-muted hover:bg-red-muted disabled:hover:text-red-muted ring-1 ring-inset hover:text-white disabled:hover:bg-transparent',
  'primary-text':
    'text-red-muted hover:text-red-muted-light disabled:hover:text-red-muted rounded-none px-0 py-0 font-semibold',
  clean: '',
};
type OwnProps<T extends ElementType> = Readonly<{
  as?: T;
  variant: keyof typeof VARIANTS;
  children: ReactNode;
}>;

type Props<T extends ElementType> = OwnProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof OwnProps<T>>;

export function Button<T extends ElementType = 'button'>({ as, variant, children, className, ...props }: Props<T>) {
  const Component = as || 'button';

  const mergedClass = cn(
    'block cursor-pointer text-center disabled:cursor-not-allowed',
    variant !== 'clean'
      ? 'rounded-lg px-5 py-3 font-medium active:brightness-106 disabled:opacity-80 disabled:active:brightness-100'
      : '',
    VARIANTS[variant],
    className ?? '',
  );

  return (
    <Component className={mergedClass} {...props}>
      {children}
    </Component>
  );
}
