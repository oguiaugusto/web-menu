import { useEffect, useState } from 'react';

export function useRestaurantOpen(slug: string) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchRestaurantOpen = async () => {
      const response = await fetch(`/api/r/${slug}/open`);
      if (!response.ok) return;

      const data = (await response.json()) as { open: boolean };
      setIsOpen(data.open);
    };

    fetchRestaurantOpen();
  }, [slug]);

  return isOpen;
}
