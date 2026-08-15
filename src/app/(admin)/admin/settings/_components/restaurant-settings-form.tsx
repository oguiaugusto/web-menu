'use client';

import { updateRestaurantSettings } from '@/actions/restaurant';
import { RestaurantSlugInput } from '@/components/restaurant-slug-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { SUPPORTED_CURRENCIES } from '@/constants/supported-currencies';
import { SUPPORTED_LANGUAGES } from '@/constants/supported-languages';
import { Restaurant } from '@/db/restaurant';
import { FieldErrors } from '@/types/misc';
import { getHandleChange } from '@/utils/getHandleChange';
import { handleSubmitError } from '@/utils/handle-submit-error';
import { formatMoneyInput, getCurrencySymbol, getMoneyFormatter } from '@/utils/money';
import { toastSuccess } from '@/utils/toast';
import { useAdmin } from '@/providers/admin-provider';
import { useState } from 'react';
import { StatusSection } from './status-section';
import { getText } from '@/i18n';
import { useRouter } from 'next/navigation';

type Props = Readonly<{
  restaurant: Restaurant;
  email: string;
}>;

export function RestaurantSettingsForm({ restaurant, email }: Props) {
  const router = useRouter();
  const { setRestaurant, text: TEXT, errorMessages } = useAdmin();

  const [fields, setFields] = useState({
    name: restaurant.name,
    slug: restaurant.slug,
    language: restaurant.language,
    currency: restaurant.currency,
    deliveryFee: restaurant.deliveryFee ?? 0,
    openingHours: restaurant.openingHours ?? '',
    contact: restaurant.contact ?? '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = getHandleChange(setFields, setFieldErrors);
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((p) => ({ ...p, deliveryFee: Number(formatMoneyInput(e.target.value)) }));
    setFieldErrors((p) => {
      const next = { ...p };
      delete next.deliveryFee;
      return next;
    });
  };
  const handleSlugChange = (slug: string) => {
    setFields((p) => ({ ...p, slug }));
    setFieldErrors((p) => {
      const next = { ...p };
      delete next.slug;
      return next;
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await updateRestaurantSettings(fields);
      if (!result.success) return handleSubmitError(result, setFieldErrors, errorMessages);

      setFields((p) => ({
        ...p,
        ...result.restaurant,
        deliveryFee: result.restaurant.deliveryFee ?? 0,
        openingHours: result.restaurant.openingHours ?? '',
        contact: result.restaurant.contact ?? '',
      }));
      setRestaurant((p) => ({
        ...p,
        name: result.restaurant.name,
        slug: result.restaurant.slug,
        language: result.restaurant.language,
        currency: result.restaurant.currency,
        deliveryFee: result.restaurant.deliveryFee,
        openingHours: result.restaurant.openingHours,
        contact: result.restaurant.contact,
      }));

      toastSuccess(getText(result.restaurant.language).restaurantSettingsSaved, { position: 'bottom-center' });
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugChanged = fields.slug !== restaurant.slug;
  const disableSubmit = fields.name.length < 1 || fields.slug.length < 1 || isSubmitting;

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">{TEXT.restaurantSettingsTitle}</h1>
          <p className="mt-2 text-sm text-neutral-500">{TEXT.restaurantSettingsSubtitle}</p>
        </div>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <StatusSection />
          <section className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-neutral-900">{TEXT.restaurantDetails}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Input
                name="name"
                label={TEXT.restaurantName}
                value={fields.name}
                error={fieldErrors.name}
                errorMessages={errorMessages}
                onChange={handleChange}
                required
                showRequired
              />
              <div>
                <RestaurantSlugInput
                  name="slug"
                  value={fields.slug}
                  currentSlug={restaurant.slug}
                  error={fieldErrors.slug}
                  errorMessages={errorMessages}
                  text={TEXT}
                  onChange={handleSlugChange}
                  required
                  showRequired
                />
                {slugChanged && !fieldErrors.slug ? (
                  <p className="mt-1 text-left text-xs tracking-tight text-amber-700">
                    {TEXT.restaurantUrlChangeWarning}
                  </p>
                ) : null}
              </div>
              <Select
                name="language"
                label={TEXT.language}
                options={[...SUPPORTED_LANGUAGES]}
                value={fields.language}
                error={fieldErrors.language}
                errorMessages={errorMessages}
                onChange={handleChange}
                required
                showRequired
              />
              <Select
                name="currency"
                label={TEXT.currencyLabel}
                options={[...SUPPORTED_CURRENCIES]}
                value={fields.currency}
                error={fieldErrors.currency}
                errorMessages={errorMessages}
                onChange={handleChange}
                required
                showRequired
              />
            </div>
          </section>
          <section className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-neutral-900">{TEXT.ordering}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Input
                name="deliveryFee"
                label={TEXT.deliveryFee}
                prefix={{ value: getCurrencySymbol(fields.currency) }}
                value={getMoneyFormatter(fields.currency).format(fields.deliveryFee)}
                error={fieldErrors.deliveryFee}
                errorMessages={errorMessages}
                onChange={handleCurrencyChange}
                additionalInputProps={{ inputMode: 'decimal' }}
                required
                showRequired
              />
              <div />
              <Input
                name="openingHours"
                label={TEXT.openingHours}
                value={fields.openingHours}
                error={fieldErrors.openingHours}
                errorMessages={errorMessages}
                onChange={handleChange}
              />
              <Input
                name="contact"
                label={TEXT.contact}
                value={fields.contact}
                error={fieldErrors.contact}
                errorMessages={errorMessages}
                onChange={handleChange}
              />
            </div>
          </section>
          <section className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-neutral-900">{TEXT.account}</h2>
            <p className="mt-1 text-sm text-neutral-500">{TEXT.accountDescription}</p>
            <div className="mt-5 max-w-md">
              <Input
                label={TEXT.email}
                value={email}
                errorMessages={errorMessages}
                additionalInputProps={{ disabled: true }}
              />
            </div>
          </section>
          <div className="flex justify-end border-t border-neutral-200 pt-6">
            <Button type="submit" variant="primary" disabled={disableSubmit}>
              {TEXT.saveChanges}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
