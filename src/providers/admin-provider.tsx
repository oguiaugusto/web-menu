'use client';

import { Restaurant } from '@/db/restaurant';
import { PREFERRED_LOCALE_KEY } from '@/constants/local-storage';
import { DEFAULT_LANGUAGE } from '@/constants/supported-languages';
import { getErrorMessages, getPaymentMethods, getText, normalizeLocale } from '@/i18n';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';

type AdminContextType = {
  restaurant: Restaurant;
  setRestaurant: Dispatch<SetStateAction<Restaurant>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  text: ReturnType<typeof getText>;
  errorMessages: ReturnType<typeof getErrorMessages>;
  paymentMethods: ReturnType<typeof getPaymentMethods>;
};

const AdminContext = createContext<AdminContextType | null>(null);

type Props = Readonly<{
  children: React.ReactNode;
  restaurant: Restaurant;
}>;

export function AdminProvider({ children, restaurant }: Props) {
  const [currentRestaurant, setRestaurant] = useState(restaurant);
  const [isOpen, setIsOpen] = useState(restaurant.open);

  useEffect(() => {
    const language = normalizeLocale(currentRestaurant.language) ?? DEFAULT_LANGUAGE;
    localStorage.setItem(PREFERRED_LOCALE_KEY, language);
    document.documentElement.lang = language;
  }, [currentRestaurant.language]);

  const value = useMemo(
    () => ({
      restaurant: currentRestaurant,
      setRestaurant,
      isOpen,
      setIsOpen,
      text: getText(currentRestaurant.language),
      errorMessages: getErrorMessages(currentRestaurant.language),
      paymentMethods: getPaymentMethods(currentRestaurant.language),
    }),
    [currentRestaurant, isOpen],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }

  return context;
}
