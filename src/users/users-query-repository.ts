import { fetchPaginated } from '../helpers/fetchPaginated';
import { Collection } from 'mongodb';
import { db } from '../db/monogo-db';
import { UserDBType } from '../db/user-db-type';
import { QueryParams } from '../helpers/parseQuery';

const usersCollection: Collection<UserDBType> = db.collection<UserDBType>('users');

export const usersQueryRepository = {
  get: async (query: QueryParams) => {
    return fetchPaginated(usersCollection, query)
  }
}
