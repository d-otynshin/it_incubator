import { fetchPaginated } from '../helpers/fetchPaginated';
import { Collection, WithId } from 'mongodb';
import { db } from '../db/monogo-db';
import { UserDBType } from '../db/user-db-type';
import { QueryParams } from '../helpers/parseQuery';

type TFindUsers = Record<string, { $regex: string, $options: string }>

const usersCollection: Collection<UserDBType> = db.collection<UserDBType>('users');

const mapUsersOutput = (paginatedUsers: any) => {
  const { items } = paginatedUsers;

  paginatedUsers.items = items.map((user: WithId<UserDBType>) => {
    return {
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      login: user.login,
    }
  });

  return paginatedUsers;
}

export const usersQueryRepository = {
  get: async (query: QueryParams) => {
    try {
      const { searchLoginTerm, searchEmailTerm } = query;
      let filter: TFindUsers | any = {};

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

      if (searchLoginTerm && searchEmailTerm) {
        filter = {
          $or: [
            { login: { $regex: searchLoginTerm, $options: "i" } },
            { email: { $regex: searchEmailTerm, $options: "i" } }
          ]
        }
      }

      const paginatedUsers = await fetchPaginated(usersCollection, query, filter);

      return mapUsersOutput(paginatedUsers);
    } catch (error) {
      return null;
    }
  },
}
