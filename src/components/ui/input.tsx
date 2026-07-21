'use client';

import { ERROR_MESSAGES } from '@/constants/text';
import { cn } from '@/utils/cn';
import { CircleQuestionMark } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';

type Props = Readonly<{
  label: string;
  type?: HTMLInputElement['type'];
  name?: string;
  placeholder?: string;
  value?: string;
  prefix?: { value: string; noPadding?: boolean };
  tooltip?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  errorLabel?: string;
  required?: boolean;
}>;

export function Input({
  label,
  name,
  placeholder,
  value,
  prefix,
  tooltip,
  onChange,
  onBlur,
  error,
  errorLabel,
  required,
}: Props) {
  const prefixRef = useRef<HTMLElement>(null);
  const [prefixWidth, setPrefixWidth] = useState<number>(0);

  const prefixPadding = !prefix ? 0 : prefix?.noPadding ? 15 : 18;

  useLayoutEffect(() => {
    if (prefixRef.current) {
      setPrefixWidth(Math.ceil(prefixRef.current.getBoundingClientRect().width));
    }
  }, [prefix]);

  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium flex items-center gap-2">
        {label}
        {tooltip ? (
          <>
            <span data-tooltip-id="tooltip" data-tooltip-place="right">
              <CircleQuestionMark size={14} />
            </span>
            <Tooltip
              id="tooltip"
              style={{
                backgroundColor: 'var(--color-neutral-700)',
                zIndex: '1000',
              }}
            >
              {tooltip}
            </Tooltip>
          </>
        ) : null}
      </span>
      <div className="relative">
        {prefix ? (
          <span className="absolute top-1/2 left-4 -translate-y-1/2" ref={prefixRef}>
            {prefix.value}
          </span>
        ) : null}
        <input
          style={{
            paddingInlineStart: prefix ? `${prefixPadding + prefixWidth}px` : undefined,
          }}
          className={cn(
            'focus:border-red-muted shadow-red-muted/40 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 transition outline-none focus:shadow-xs',
          )}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
        />
      </div>
      {error ? (
        <p className="mt-1 text-sm text-red-600">{`"${errorLabel ?? label}" ${ERROR_MESSAGES[error]}`}</p>
      ) : null}
    </label>
  );
}
