import { UserT } from '@/types/user.type';

export interface IUserResponse {
  user: UserT & {
    token: string;
  };
}
