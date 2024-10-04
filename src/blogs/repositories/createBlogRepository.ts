import { db } from '../../db/db';
import { BlogDBType } from '../../db/blog-db-type';
import { generateRandomId } from '../../helpers';
import { TBlogInput } from '../types';

export const createBlogRepository = (body: TBlogInput) => {
  const createdBlog: BlogDBType = {
    id: generateRandomId().toString(),
    ...body,
  }

  db.blogs = [...db.blogs, createdBlog]

  return createdBlog
}
