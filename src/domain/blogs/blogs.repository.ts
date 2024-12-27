import { WithId } from 'mongodb';
import { generateRandomId } from '../../infrastructure/helpers';
import { QueryParams } from '../../infrastructure/helpers/parseQuery';
import { fetchModelPaginated } from '../../infrastructure/helpers/fetchPaginated';
import { BlogModel, TBlogDb, TBlogDto } from './blogs.entity';
import { PostModel, TPostDb, TPostDto } from '../posts/posts.entity';

class BlogsRepository {
  constructor(
    private readonly blogModel: typeof BlogModel,
    private readonly postModel: typeof PostModel,
  ) {}

  async create(body: TBlogDto): Promise<WithId<TBlogDb>> {
    const createdBlog: TBlogDb = {
      ...body,
      id: generateRandomId().toString(),
      createdAt: new Date().toISOString() as unknown as Date,
      isMembership: false
    }

    await this.blogModel.insertMany([createdBlog]);

    return createdBlog as WithId<TBlogDb>;
  }

  async getById(id: string): Promise<WithId<TBlogDb> | null> {
    return this.blogModel.findOne({ id })
  }

  async createPost(id: string, body: TPostDto): Promise<WithId<TPostDb> | null> {
    const blog = await this.getById(id)

    if (!blog) return null;

    const createdPost: TPostDb = {
      id: generateRandomId().toString(),
      createdAt: new Date().toISOString() as unknown as Date,
      blogName: blog?.name,
      interactions: [],
      ...body,
    }

    await PostModel.insertMany([createdPost])

    return createdPost as WithId<TPostDb>;
  }

  async delete(id: string) {
    const result = await this.blogModel.deleteOne({ id })

    return result.deletedCount === 1;
  }

  async get(query: QueryParams) {
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

    return fetchModelPaginated(this.blogModel, query, filter)
  }

  async getPosts(_: string, query: QueryParams) {
    const filter: { blogId: string } | {} = {
      blogId: '',
      // title: {
      //   $ne: 'post title',
      // }
    }

    console.log('filter', filter);

    return fetchModelPaginated(this.postModel, query, filter)
  }

  async updateById(id: string, body: TBlogDto): Promise<boolean> {
    const result = await this.blogModel.updateOne({ id }, { $set: body })

    return result.matchedCount === 1;
  }
}

export const blogsRepository = new BlogsRepository(BlogModel, PostModel);
