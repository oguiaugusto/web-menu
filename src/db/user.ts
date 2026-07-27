import { User } from '@/generated/prisma/client';
import { Restaurant } from './restaurant';

export type UserPublic = Omit<User, 'passwordHash'> & {
  restaurant: Restaurant;
};
