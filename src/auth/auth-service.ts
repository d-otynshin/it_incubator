import { usersRepository } from '../users/users-repository';
import { hash } from 'bcrypt';
import { jwtService } from '../adapters/jwt-service';

export const authService = {
  checkCredentials: async (loginOrEmail: string, password: string) => {
    const user = await usersRepository.findOne(loginOrEmail);

    if (!user) {
      return null;
    }

    const passwordHash = await hash(password, user.salt)

    const isCorrect = passwordHash === user.passwordHash;

    return isCorrect ? user : null;
  },
  login: async (loginOrEmail: string, password: string) => {
    const user = await authService.checkCredentials(loginOrEmail, password);

    if (!user) {
      return null;
    }

    return jwtService.createToken(user.id);
  },
}
