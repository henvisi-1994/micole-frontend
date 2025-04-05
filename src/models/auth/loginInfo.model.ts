import { UserById } from './../user/userById.model';
import { SchoolById } from 'src/models/school/schoolById.model';
import { School } from './../school/school.model';
import { User } from './../user/user.model';
export interface LoginInfo {
  user: UserById
  school?: SchoolById
  permissions: String[]
  roles: String[]
}
