import { WithId } from 'mongodb';
import { BlogDBType } from '../../db/blog-db-type';
import { generateRandomId } from '../../helpers';
import { TBlogInput } from './types';
import { QueryParams } from '../../helpers/parseQuery';
import { fetchModelPaginated } from '../../helpers/fetchPaginated';
import { TPostInput } from '../posts/types';
import { PostDBType } from '../../db/post-db-type';
import { BlogModel } from './blogs.entity';
import { PostModel } from '../posts/posts.entity';

export const blogsRepository = {
  create: async (body: TBlogInput): Promise<WithId<BlogDBType>> => {
    const createdBlog: BlogDBType = {
      ...body,
      id: generateRandomId().toString(),
      createdAt: new Date().toISOString(),
      isMembership: false
    }

    await BlogModel.insertMany([createdBlog]);

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

    await PostModel.insertMany([createdPost])

    return createdPost as WithId<PostDBType>;
  },
  delete: async (id: string) => {
    const result = await BlogModel.deleteOne({ id })

    return result.deletedCount === 1;
  },
  getById: async (id: string): Promise<WithId<BlogDBType> | null> => {
    return BlogModel.findOne({ id })
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

    return fetchModelPaginated(BlogModel, query, filter)
  },
  getPosts: async (_: string, query: QueryParams) => {
    const filter: { blogId: string } | {} = {
      blogId: '',
      title: {
        $ne: 'post title',
      }
    };

    return fetchModelPaginated(PostModel, query, filter)
  },
  updateById: async (id: string, body: TBlogInput): Promise<boolean> => {
    const result = await BlogModel.updateOne({ id }, { $set: body })

    return result.matchedCount === 1;
  }
}
