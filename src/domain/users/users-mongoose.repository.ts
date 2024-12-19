import { UserDBType } from '../../db/user-db-type';
import { QueryParams } from '../../helpers/parseQuery';
import { fetchModelPaginated } from '../../helpers/fetchPaginated';
import { UserModel } from './users-entity';
import { UpdateWriteOpResult } from 'mongoose';
import { Collection } from 'mongodb';
import { db } from '../../db/monogo-db';

type TFindUsers = Record<string, { $regex: string, $options: string }>

const usersCollection: Collection<UserDBType> = db.collection<UserDBType>('users');


export const usersMongooseRepository = {
  create: async ({ login, passwordHash, salt, email, createdAt, id, emailConfirmation }: UserDBType) => {
    try {
      await UserModel.insertMany([{
        login,
        passwordHash,
        salt,
        email,
        createdAt,
        id,
        emailConfirmation
      }]);

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

      return fetchModelPaginated(UserModel, query, filter);
    } catch (error) {
      return null;
    }
  },
  getById: async (id: string) => {
    try {
      return UserModel.findOne({ id }).lean();
    } catch (error) {
      return null;
    }
  },
  findOne: async (loginOrEmail: string) => {
    try {
      return UserModel.findOne({
        $or: [
          { login: loginOrEmail },
          { email: loginOrEmail }
        ]
      }).lean();
    } catch (error) {
      return null;
    }
  },
  delete: async (id: string) => {
    try {
      const result = await UserModel.deleteOne({ id })

      return result.deletedCount === 1;
    } catch (error) {
      return false;
    }
  },
  setConfirmed: async (login: string) => {
    try {
      const result: UpdateWriteOpResult = await UserModel.updateOne({ login }, { $set: { 'emailConfirmation.isConfirmed': true } });

      return result.matchedCount === 1;
    } catch (error) {
      return false;
    }
  },
  setConfirmationCode: async (login: string, code: string) => {
    try {
      const result: UpdateWriteOpResult = await UserModel.updateOne({ login }, { $set:  { 'emailConfirmation.code': code } });

      return result.matchedCount === 1;
    } catch (error) {
      return false;
    }
  },
  setNewPassword: async (login: string, salt: string, passwordHash: string) => {
    try {
      const result: UpdateWriteOpResult = await UserModel.updateOne(
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
