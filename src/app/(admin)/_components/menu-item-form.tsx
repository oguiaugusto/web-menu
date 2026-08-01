'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { TextArea } from '@/components/ui/textarea';
import { CategoryInput } from './category-input';
import { ImageSelector } from './image-selector';
import { TEXT } from '@/constants/text';
import { MenuItem } from '@/db/menu-item';
import { FieldErrors } from '@/types/misc';
import { getHandleChange } from '@/utils/getHandleChange';
import { formatMoney, moneyFormatter } from '@/utils/money';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = Readonly<{ mode: 'create' | 'edit'; item?: MenuItem; categories: string[] }>;

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
  const handleImageChange = (imageUrl: string | undefined) => {
    setFields((p) => ({ ...p, imageUrl: imageUrl ?? '' }));
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
            <ImageSelector value={fields.imageUrl || undefined} onChange={handleImageChange} />
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
