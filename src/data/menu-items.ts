export type MenuItem = {
  id: number;
  name: string;
  description?: string;
  price: number;
};

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Classic Cheeseburger Classic Cheeseburger Classic Cheeseburger',
    description: 'Beef patty, cheddar cheese, lettuce, tomato, and house sauce.',
    price: 12.99,
  },
  {
    id: 2,
    name: 'Crispy Chicken Sandwich',
    description: 'Fried chicken breast with pickles and spicy mayo.',
    price: 11.5,
  },
  {
    id: 3,
    name: 'Loaded Fries',
    description: 'Fries topped with bacon, cheddar, and green onions.',
    price: 8.75,
  },
  {
    id: 4,
    name: 'Caesar Salad',
    description: 'Romaine lettuce, parmesan, croutons, and Caesar dressing.',
    price: 9.25,
  },
  {
    id: 5,
    name: 'BBQ Bacon Burger',
    description: 'Smoky BBQ sauce, crispy bacon, and onion rings.',
    price: 14.0,
  },
  {
    id: 6,
    name: 'Margherita Pizza',
    description: 'Tomato sauce, mozzarella, and fresh basil.',
    price: 13.5,
  },
  {
    id: 7,
    name: 'Mac and Cheese',
    description: 'Creamy cheddar mac topped with toasted breadcrumbs.',
    price: 10.0,
  },
  {
    id: 8,
    name: 'Chocolate Milkshake',
    price: 6.5,
  },
  {
    id: 9,
    name: 'Veggie Wrap',
    description: 'Grilled vegetables, hummus, and spinach tortilla.',
    price: 9.99,
  },
  {
    id: 10,
    name: 'Buffalo Wings',
    description: 'Spicy chicken wings served with ranch dip.',
    price: 12.25,
  },
  {
    id: 11,
    name: 'Pancake Stack',
    description: 'Three fluffy pancakes with maple syrup.',
    price: 8.5,
  },
  {
    id: 12,
    name: 'Iced Coffee',
    price: 4.25,
  },
  {
    id: 13,
    name: 'Grilled Salmon Plate',
    description: 'Salmon fillet served with rice and vegetables.',
    price: 18.75,
  },
  {
    id: 14,
    name: 'Mozzarella Sticks',
    description: 'Fried mozzarella with marinara sauce.',
    price: 7.95,
  },
  {
    id: 15,
    name: 'Strawberry Cheesecake',
    description: 'Creamy cheesecake topped with strawberry sauce.',
    price: 6.99,
  },
];
