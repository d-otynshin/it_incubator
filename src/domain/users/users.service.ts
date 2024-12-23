import { genSalt, hash } from 'bcrypt';
import { generateRandomId } from '../../helpers';
import { usersRepository } from './users.repository';
import { UserDBType } from '../../db/user-db-type';

interface IUsersRepository {
  create(user: UserDBType): Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
}

type UserRegistrationType = {
  login: string;
  password: string;
  email: string;
}

type TCreateUserDTO = {
  id: string;
  email: string;
  login: string;
  createdAt: Date;
}

export class UsersService {
  constructor(private usersRepository: IUsersRepository) {}

  async create({ login, email, password }: UserRegistrationType): Promise<TCreateUserDTO | null> {
    const salt = await genSalt();
    const passwordHash = await hash(password, salt);
    const createdAt: Date = new Date();
    const id = generateRandomId().toString();

    const isCreated = await this.usersRepository.create(
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

    if (!isCreated) return null;

    return { createdAt, email, id, login }
  }

  async delete(id: string): Promise<boolean> {
    return this.usersRepository.delete(id);
  }
}

export const usersService = new UsersService(usersRepository as unknown as IUsersRepository);
