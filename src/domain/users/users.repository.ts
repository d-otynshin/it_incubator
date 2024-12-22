import { UserDBType } from '../../db/user-db-type';
import { QueryParams } from '../../helpers/parseQuery';
import { fetchModelPaginated } from '../../helpers/fetchPaginated';
import { UserModel } from './users.entity';
import { UpdateWriteOpResult } from 'mongoose';

type TFindUsers = Record<string, { $regex: string, $options: string }>

type TNewPassword = {
  login: string;
  passwordHash: string;
  salt: string;
}

export class UsersRepository {
  constructor(private readonly userModel: typeof UserModel) {}

  async create({ login, passwordHash, salt, email, createdAt, id, emailConfirmation }: UserDBType) {
    try {
      await this.userModel.insertMany([{
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
  }
  async get(query: QueryParams) {
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

      return fetchModelPaginated(this.userModel.bind(this.userModel), query, filter);
    } catch (error) {
      return null;
    }
  }
  async getById(id: string) {
    try {
      return this.userModel.findOne({ id }).lean();
    } catch (error) {
      return null;
    }
  }
  async findOne (loginOrEmail: string) {
    try {
      return this.userModel.findOne({
        $or: [
          { login: loginOrEmail },
          { email: loginOrEmail }
        ]
      }).lean();
    } catch (error) {
      return null;
    }
  }
  async delete(id: string) {
    try {
      const result = await this.userModel.deleteOne({ id })

      return result.deletedCount === 1;
    } catch (error) {
      return false;
    }
  }
  async setConfirmed(login: string) {
    try {
      const result: UpdateWriteOpResult = await this.userModel.updateOne({ login }, { $set: { 'emailConfirmation.isConfirmed': true } });

      return result.matchedCount === 1;
    } catch (error) {
      return false;
    }
  }
  async setConfirmationCode (login: string, code: string) {
    try {
      const result: UpdateWriteOpResult = await this.userModel.updateOne({ login }, { $set:  { 'emailConfirmation.code': code } });

      return result.matchedCount === 1;
    } catch (error) {
      return false;
    }
  }
  async setNewPassword({ login, salt, passwordHash }: TNewPassword) {
    try {
      const result: UpdateWriteOpResult = await this.userModel.updateOne(
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
  }
}

export const usersRepository = new UsersRepository(UserModel)
