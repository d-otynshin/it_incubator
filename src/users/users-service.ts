import { genSalt, hash } from 'bcrypt';
import { usersRepository } from './users-repository';
import { generateRandomId } from '../helpers';

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

    return usersRepository.create({ salt, passwordHash, login, email, createdAt, id });
  },
  delete: async (id: string) => {
    return usersRepository.delete(id);
  }
}
