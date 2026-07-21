'use client';

import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { Check, Loader2 } from 'lucide-react';
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
} from 'react';
import { ERROR_MESSAGES } from '@/constants/text';
import { cn } from '@/utils/cn';

const DEFAULT_DEBOUNCE = 300;
const DEFAULT_MIN_LENGTH = 2;
const NO_DELAY = 0;

export type SearchInputProps<T> = {
  label: string;
  value: T | null;
  onChange(value: T | null): void;
  onSelect?(value: T): void;
  search(query: string, signal: AbortSignal): Promise<T[]>;
  getKey(item: T): string;
  getLabel(item: T): string;
  placeholder?: string;
  suffix?: ReactNode;
  error?: string;
  errorLabel?: string;
  disabled?: boolean;
  debounce?: number;
  minLength?: number;
};

export type SearchInputRef = {
  focus(): void;
  clear(): void;
};

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay, value]);

  return debouncedValue;
}

function SearchInputInner<T>(
  {
    label,
    value,
    onChange,
    onSelect,
    search,
    getKey,
    getLabel,
    placeholder,
    suffix,
    error,
    errorLabel,
    disabled = false,
    debounce = DEFAULT_DEBOUNCE,
    minLength = DEFAULT_MIN_LENGTH,
  }: SearchInputProps<T>,
  ref: ForwardedRef<SearchInputRef>,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);
  const searchRef = useRef(search);
  const getLabelRef = useRef(getLabel);

  const [query, setQuery] = useState(() => (value ? getLabel(value) : ''));
  const [options, setOptions] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const inputId = useId();
  const errorId = `${inputId}-error`;

  const debounceDelay = Math.max(NO_DELAY, debounce);
  const minimumLength = Math.max(NO_DELAY, minLength);
  const debouncedQuery = useDebouncedValue(query, debounceDelay);
  const normalizedQuery = query.trim();

  const canSearch = !disabled && normalizedQuery.length >= minimumLength;
  const shouldShowDropdown = isOpen && canSearch;

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  useEffect(() => {
    getLabelRef.current = getLabel;
  }, [getLabel]);

  useEffect(() => {
    setQuery(value ? getLabelRef.current(value) : '');
  }, [value]);

  useEffect(() => {
    requestIdRef.current += 1;
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setOptions([]);
    setIsLoading(canSearch);

    if (disabled) {
      setIsOpen(false);
    }
  }, [canSearch, disabled, query]);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (disabled || debouncedQuery !== query || trimmedQuery.length < minimumLength) {
      return;
    }

    const controller = new AbortController();
    const requestId = requestIdRef.current;
    abortControllerRef.current = controller;

    void searchRef
      .current(trimmedQuery, controller.signal)
      .then((results) => {
        if (controller.signal.aborted || requestId !== requestIdRef.current) {
          return;
        }

        setOptions(results);
        setIsLoading(false);
      })
      .catch(() => {
        if (controller.signal.aborted || requestId !== requestIdRef.current) {
          return;
        }

        setOptions([]);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [debouncedQuery, disabled, minimumLength, query]);

  useEffect(
    () => () => {
      abortControllerRef.current?.abort();
    },
    [],
  );

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputRef.current?.focus();
        setIsOpen(true);
      },
      clear() {
        requestIdRef.current += 1;
        abortControllerRef.current?.abort();
        abortControllerRef.current = null;
        setQuery('');
        setOptions([]);
        setIsLoading(false);
        setIsOpen(false);
        onChange(null);
      },
    }),
    [onChange],
  );

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setIsOpen(true);
  }

  function handleSelection(item: T | null) {
    if (item === null) {
      onChange(null);
      setQuery('');
      setOptions([]);
      setIsOpen(false);
      return;
    }

    onChange(item);
    onSelect?.(item);
    setQuery(getLabelRef.current(item));
    setOptions([]);
    setIsOpen(false);
  }

  return (
    <div className="block space-y-1">
      <span id={`${inputId}-label`} className="text-sm font-medium">
        {label}
      </span>
      <Combobox<T | null>
        value={value}
        onChange={handleSelection}
        onClose={() => setIsOpen(false)}
        immediate
        by={(left, right) => {
          if (left === right) {
            return true;
          }

          return left !== null && right !== null && getKey(left) === getKey(right);
        }}
      >
        <div className="relative">
          <ComboboxInput
            ref={inputRef}
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
              'focus:border-red-muted shadow-red-muted/40 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 transition outline-none focus:shadow-xs',
              suffix || isLoading ? 'pr-12' : undefined,
              error ? 'border-red-500' : undefined,
              disabled ? 'cursor-not-allowed bg-neutral-100 text-neutral-500' : undefined,
            )}
          />
          {suffix || isLoading ? (
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-500">
              {isLoading ? <Loader2 aria-label="Searching" className="size-[18px] animate-spin" /> : suffix}
            </span>
          ) : null}
          <ComboboxOptions
            static
            aria-hidden={!shouldShowDropdown}
            className={cn(
              'absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-lg border border-neutral-200 bg-white shadow-lg transition duration-150 ease-out',
              shouldShowDropdown
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none invisible -translate-y-1 opacity-0',
            )}
          >
            {isLoading ? <div className="px-4 py-3 text-sm text-neutral-500">Searching...</div> : null}
            {!isLoading && options.length === 0 ? (
              <div className="px-4 py-3 text-sm text-neutral-500">No results found.</div>
            ) : null}
            {!isLoading
              ? options.map((option) => (
                  <ComboboxOption
                    key={getKey(option)}
                    value={option}
                    disabled={isLoading}
                    className="group flex cursor-pointer items-center justify-between px-4 py-3 transition data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focus]:bg-neutral-100"
                  >
                    <span>{getLabel(option)}</span>
                    <Check className="invisible size-4 group-data-[selected]:visible" />
                  </ComboboxOption>
                ))
              : null}
          </ComboboxOptions>
        </div>
      </Combobox>
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {`"${errorLabel ?? label}" ${ERROR_MESSAGES[error]}`}
        </p>
      ) : null}
    </div>
  );
}

export const SearchInput = forwardRef(SearchInputInner) as <T>(
  props: SearchInputProps<T> & RefAttributes<SearchInputRef>,
) => ReactElement;
