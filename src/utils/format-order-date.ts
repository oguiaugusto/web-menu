export function formatOrderDate(value: string | Date, language: string) {
  return new Intl.DateTimeFormat(language, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}
