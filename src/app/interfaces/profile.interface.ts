import { User } from './user.interface';

export interface Profile {
  id: User['id'];
  avatar_url: string; // >= 3, <= 300, /^https?://.+$/
  username: string; // >= 3, <= 30
  created_at: string;
  updated_at: string;
}
