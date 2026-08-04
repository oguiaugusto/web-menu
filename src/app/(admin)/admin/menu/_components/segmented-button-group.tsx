import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

export type SegmentedButtonOption<T extends string> = {
  label: ReactNode;
  value: T;
  disabled?: boolean;
};

type SegmentedButtonGroupProps<T extends string> = {
  options: readonly SegmentedButtonOption<T>[];
  value: T;
  onChange(value: T): void;
  ariaLabel?: string;
  className?: string;
};

export function SegmentedButtonGroup<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: SegmentedButtonGroupProps<T>) {
  return (
    <div
      className={cn('inline-flex rounded-lg border border-neutral-200 bg-white p-1 shadow-xs', className)}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            disabled={option.disabled}
            aria-pressed={isSelected}
            className={cn(
              'flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
              isSelected
                ? 'bg-red-muted text-white shadow-xs'
                : 'text-neutral-600 enabled:hover:bg-neutral-100 enabled:hover:text-neutral-900',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
