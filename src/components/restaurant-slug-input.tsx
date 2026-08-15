'use client';

import { checkRestaurantSlugAvailability } from '@/actions/restaurant';
import { generateSlug, normalizeSlug } from '@/utils/slug';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { CircleCheck, CircleX, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import type { ErrorMessages, TranslationDictionary } from '@/i18n';
import type { ErrorCode } from '@/types/enums';
import { Tooltip } from 'react-tooltip';

type Availability = 'idle' | 'checking' | 'available' | 'unavailable';

type RestaurantSlugInputProps = Readonly<{
  value: string;
  onChange: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: ErrorCode;
  errorMessages: ErrorMessages;
  text: TranslationDictionary;
  currentSlug?: string;
  disabled?: boolean;
  required?: boolean;
  showRequired?: boolean;
  name?: string;
}>;

const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function RestaurantSlugInput({
  value,
  onChange,
  onBlur,
  error,
  errorMessages,
  text: TEXT,
  currentSlug,
  disabled,
  required,
  showRequired,
  name = 'restaurantUrl',
}: RestaurantSlugInputProps) {
  const [host, setHost] = useState('');
  const [availability, setAvailability] = useState<Availability>('idle');

  const debouncedSlug = useDebouncedValue(value, 400);

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  useEffect(() => {
    let ignore = false;

    if (disabled || !debouncedSlug || !validSlug.test(debouncedSlug)) {
      setAvailability('idle');
      return;
    }

    if (debouncedSlug === currentSlug) {
      setAvailability('available');
      return;
    }

    setAvailability('checking');

    void checkRestaurantSlugAvailability(debouncedSlug)
      .then((result) => {
        if (ignore) return;

        setAvailability(result.success ? (result.available ? 'available' : 'unavailable') : 'idle');
      })
      .catch(() => {
        if (!ignore) setAvailability('idle');
      });

    return () => {
      ignore = true;
    };
  }, [currentSlug, debouncedSlug, disabled]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(generateSlug(event.target.value));
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    onChange(normalizeSlug(event.target.value));
    onBlur?.(event);
  };

  const renderStatus = () => {
    let tooltip = '';
    let icon: React.ReactNode;

    if (availability === 'checking') {
      tooltip = TEXT.checking;
      icon = <LoaderCircle className="animate-spin text-neutral-500" size={18} />;
    } else if (availability === 'available') {
      tooltip = TEXT.urlAvailable;
      icon = <CircleCheck className="text-green-600" size={18} />;
    } else if (availability === 'unavailable') {
      tooltip = TEXT.urlInUse;
      icon = <CircleX className="text-red-600" size={18} />;
    } else {
      return null;
    }

    return (
      <>
        <span data-tooltip-id="tooltip-slug" data-tooltip-place="right">
          {icon}
        </span>
        <Tooltip
          id="tooltip-slug"
          style={{
            backgroundColor: 'var(--color-neutral-700)',
            zIndex: '1000',
          }}
        >
          {tooltip}
        </Tooltip>
      </>
    );
  };

  const status = renderStatus();

  return (
    <Input
      name={name}
      prefix={{ value: host ? `${host}/r/` : '', noPadding: true }}
      suffix={status ? { value: status } : undefined}
      label={TEXT.restaurantUrl}
      value={value}
      error={error}
      errorMessages={errorMessages}
      onChange={handleChange}
      onBlur={handleBlur}
      additionalInputProps={{
        'aria-autocomplete': 'none',
        autoComplete: 'off',
        disabled,
      }}
      required={required}
      showRequired={showRequired}
    />
  );
}
