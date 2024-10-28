import { TBlogInput } from '../types';
import { Collection } from 'mongodb';
import { BlogDBType } from '../../db/blog-db-type';
import { db } from '../../db/monogo-db';

export const updateBlogRepository = async (id: string, body: TBlogInput) => {
  const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>('blogs');
  const result = await blogCollection.updateOne({ id }, body)

  return result.matchedCount === 1;
}
