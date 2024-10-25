import { db } from '../../db/db';
import { BlogDBType } from '../../db/blog-db-type';

export const getBlogByIdRepository = (id: string): BlogDBType | undefined => {
  const { blogs } = db;

  return blogs.find(b => b.id === id);
}
