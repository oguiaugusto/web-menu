'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Radio } from '@/components/ui/radio';
import { Switch } from '@/components/ui/switch';
import { TextArea } from '@/components/ui/textarea';
import { CategoryInput } from './category-input';
import { TEXT } from '@/constants/text';
import { MenuItem } from '@/db/menu-item';
import { FieldErrors } from '@/types/misc';
import { getHandleChange } from '@/utils/getHandleChange';
import { formatMoney, moneyFormatter } from '@/utils/money';
import { ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = Readonly<{ mode: 'create' | 'edit'; item?: MenuItem; categories: string[] }>;
type ImageSource = 'example' | 'url';

export function MenuItemForm({ mode, item, categories }: Props) {
  const router = useRouter();

  const editMode = mode === 'edit';
  if (editMode && !item) router.replace('/admin/menu/new');

  const [fields, setFields] = useState({
    name: item ? item.name : '',
    price: item ? item.price : 0,
    description: item ? (item.description ?? '') : '',
    category: item ? item.category : '',
    available: item ? item.available : true,
    imageUrl: item ? item.imageUrl : '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [imageSource, setImageSource] = useState<ImageSource>('example');

  const handleChange = getHandleChange(setFields, setFieldErrors);
  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((p) => ({ ...p, [e.target.name]: formatMoney(e.target.value) }));
    setFieldErrors((p) => {
      const next = { ...p };
      delete next[e.target.name];
      return next;
    });
  };
  const handleCategoryChange = (category: string) => {
    setFields((p) => ({ ...p, category }));
    setFieldErrors((p) => {
      const next = { ...p };
      delete next.category;
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            {!editMode ? TEXT.menuItemFormTitleNew : TEXT.menuItemFormTitleEdit}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            {!editMode ? TEXT.menuItemFormSubtitleNew : TEXT.menuItemFormSubtitleEdit}
          </p>
        </div>
        <form className="space-y-12">
          <section className="space-y-6">
            <h2 id="general-information-heading" className="text-lg font-semibold text-neutral-900">
              {TEXT.generalInformation}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label={TEXT.name}
                name="name"
                placeholder={TEXT.menuItemNamePlaceholder}
                value={fields.name}
                onChange={handleChange}
                additionalInputProps={{ autoComplete: 'off' }}
              />
              <Input
                type="text"
                label={TEXT.price}
                name="price"
                prefix={{ value: '$' }}
                value={moneyFormatter.format(fields.price)}
                onChange={handleMoneyChange}
              />
            </div>
            <TextArea
              label={TEXT.description}
              name="description"
              rows={4}
              placeholder={TEXT.menuItemDescriptionPlaceholder}
              value={fields.description}
              onChange={handleChange}
            />
            <div className="grid gap-3 sm:grid-cols-2 sm:items-start">
              <CategoryInput
                label={TEXT.category}
                value={fields.category}
                onChange={handleCategoryChange}
                categories={categories}
                placeholder={TEXT.selectOrCreateCategory}
                error={fieldErrors.category}
              />
              <div className="space-y-2">
                <span className="text-sm font-medium text-neutral-900">{TEXT.available}</span>
                <Switch
                  name="available"
                  rightLabel={TEXT.availableToCustomers}
                  checked={fields.available}
                  onChange={handleChange}
                />
                <p className="text-sm text-neutral-500">{TEXT.menuItemAvailableHelper}</p>
              </div>
            </div>
          </section>
          <section className="space-y-6">
            <div>
              <h2 id="image-heading" className="text-lg font-semibold text-neutral-900">
                {TEXT.image}
              </h2>
              <p className="mt-1 text-sm text-neutral-500">{TEXT.menuItemImageSubtitle}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-[260px_minmax(0,1fr)] md:items-start">
              <div className="mx-auto flex aspect-square w-full max-w-[260px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 text-center md:mx-0 md:w-[260px]">
                <div className="flex flex-col items-center gap-3 text-neutral-500">
                  <ImageIcon aria-hidden="true" size={32} strokeWidth={1.5} />
                  <span className="text-sm">{TEXT.menuItemImageNoImage}</span>
                </div>
              </div>
              <fieldset className="min-w-0 space-y-5">
                <legend className="text-sm font-medium text-neutral-900">{TEXT.menuItemImageSubtitle}</legend>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  <Radio
                    label={TEXT.menuItemImageExampleImage}
                    name="image-source"
                    value="example"
                    checked={imageSource}
                    onChange={() => setImageSource('example')}
                  />
                  <Radio
                    label={TEXT.menuItemImageImageUrl}
                    name="image-source"
                    value="url"
                    checked={imageSource}
                    onChange={() => setImageSource('url')}
                  />
                </div>
                {imageSource === 'example' ? (
                  <div className="flex min-h-28 items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white px-4 text-center text-sm text-neutral-500">
                    Example image selector
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Input label="" name="image-url" type="url" placeholder="https://example.com/image.jpg" />
                    <p className="text-sm text-neutral-500">{TEXT.menuItemImageUrlHelper}</p>
                  </div>
                )}
              </fieldset>
            </div>
          </section>
          <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:justify-end">
            <Button type="button" variant="primary-outline" className="w-full sm:w-auto">
              {TEXT.cancel}
            </Button>
            <Button type="button" variant="primary" className="w-full sm:w-auto">
              {TEXT.createMenuItem}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
