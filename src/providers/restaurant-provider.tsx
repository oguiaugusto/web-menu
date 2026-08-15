'use client';

import { PublicRestaurant, Restaurant } from '@/db/restaurant';
import { PREFERRED_LOCALE_KEY } from '@/constants/local-storage';
import { DEFAULT_LANGUAGE } from '@/constants/supported-languages';
import { getErrorMessages, getPaymentMethods, getText, normalizeLocale } from '@/i18n';
import { createContext, useContext, useEffect, useMemo } from 'react';

type RestaurantContextType = PublicRestaurant & {
  text: ReturnType<typeof getText>;
  errorMessages: ReturnType<typeof getErrorMessages>;
  paymentMethods: ReturnType<typeof getPaymentMethods>;
};

const RestaurantContext = createContext<RestaurantContextType | null>(null);

type Props = Readonly<{
  children: React.ReactNode;
  restaurant: Restaurant;
}>;

export function RestaurantProvider({ children, restaurant }: Props) {
  useEffect(() => {
    const language = normalizeLocale(restaurant.language) ?? DEFAULT_LANGUAGE;
    localStorage.setItem(PREFERRED_LOCALE_KEY, language);
    document.documentElement.lang = language;
  }, [restaurant.language]);

  const value = useMemo(
    () => ({
      id: restaurant.id,
      name: restaurant.name,
      slug: restaurant.slug,
      language: restaurant.language,
      currency: restaurant.currency,
      deliveryFee: restaurant.deliveryFee,
      openingHours: restaurant.openingHours,
      contact: restaurant.contact,
      open: restaurant.open,
      text: getText(restaurant.language),
      errorMessages: getErrorMessages(restaurant.language),
      paymentMethods: getPaymentMethods(restaurant.language),
    }),
    [restaurant],
  );

  return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);

  if (!context) {
    throw new Error('useRestaurant must be used within RestaurantProvider');
  }

  return context;
}
