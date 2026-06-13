'use client';

import { ERROR_MESSAGES } from '@/constants/text';
import { cn } from '@/utils/cn';
import { useLayoutEffect, useRef, useState } from 'react';

type Props = Readonly<{
  label: string;
  addLabel?: string;
  type?: HTMLInputElement['type'];
  name?: string;
  placeholder?: string;
  value?: string;
  prefix?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
}>;

export function Input({ label, addLabel, name, placeholder, value, prefix, onChange, error }: Props) {
  const prefixRef = useRef<HTMLElement>(null);
  const [prefixWidth, setPrefixWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if (prefixRef.current) {
      setPrefixWidth(Math.ceil(prefixRef.current.getBoundingClientRect().width));
    }
  }, [prefix]);

  const fullLabel = addLabel ? `${label} (${addLabel})` : label;

  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{fullLabel}</span>
      <div className="relative">
        {prefix ? (
          <span className="absolute top-1/2 left-4 -translate-y-1/2" ref={prefixRef}>
            {prefix}
          </span>
        ) : null}
        <input
          style={{
            paddingInlineStart: prefix ? `${18 + prefixWidth}px` : undefined,
          }}
          className={cn(
            'focus:border-red-muted shadow-red-muted/40 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 transition outline-none focus:shadow-xs',
          )}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {error ? <p className="mt-1 text-sm text-red-600">{`"${label}" ${ERROR_MESSAGES[error]}`}</p> : null}
    </label>
  );
}
