import { UserDBType } from '../db/user-db-type';

export const mapUser = (user: UserDBType) => {
  return { email: user.email, login: user.login, userId: user.id };
}
