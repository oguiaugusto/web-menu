'use client';

import { Restaurant } from '@/db/restaurant';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type AdminContextType = {
  restaurant: Restaurant;
  setRestaurant: Dispatch<SetStateAction<Restaurant>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const AdminContext = createContext<AdminContextType | null>(null);

type Props = Readonly<{
  children: React.ReactNode;
  restaurant: Restaurant;
}>;

export function AdminProvider({ children, restaurant }: Props) {
  const [currentRestaurant, setRestaurant] = useState(restaurant);
  const [isOpen, setIsOpen] = useState(restaurant.open);

  return (
    <AdminContext.Provider value={{ restaurant: currentRestaurant, setRestaurant, isOpen, setIsOpen }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }

  return context;
}
