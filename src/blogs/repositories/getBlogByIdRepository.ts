import { BlogDBType } from '../../db/blog-db-type';
import { Collection, WithId } from 'mongodb';
import { db } from '../../db/monogo-db';

export const getBlogByIdRepository = async (id: string): Promise<WithId<BlogDBType> | null> => {
  const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>('blogs');

  return blogCollection.findOne({ id })
}
