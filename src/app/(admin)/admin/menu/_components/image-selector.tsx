'use client';

import Image from 'next/image';
import { Check, ImageIcon } from 'lucide-react';
import { useEffect, useId, useRef, useState, type ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { TEXT } from '@/constants/text';
import { cn } from '@/utils/cn';
import { SegmentedButtonGroup } from './segmented-button-group';

const EXAMPLE_IMAGES = [
  '/menu/bacon-burger.jpg',
  '/menu/buffalo-wings.jpg',
  '/menu/caesar-salad.jpg',
  '/menu/cheeseburger.jpg',
  '/menu/chicken-sandwich.jpg',
  '/menu/chocolate-milkshake.jpg',
  '/menu/grilled-salmon.jpg',
  '/menu/iced-coffee.jpg',
  '/menu/loaded-fries.jpg',
  '/menu/mac-and-cheese.jpg',
  '/menu/mozzarella-sticks.jpg',
  '/menu/pancake-stack.jpg',
  '/menu/pizza-margherita.jpg',
  '/menu/strawberry-cheesecake.jpg',
  '/menu/veggie-wrap.jpg',
] as const;

type ImageSource = 'examples' | 'url';

type ImageSelectorProps = {
  value?: string;
  onChange(value: string | undefined): void;
};

function isExampleImage(value?: string) {
  return value !== undefined && EXAMPLE_IMAGES.includes(value as (typeof EXAMPLE_IMAGES)[number]);
}

export function ImageSelector({ value, onChange }: ImageSelectorProps) {
  const initialSource = isExampleImage(value) || !value ? 'examples' : 'url';

  const [source, setSource] = useState<ImageSource>(initialSource);
  const [selectedExample, setSelectedExample] = useState<string | undefined>(isExampleImage(value) ? value : undefined);
  const [url, setUrl] = useState(initialSource === 'url' ? (value ?? '') : '');
  const [hasPreviewError, setHasPreviewError] = useState(false);

  const urlInputId = useId();
  const lastEmittedValue = useRef(value);

  useEffect(() => {
    if (value === lastEmittedValue.current) return;

    lastEmittedValue.current = value;
    setHasPreviewError(false);

    if (isExampleImage(value)) {
      setSource('examples');
      setSelectedExample(value);
      setUrl('');
      return;
    }

    setSource(value ? 'url' : 'examples');
    setSelectedExample(undefined);
    setUrl(value ?? '');
  }, [value]);

  const updateValue = (nextValue: string | undefined) => {
    lastEmittedValue.current = nextValue;
    onChange(nextValue);
  };

  const handleSourceChange = (nextSource: ImageSource) => {
    if (nextSource === source) return;
    setSource(nextSource);

    if (nextSource === 'url') {
      window.requestAnimationFrame(() => document.getElementById(urlInputId)?.focus());
    }
  };

  const handleExampleSelect = (image: string) => {
    const nextImage = selectedExample === image ? undefined : image;

    setSelectedExample(nextImage);

    setUrl('');
    setHasPreviewError(false);

    updateValue(nextImage);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextUrl = event.target.value;

    setUrl(nextUrl);

    setSelectedExample(undefined);
    setHasPreviewError(false);

    updateValue(nextUrl || undefined);
  };

  const previewSource = hasPreviewError ? undefined : (selectedExample ?? url);

  return (
    <div className="grid gap-8 pb-6 md:grid-cols-[260px_minmax(0,1fr)] md:items-start">
      <div className="relative mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-sm md:mx-0 md:w-[260px]">
        {previewSource ? (
          <>
            <Image
              key={previewSource}
              src={previewSource}
              alt={TEXT.selectedMenuItemImage}
              fill
              unoptimized
              sizes="260px"
              className="object-cover"
              onLoad={() => setHasPreviewError(false)}
              onError={() => setHasPreviewError(true)}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_transparent_55%,_rgba(0,0,0,0.2)_100%)]" />
          </>
        ) : (
          <div className="flex aspect-square h-full w-full flex-col items-center justify-center gap-3 text-neutral-500">
            <ImageIcon aria-hidden="true" size={32} strokeWidth={1.5} />
            <span className="text-sm">{TEXT.menuItemImageNoImage}</span>
          </div>
        )}
      </div>
      <div className="flex h-[260px] min-w-0 flex-col space-y-4">
        <SegmentedButtonGroup
          className="w-full"
          ariaLabel={TEXT.menuItemImageImageSort}
          value={source}
          onChange={handleSourceChange}
          options={[
            { value: 'examples', label: TEXT.menuItemImageExampleImage },
            { value: 'url', label: TEXT.menuItemImageImageUrl },
          ]}
        />
        {source === 'examples' ? (
          <div className="min-h-0 overflow-y-auto rounded-lg border border-neutral-200 bg-white p-3 shadow-xs">
            <div className="grid grid-cols-3 justify-start gap-3 sm:grid-cols-4">
              {EXAMPLE_IMAGES.map((image) => {
                const isSelected = image === selectedExample;

                return (
                  <button
                    key={image}
                    type="button"
                    onClick={() => handleExampleSelect(image)}
                    aria-pressed={isSelected}
                    className={cn(
                      'focus-visible:ring-red-muted relative aspect-square overflow-hidden rounded-lg border bg-neutral-100 transition duration-150 hover:brightness-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none enabled:cursor-pointer',
                      isSelected ? 'border-red-muted ring-red-muted/30 ring-2' : 'border-transparent',
                    )}
                  >
                    <Image src={image} alt="Example menu item" fill sizes="auto" className="object-cover" />
                    {isSelected ? (
                      <span className="bg-red-muted absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full text-white shadow-xs">
                        <Check aria-hidden="true" size={13} strokeWidth={3} />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Input
              label=""
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={url}
              onChange={handleUrlChange}
              additionalInputProps={{ id: urlInputId, autoComplete: 'url' }}
            />
            <p className="text-sm text-neutral-500">{TEXT.menuItemImageUrlHelper}</p>
          </div>
        )}
      </div>
    </div>
  );
}
