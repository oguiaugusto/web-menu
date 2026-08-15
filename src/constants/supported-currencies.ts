export const SUPPORTED_CURRENCIES = [
  { value: 'BRL', label: 'Brazilian Real (R$)', locale: 'pt-BR' },
  { value: 'USD', label: 'US Dollar ($)', locale: 'en-US' },
  { value: 'EUR', label: 'Euro (€)', locale: 'de-DE' },
  { value: 'GBP', label: 'British Pound (£)', locale: 'en-GB' },
] as const;

export const DEFAULT_CURRENCY = 'USD';
