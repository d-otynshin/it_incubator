import { PostDBType } from '../db/post-db-type';
import { generateRandomId } from '../helpers';
import { TPostInput } from './types';
import { Collection, WithId } from 'mongodb';
import { db } from '../db/monogo-db';
import { blogsRepository } from '../blogs/blogsRepository';
import { fetchPaginated } from '../helpers/fetchPaginated';
import { QueryParams } from '../helpers/parseQuery';
import { BlogDBType } from '../db/blog-db-type';

const postsCollection: Collection<PostDBType> = db.collection<PostDBType>('posts');

export const postsRepository = {
  create: async (body: TPostInput): Promise<WithId<PostDBType> | null> => {
    let blog = await blogsRepository.getById(body.blogId)

    if (!blog) {
      blog = { name: 'blog name' } as WithId<BlogDBType>
    }

    const createdPost: PostDBType = {
      id: generateRandomId().toString(),
      createdAt: new Date().toISOString(),
      blogName: blog?.name,
      ...body,
    }

    await postsCollection.insertOne(createdPost)

    return createdPost as WithId<PostDBType>;
  },
  delete: async (id: string): Promise<boolean> => {
    const result = await postsCollection.deleteOne({ id })

    return result.deletedCount === 1;
  },
  getById: async (id: string): Promise<WithId<PostDBType> | null> => {
    return postsCollection.findOne({ id })
  },
  getByBlogId: async (blogId: string): Promise<PostDBType | null> => {
    return postsCollection.findOne({ blogId })
  },
  get: async (query: QueryParams) => {
    return fetchPaginated(postsCollection, query)
  },
  update: async (id: string, body: TPostInput): Promise<boolean> => {
    const result = await postsCollection.updateOne({ id }, { $set: body })

    return result.matchedCount === 1;
  }
}
