import { db } from '../../db/db';
import { BlogDBType } from '../../db/blog-db-type';

export const getBlogsRepository = (): BlogDBType[] => {
  return db.blogs
}
