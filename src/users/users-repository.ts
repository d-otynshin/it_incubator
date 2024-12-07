import { Collection } from 'mongodb';
import { db } from '../db/monogo-db';
import { UserDBType } from '../db/user-db-type';
import { QueryParams } from '../helpers/parseQuery';
import { fetchPaginated } from '../helpers/fetchPaginated';
import { generateRandomId } from '../helpers';

type TFindUsers = Record<string, { $regex: string, $options: string }>

const usersCollection: Collection<UserDBType> = db.collection<UserDBType>('users');

export const usersRepository = {
  create: async ({ login, passwordHash, salt, email }: UserDBType) => {
    try {
      const createdUser = {
        login,
        passwordHash,
        salt,
        email,
        createdAt: new Date(),
        id: generateRandomId().toString(),
      }
      await usersCollection.insertOne(createdUser);

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
  findOne: async (loginOrEmail: string) => {
    try {
      return usersCollection.findOne({
        $or: [
          { login: loginOrEmail },
          { email: loginOrEmail }
        ]
      });
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
  }
}
