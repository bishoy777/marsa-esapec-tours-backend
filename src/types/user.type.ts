import { User } from '@/users/entities/user.entity';
export type UserT = Omit<User, 'hashPassword'>;
