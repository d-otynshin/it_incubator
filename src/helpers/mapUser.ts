import { TUserDb } from '../domain/users/type';

export const mapUser = (user: TUserDb) => {
  return { email: user.email, login: user.login, userId: user.id };
}
