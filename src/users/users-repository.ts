import { Collection } from 'mongodb';
import { db } from '../db/monogo-db';
import { UserDBType } from '../db/user-db-type';
import { QueryParams } from '../helpers/parseQuery';
import { fetchPaginated } from '../helpers/fetchPaginated';

type TFindUsers = Record<string, { $regex: string, $options: string }>

const usersCollection: Collection<UserDBType> = db.collection<UserDBType>('users');

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
  }
}
