'use client';

import { PREFERRED_LOCALE_KEY } from '@/constants/local-storage';
import type { SupportedLanguage } from '@/constants/supported-languages';
import {
  getErrorMessages,
  getPaymentMethods,
  getText,
  resolvePreferredLocale,
  type ErrorMessages,
  type PaymentMethodLabels,
  type TranslationDictionary,
} from '@/i18n';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type LocaleContextType = {
  language: SupportedLanguage;
  text: TranslationDictionary;
  errorMessages: ErrorMessages;
  paymentMethods: PaymentMethodLabels;
  setPreferredLocale: (language: SupportedLanguage) => void;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    const browserLanguages = [navigator.languages?.[0] ?? navigator.language];
    setLanguage(resolvePreferredLocale(localStorage.getItem(PREFERRED_LOCALE_KEY), browserLanguages));
  }, []);

  const value = useMemo<LocaleContextType>(
    () => ({
      language,
      text: getText(language),
      errorMessages: getErrorMessages(language),
      paymentMethods: getPaymentMethods(language),
      setPreferredLocale(nextLanguage) {
        localStorage.setItem(PREFERRED_LOCALE_KEY, nextLanguage);
        setLanguage(nextLanguage);
      },
    }),
    [language],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) throw new Error('useLocale must be used within LocaleProvider');

  useEffect(() => {
    document.documentElement.lang = context.language;
  }, [context.language]);

  return context;
}
