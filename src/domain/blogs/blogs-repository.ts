import { WithId } from 'mongodb';
import { generateRandomId } from '../../helpers';
import { QueryParams } from '../../helpers/parseQuery';
import { fetchModelPaginated } from '../../helpers/fetchPaginated';
import { TBlogDb, TBlogDto } from './blogs.entity';
import { TPostDb, TPostDto } from '../posts/posts.entity';
import { BlogModel, PostModel } from '../../db';

export const blogsRepository = {
  create: async (body: TBlogDto): Promise<WithId<TBlogDb>> => {
    const createdBlog: TBlogDb = {
      ...body,
      id: generateRandomId().toString(),
      createdAt: new Date().toISOString() as unknown as Date,
      isMembership: false
    }

    await BlogModel.insertMany([createdBlog]);

    return createdBlog as WithId<TBlogDb>;
  },
  createPost: async (id: string, body: TPostDto): Promise<WithId<TPostDb> | null> => {
    const blog = await blogsRepository.getById(id)

    if (!blog) return null;

    const createdPost: TPostDb = {
      id: generateRandomId().toString(),
      createdAt: new Date().toISOString() as unknown as Date,
      blogName: blog?.name,
      ...body,
    }

    await PostModel.insertMany([createdPost])

    return createdPost as WithId<TPostDb>;
  },
  delete: async (id: string) => {
    const result = await BlogModel.deleteOne({ id })

    return result.deletedCount === 1;
  },
  getById: async (id: string): Promise<WithId<TBlogDb> | null> => {
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
  updateById: async (id: string, body: TBlogDto): Promise<boolean> => {
    const result = await BlogModel.updateOne({ id }, { $set: body })

    return result.matchedCount === 1;
  }
}
