import { fetchModelPaginated } from '../../helpers/fetchPaginated';
import { WithId } from 'mongodb';
import { QueryParams } from '../../helpers/parseQuery';
import { UserModel } from './users.entity';
import { TUserDb } from './type';

type TFindUsers = Record<string, { $regex: string, $options: string }>

const mapUsersOutput = (paginatedUsers: any) => {
  const { items } = paginatedUsers;

  paginatedUsers.items = items.map((user: WithId<TUserDb>) => {
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

      const paginatedUsers = await fetchModelPaginated(UserModel, query, filter);

      return mapUsersOutput(paginatedUsers);
    } catch (error) {
      return null;
    }
  },
}
