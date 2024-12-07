import { fetchPaginated } from '../helpers/fetchPaginated';
import { Collection, WithId } from 'mongodb';
import { db } from '../db/monogo-db';
import { UserDBType } from '../db/user-db-type';
import { QueryParams } from '../helpers/parseQuery';

type TFindUsers = Record<string, { $regex: string, $options: string }>

const usersCollection: Collection<UserDBType> = db.collection<UserDBType>('users');

export const usersQueryRepository = {
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

      const paginatedUsers = await fetchPaginated(usersCollection, query, filter);

      paginatedUsers.items = paginatedUsers.items.map((user: WithId<UserDBType>) => {
        return {
          id: user.id,
          createdAt: user.createdAt,
          login: user.login,
          email: user.email,
        }
      });

      return paginatedUsers;
    } catch (error) {
      return null;
    }
  },
}
