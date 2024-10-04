import { db } from '../../db/db';
import { PostDBType } from '../../db/post-db-type';

export const getPostsRepository = (): PostDBType[] => {
  return db.posts
}
