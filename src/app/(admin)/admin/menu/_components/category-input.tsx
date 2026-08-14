'use client';

import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { Check, CircleQuestionMark } from 'lucide-react';
import { useEffect, useId, useState, type ChangeEvent, type ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';
import { ERROR_MESSAGES, TEXT } from '@/constants/text';
import { cn } from '@/utils/cn';
import RequiredStar from '@/components/required-star';

export type CategoryInputProps = {
  label: string;
  value: string;
  onChange(value: string): void;
  categories: string[];
  placeholder?: string;
  error?: string;
  errorLabel?: string;
  disabled?: boolean;
  tooltip?: ReactNode;
};

export function CategoryInput({
  label,
  value,
  onChange,
  categories,
  placeholder,
  error,
  errorLabel,
  disabled = false,
  tooltip,
}: CategoryInputProps) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const inputId = useId();
  const errorId = `${inputId}-error`;

  const normalizedQuery = query.toLowerCase();

  const exactCategory = categories.find((category) => category.toLowerCase() === normalizedQuery);
  const matchingCategories = exactCategory
    ? [exactCategory]
    : categories.filter((category) => category.toLowerCase().includes(normalizedQuery));

  const canCreate = query.trim().length > 0 && !exactCategory;
  const shouldShowDropdown = isOpen && !disabled;

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsOpen(true);
  };

  const handleSelection = (category: string | null) => {
    if (category === null) {
      onChange('');
      setQuery('');
      setIsOpen(false);
      return;
    }

    onChange(category);
    setQuery(category);
    setIsOpen(false);
  };

  return (
    <label className="block space-y-1">
      {label ? (
        <span id={`${inputId}-label`} className="flex items-center gap-2 text-sm font-medium">
          {label}
          <RequiredStar required />
          {tooltip ? (
            <>
              <span data-tooltip-id="tooltip" data-tooltip-place="right">
                <CircleQuestionMark size={14} />
              </span>
              <Tooltip
                id={`tooltip-${inputId}`}
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
      <Combobox<string> value={value} onChange={handleSelection} onClose={() => setIsOpen(false)} immediate>
        <div className="relative">
          <ComboboxInput
            id={inputId}
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            aria-labelledby={`${inputId}-label`}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={Boolean(error)}
            className={cn(
              'focus:border-red-muted shadow-red-muted/40 h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 transition outline-none focus:shadow-xs',
              error ? 'border-red-500' : undefined,
              disabled ? 'cursor-not-allowed bg-neutral-100 text-neutral-500' : undefined,
            )}
          />
          <ComboboxOptions
            static
            aria-hidden={!shouldShowDropdown}
            modal={false}
            className={cn(
              'absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-lg border border-neutral-200 bg-white shadow-lg transition duration-150 ease-out',
              shouldShowDropdown
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none invisible -translate-y-1 opacity-0',
            )}
          >
            {matchingCategories.map((category) => (
              <ComboboxOption
                key={category}
                value={category}
                className="group flex cursor-pointer items-center justify-between px-4 py-3 transition data-[focus]:bg-neutral-100"
              >
                <span>{category}</span>
                <Check className="invisible size-4 group-data-[selected]:visible" />
              </ComboboxOption>
            ))}
            {canCreate ? (
              <ComboboxOption
                value={query}
                className="group flex cursor-pointer items-center justify-between px-4 py-3 transition data-[focus]:bg-neutral-100"
              >
                <span>{`${TEXT.create} "${query}"`}</span>
                <Check className="invisible size-4 group-data-[selected]:visible" />
              </ComboboxOption>
            ) : null}
            {matchingCategories.length === 0 && !canCreate ? (
              <div className="px-4 py-3 text-sm text-neutral-500">{TEXT.noResultsFound}</div>
            ) : null}
          </ComboboxOptions>
        </div>
      </Combobox>
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {`${errorLabel ?? label} ${ERROR_MESSAGES[error]}`}
        </p>
      ) : null}
    </label>
  );
}
