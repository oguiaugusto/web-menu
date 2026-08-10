'use client';

import { PublicRestaurant, Restaurant } from '@/db/restaurant';
import { createContext, useContext } from 'react';

const RestaurantContext = createContext<PublicRestaurant | null>(null);

type Props = Readonly<{
  children: React.ReactNode;
  restaurant: Restaurant;
}>;

export function RestaurantProvider({ children, restaurant }: Props) {
  return (
    <RestaurantContext.Provider
      value={{
        id: restaurant.id,
        name: restaurant.name,
        slug: restaurant.slug,
        language: restaurant.language,
        currency: restaurant.currency,
        deliveryFee: restaurant.deliveryFee,
        openingHours: restaurant.openingHours,
        contact: restaurant.contact,
        open: restaurant.open,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);

  if (!context) {
    throw new Error('useRestaurant must be used within RestaurantProvider');
  }

  return context;
}
