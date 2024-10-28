import { BlogDBType } from '../../db/blog-db-type';
import { Collection } from 'mongodb';
import { db } from '../../db/monogo-db';

export const getBlogsRepository = async (): Promise<BlogDBType[]> => {
  const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>('blogs');

  return blogCollection.find({}).toArray()
}
