import { User } from './user.model';

export interface Users {
  user: User
  permissions: String[]
  roles: String[]
}
