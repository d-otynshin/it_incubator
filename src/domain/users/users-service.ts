import { genSalt, hash } from 'bcrypt';
import { usersRepository } from './users-repository';
import { generateRandomId } from '../../helpers';

export type UserRegistrationType = {
  login: string;
  password: string;
  email: string;
}

export const usersService = {
  create: async ({ login, email, password }: UserRegistrationType) => {
    const salt = await genSalt();
    const passwordHash = await hash(password, salt);
    const createdAt: Date = new Date();
    const id = generateRandomId().toString();

    const isCreated = await usersRepository.create(
      {
        salt,
        passwordHash,
        login,
        email,
        createdAt,
        id,
        emailConfirmation: {
          code: '',
          isConfirmed: true,
          expirationDate: new Date()
        }
      }
    );

    const createdUser = { createdAt, email, id, login }

    return isCreated ? createdUser : null;
  },
  delete: async (id: string) => {
    return usersRepository.delete(id);
  }
}
