'use client';

import { CART_KEY } from '@/constants/local-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

type Props = Readonly<{
  children: React.ReactNode;
  slug: string;
}>;

export function CartProvider({ children, slug }: Props) {
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
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, quantity } : x)));
  };

  const clearCart = () => setItems([]);

  const itemCount = useMemo(() => items.reduce((acc, curr) => acc + curr.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0), [items]);

  useEffect(() => {
    const saved = localStorage.getItem(`${CART_KEY}:${slug}`);

    if (!saved) return;

    setItems(JSON.parse(saved));
  }, [slug]);

  useEffect(() => {
    localStorage.setItem(`${CART_KEY}:${slug}`, JSON.stringify(items));
  }, [items, slug]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
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
