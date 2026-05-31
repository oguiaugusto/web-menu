'use client';

import { createContext, useContext, useMemo, useState } from 'react';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem: CartContextType['addItem'] = (item, quantity) => {
    setItems((p) => {
      const existing = p.find((x) => x.id === item.id);

      if (existing) {
        return p.map((x) => (x.id === item.id ? { ...x, quantity: x.quantity + quantity } : x));
      }

      return [...p, { ...item, quantity }];
    });
  };

  const removeItem: CartContextType['removeItem'] = (id) => {
    setItems((p) => p.filter((x) => x.id !== id));
  };

  const updateQuantity: CartContextType['updateQuantity'] = (id, quantity) => {
    setItems((prev) =>
      prev.map((x) =>
        x.id === id
          ? { ...x, quantity }
          : x,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = useMemo(() => items.reduce((acc, curr) => acc + curr.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}
