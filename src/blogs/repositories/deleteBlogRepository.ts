import { Collection } from 'mongodb';
import { BlogDBType } from '../../db/blog-db-type';
import { db } from '../../db/monogo-db';

export const deleteBlogRepository = async (id: string): Promise<boolean> => {
  const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>('blogs');
  const result = await blogCollection.deleteOne({ id })

  return result.deletedCount === 1;
}
