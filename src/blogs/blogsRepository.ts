import { Collection, WithId } from 'mongodb';
import { BlogDBType } from '../db/blog-db-type';
import { db } from '../db/monogo-db';
import { generateRandomId } from '../helpers';
import { TBlogInput } from './types';

const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>('blogs');

export const blogsRepository = {
  create: async (body: TBlogInput): Promise<WithId<BlogDBType>> => {
    const createdBlog: BlogDBType = {
      ...body,
      id: generateRandomId().toString(),
      createdAt: new Date().toISOString(),
      isMembership: false
    }

    await blogCollection.insertOne(createdBlog);

    return createdBlog as WithId<BlogDBType>;
  },
  delete: async (id: string) => {
    const result = await blogCollection.deleteOne({ id })

    return result.deletedCount === 1;
  },
  getById: async (id: string): Promise<WithId<BlogDBType> | null> => {
    return blogCollection.findOne({ id })
  },
  get: async (): Promise<BlogDBType[]> => {
    return blogCollection.find({}, { projection: {  _id: 0 } }).toArray()
  },
  updateById: async (id: string, body: TBlogInput): Promise<boolean> => {
    const result = await blogCollection.updateOne({ id }, body)

    return result.matchedCount === 1;
  }
}