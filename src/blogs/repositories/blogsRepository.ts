import { Collection } from 'mongodb';
import { BlogDBType } from '../../db/blog-db-type';
import { db } from '../../db/monogo-db';
import { generateRandomId } from '../../helpers';
import { TBlogInput } from '../types';

const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>('blogs');

export const blogsRepository = {
  create: async (body: TBlogInput) => {
    const createdBlog: BlogDBType = {
      ...body,
      id: generateRandomId().toString(),
      createdAt: new Date().toISOString(),
      isMembership: true
    }

    await blogCollection.insertOne(createdBlog);

    return createdBlog
  },
  delete: async (id: string) => {
    const result = await blogCollection.deleteOne({ id })

    return result.deletedCount === 1;
  }
}
