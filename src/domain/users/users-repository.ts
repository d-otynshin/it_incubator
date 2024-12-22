import { UserDBType } from '../../db/user-db-type';
import { QueryParams } from '../../helpers/parseQuery';
import { fetchPaginated } from '../../helpers/fetchPaginated';
import { Collection } from 'mongodb';
import { db } from '../../db/monogo-db';

type TFindUsers = Record<string, { $regex: string, $options: string }>

type TSetNewPassword = {
  login: string;
  salt: string;
  passwordHash: string;
}

const usersCollection: Collection<UserDBType> = db.collection<UserDBType>('users');

export interface IUsersRepository {
  create(user: UserDBType): Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
}

export const usersRepository = {
  create: async ({ login, passwordHash, salt, email, createdAt, id, emailConfirmation }: UserDBType) => {
    try {
      await usersCollection.insertOne({
        login,
        passwordHash,
        salt,
        email,
        createdAt,
        id,
        emailConfirmation
      });

      return true;
    } catch (error) {
      return false;
    }
  },
  get: async (query: QueryParams) => {
    try {
      const { searchLoginTerm, searchEmailTerm } = query;
      const filter: TFindUsers = {};

      if (searchLoginTerm) {
        filter.login = {
          $regex: searchLoginTerm,
          $options: 'i'
        }
      }

      if (searchEmailTerm) {
        filter.email = {
          $regex: searchEmailTerm,
          $options: 'i'
        }
      }

      return fetchPaginated(usersCollection, query, filter);
    } catch (error) {
      return null;
    }
  },
  getById: async (id: string) => {
    try {
      return usersCollection.findOne({ id });
    } catch (error) {
      return null;
    }
  },
  findOne: async (loginOrEmail: string) => {
    try {
      return usersCollection.findOne({
        $or: [
          { login: loginOrEmail },
          { email: loginOrEmail }
        ]
      })
    } catch (error) {
      return null;
    }
  },
  delete: async (id: string) => {
    try {
      const result = await usersCollection.deleteOne({ id })

      return result.deletedCount === 1;
    } catch (error) {
      return false;
    }
  },
  setConfirmed: async (login: string) => {
    try {
      const result = await usersCollection.updateOne({ login }, { $set: { 'emailConfirmation.isConfirmed': true } });

      return result.matchedCount === 1;
    } catch (error) {
      return false;
    }
  },
  setConfirmationCode: async (login: string, code: string) => {
    try {
      const result = await usersCollection.updateOne({ login }, { $set:  { 'emailConfirmation.code': code } });

      return result.matchedCount === 1;
    } catch (error) {
      return false;
    }
  },
  setNewPassword: async ({ login, salt, passwordHash }: TSetNewPassword) => {
    try {
      const result = await usersCollection.updateOne(
        { login },
        {
          $set: {
            salt,
            passwordHash,
          }
        }
      );

      return result.matchedCount === 1;
    } catch (error) {
      return false;
    }
  },
}
