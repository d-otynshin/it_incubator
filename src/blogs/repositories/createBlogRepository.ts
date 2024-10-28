import { BlogDBType } from '../../db/blog-db-type';
import { generateRandomId } from '../../helpers';
import { TBlogInput } from '../types';
import { Collection } from 'mongodb';
import { db } from '../../db/monogo-db';

const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>('blogs');

export const createBlogRepository = async (body: TBlogInput) => {
  const createdBlog: BlogDBType = {
    ...body,
    id: generateRandomId().toString(),
    createdAt: new Date().toISOString(),
    isMembership: true
  }

  await blogCollection.insertOne(createdBlog);

  return createdBlog
}
