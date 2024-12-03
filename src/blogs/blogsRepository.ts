import { Collection, WithId } from 'mongodb';
import { BlogDBType } from '../db/blog-db-type';
import { db } from '../db/monogo-db';
import { generateRandomId } from '../helpers';
import { TBlogInput } from './types';
import { QueryParams } from '../helpers/parseQuery';
import { fetchPaginated } from '../helpers/fetchPaginated';
import { TPostInput } from '../posts/types';
import { PostDBType } from '../db/post-db-type';

const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>('blogs');
const postsCollection: Collection<PostDBType> = db.collection<PostDBType>('posts');

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
  createPost: async (id: string, body: TPostInput): Promise<WithId<PostDBType> | null> => {
    const blog = await blogsRepository.getById(id)

    if (!blog) return null;

    const createdPost: PostDBType = {
      id: generateRandomId().toString(),
      createdAt: new Date().toISOString(),
      blogName: blog?.name,
      ...body,
    }

    await postsCollection.insertOne(createdPost)

    return createdPost as WithId<PostDBType>;
  },
  delete: async (id: string) => {
    const result = await blogCollection.deleteOne({ id })

    return result.deletedCount === 1;
  },
  getById: async (id: string): Promise<WithId<BlogDBType> | null> => {
    return blogCollection.findOne({ id })
  },
  get: async (query: QueryParams) => {
    let { searchNameTerm } = query;
    let filter: { searchNameTerm: string } | {} = {
      name: {
        $regex: searchNameTerm,
        $options: 'i'
      }
    };

    if (!searchNameTerm) {
      filter = {};
    }

    return fetchPaginated(blogCollection, query, filter)
  },
  getPosts: async (_: string, query: QueryParams) => {
    const filter: { blogId: string } | {} = { blogId: "" };

    return fetchPaginated(postsCollection, query, filter)
  },
  updateById: async (id: string, body: TBlogInput): Promise<boolean> => {
    const result = await blogCollection.updateOne({ id }, { $set: body })

    return result.matchedCount === 1;
  }
}
