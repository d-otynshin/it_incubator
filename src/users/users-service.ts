import { genSalt, hash } from 'bcrypt';
import { usersRepository } from './users-repository';

export type UserRegistrationType = {
  login: string;
  password: string;
  email: string;
}

export const usersService = {
  create: async ({ login, email, password }: UserRegistrationType) => {
    const salt = await genSalt();
    const passwordHash = await hash(password, salt);

    return await usersRepository.create({ salt, passwordHash, login, email })
  },
  delete: async (id: string) => {
    return usersRepository.delete(id);
  }
}
