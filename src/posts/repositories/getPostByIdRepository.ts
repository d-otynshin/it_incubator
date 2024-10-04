import { db } from '../../db/db';
import { BlogDBType } from '../../db/blog-db-type';

export const getPostByIdRepository = (id: string): BlogDBType | undefined => {
  const blogs = db.blogs;

  return blogs.find(p => p.id === id);
}
