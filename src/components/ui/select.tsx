'use client';

import { ChevronDownIcon, CircleQuestionMark } from 'lucide-react';
import { Select as HSelect } from '@headlessui/react';
import { Tooltip } from 'react-tooltip';
import { ERROR_MESSAGES } from '@/constants/text';

type Props = {
  label?: string;
  options: { value: string; label: string }[];
  name?: string;
  value?: string;
  tooltip?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  error?: string;
  errorLabel?: string;
  required?: boolean;
};

export function Select({ label, options, name, value, tooltip, onChange, error, errorLabel, required }: Props) {
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
        <HSelect
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="focus:border-red-muted shadow-red-muted/40 w-full appearance-none rounded-lg border border-neutral-200 bg-white px-4 py-3 transition outline-none focus:shadow-xs"
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
      {error ? <p className="mt-1 text-sm text-red-600">{`${errorLabel ?? label} ${ERROR_MESSAGES[error]}`}</p> : null}
    </label>
  );
}
