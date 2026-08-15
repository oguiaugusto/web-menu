'use client';

import { ChevronDownIcon, CircleQuestionMark } from 'lucide-react';
import { Select as HSelect } from '@headlessui/react';
import { Tooltip } from 'react-tooltip';
import type { ErrorMessages } from '@/i18n';
import type { ErrorCode } from '@/types/enums';
import { formatFieldError } from '@/utils/format-field-error';
import RequiredStar from '../required-star';

type Props = {
  label?: string;
  options: { value: string; label: string }[];
  name?: string;
  value?: string;
  tooltip?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  error?: ErrorCode;
  errorMessages?: ErrorMessages;
  errorLabel?: string;
  required?: boolean;
  showRequired?: boolean;
};

export function Select({
  label,
  options,
  name,
  value,
  tooltip,
  onChange,
  error,
  errorMessages,
  errorLabel,
  required,
  showRequired,
}: Props) {
  return (
    <label className="block space-y-1">
      {label ? (
        <span className="flex items-center gap-2 text-sm font-medium">
          {label}
          <RequiredStar required={required && showRequired} />
          {tooltip ? (
            <>
              <span data-tooltip-id="tooltip" data-tooltip-place="right">
                <CircleQuestionMark size={14} />
              </span>
              <Tooltip
                id={`tooltip-${name}`}
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
      ) : null}
      <div className="relative">
        <HSelect
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="focus:border-red-muted shadow-red-muted/40 h-12 w-full appearance-none rounded-lg border border-neutral-200 bg-white px-4 py-3 transition outline-none focus:shadow-xs"
        >
          {options.map((x) => (
            <option key={`option-${x.value}`} value={x.value}>
              {x.label}
            </option>
          ))}
        </HSelect>
        <ChevronDownIcon
          className="group fill-neutral/60 pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
          aria-hidden="true"
        />
      </div>
      {error && errorMessages ? (
        <p className="mt-1 text-sm text-red-600">{formatFieldError(errorLabel ?? label ?? '', error, errorMessages)}</p>
      ) : null}
    </label>
  );
}
