export type MenuCategory = 'Burgers' | 'Sandwiches' | 'Pizza' | 'Sides' | 'Main dishes' | 'Drinks' | 'Desserts';

export type MenuItem = {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: MenuCategory;
};

export const categories = ['All', 'Burgers', 'Pizza', 'Sides', 'Drinks', 'Desserts', 'Main dishes'] as const;

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Classic Cheeseburger',
    description: 'Beef patty, cheddar cheese, lettuce, tomato, and house sauce.',
    price: 12.99,
    category: 'Burgers',
  },
  {
    id: 2,
    name: 'Crispy Chicken Sandwich',
    description: 'Fried chicken breast with pickles and spicy mayo.',
    price: 11.5,
    category: 'Sandwiches',
  },
  {
    id: 3,
    name: 'Loaded Fries',
    description: 'Fries topped with bacon, cheddar, and green onions.',
    price: 8.75,
    category: 'Sides',
  },
  {
    id: 4,
    name: 'Caesar Salad',
    description: 'Romaine lettuce, parmesan, croutons, and Caesar dressing.',
    price: 9.25,
    category: 'Main dishes',
  },
  {
    id: 5,
    name: 'BBQ Bacon Burger',
    description: 'Smoky BBQ sauce, crispy bacon, and onion rings.',
    price: 14.0,
    category: 'Burgers',
  },
  {
    id: 6,
    name: 'Margherita Pizza',
    description: 'Tomato sauce, mozzarella, and fresh basil.',
    price: 13.5,
    category: 'Pizza',
  },
  {
    id: 7,
    name: 'Mac and Cheese',
    description: 'Creamy cheddar mac topped with toasted breadcrumbs.',
    price: 10.0,
    category: 'Main dishes',
  },
  {
    id: 8,
    name: 'Chocolate Milkshake',
    price: 6.5,
    category: 'Drinks',
  },
  {
    id: 9,
    name: 'Veggie Wrap',
    description: 'Grilled vegetables, hummus, and spinach tortilla.',
    price: 9.99,
    category: 'Sandwiches',
  },
  {
    id: 10,
    name: 'Buffalo Wings',
    description: 'Spicy chicken wings served with ranch dip.',
    price: 12.25,
    category: 'Sides',
  },
  {
    id: 11,
    name: 'Pancake Stack',
    description: 'Three fluffy pancakes with maple syrup.',
    price: 8.5,
    category: 'Desserts',
  },
  {
    id: 12,
    name: 'Iced Coffee',
    price: 4.25,
    category: 'Drinks',
  },
  {
    id: 13,
    name: 'Grilled Salmon Plate',
    description: 'Salmon fillet served with rice and vegetables.',
    price: 18.75,
    category: 'Main dishes',
  },
  {
    id: 14,
    name: 'Mozzarella Sticks',
    description: 'Fried mozzarella with marinara sauce.',
    price: 7.95,
    category: 'Sides',
  },
  {
    id: 15,
    name: 'Strawberry Cheesecake',
    description: 'Creamy cheesecake topped with strawberry sauce.',
    price: 6.99,
    category: 'Desserts',
  },
];
