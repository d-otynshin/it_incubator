import { usersRepository } from '../users/users-repository';
import { hash } from 'bcrypt';

export const authService = {
  login: async (loginOrEmail: string, password: string) => {
    const user = await usersRepository.findOne(loginOrEmail);

    if (!user) {
      return null;
    }

    const passwordHash = await hash(password, user.salt)

    return passwordHash === user.passwordHash;
  }
}
