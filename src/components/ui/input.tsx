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
  prefix?: { value: React.ReactNode | string; noPadding?: boolean };
  suffix?: { value: React.ReactNode | string; noPadding?: boolean };
  tooltip?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  errorLabel?: string;
  required?: boolean;
  additionalInputProps?: React.ComponentProps<'input'>;
}>;

export function Input({
  label,
  type,
  name,
  placeholder,
  value,
  prefix,
  suffix,
  tooltip,
  onChange,
  onBlur,
  error,
  errorLabel,
  required,
  additionalInputProps,
}: Props) {
  const prefixRef = useRef<HTMLElement>(null);
  const [prefixWidth, setPrefixWidth] = useState<number>(0);

  const suffixRef = useRef<HTMLElement>(null);
  const [suffixWidth, setSuffixWidth] = useState<number>(0);

  const prefixPadding = !prefix ? 0 : prefix?.noPadding ? 15 : 18;
  const suffixPadding = !suffix ? 0 : suffix?.noPadding ? 15 : 18;

  useLayoutEffect(() => {
    if (prefixRef.current) {
      setPrefixWidth(Math.ceil(prefixRef.current.getBoundingClientRect().width));
    }
    if (suffixRef.current) {
      setSuffixWidth(Math.ceil(suffixRef.current.getBoundingClientRect().width));
    }
  }, [prefix, suffix]);

  return (
    <label className="block space-y-1">
      <span className="flex items-center gap-2 text-sm font-medium">
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
            paddingInlineEnd: suffix ? `${suffixPadding + suffixWidth}px` : undefined,
          }}
          className={cn(
            'focus:border-red-muted shadow-red-muted/40 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 transition outline-none focus:shadow-xs',
          )}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          {...additionalInputProps}
        />
        {suffix ? (
          <span className="absolute top-1/2 right-4 -translate-y-1/2" ref={suffixRef}>
            {suffix.value}
          </span>
        ) : null}
      </div>
      {error ? (
        <p className="mt-1 text-sm text-red-600">{`${errorLabel ?? label} ${ERROR_MESSAGES[error]}`}</p>
      ) : null}
    </label>
  );
}
