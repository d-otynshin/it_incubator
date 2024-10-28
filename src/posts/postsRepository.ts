import { getBlogByIdRepository } from '../blogs/repositories/getBlogByIdRepository';
import { PostDBType } from '../db/post-db-type';
import { generateRandomId } from '../helpers';
import { TPostInput } from './types';
import { Collection } from 'mongodb';
import { db } from '../db/monogo-db';

const postsCollection: Collection<PostDBType> = db.collection<PostDBType>('posts');

export const postsRepository = {
  create: async (body: TPostInput): Promise<PostDBType | null> => {
    const blog = await getBlogByIdRepository(body.blogId)

    if (!blog) return null;

    const createdPost: PostDBType = {
      id: generateRandomId().toString(),
      createdAt: new Date().toISOString(),
      blogName: blog?.name,
      ...body,
    }

    await postsCollection.insertOne(createdPost)

    return createdPost
  },
  delete: async (id: string): Promise<boolean> => {
    const result = await postsCollection.deleteOne({ id })

    return result.deletedCount === 1;
  },
  getById: async (id: string): Promise<PostDBType | null> => {
    return postsCollection.findOne({ id })
  },
  getByBlogId: async (blogId: string): Promise<PostDBType | null> => {
    return postsCollection.findOne({ blogId })
  },
  get: async () => {
    return postsCollection.find({}).toArray()
  },
  update: async (id: string, body: TPostInput): Promise<boolean> => {
    const result = await postsCollection.updateOne({ id }, body)

    return result.matchedCount === 1;
  }
}
