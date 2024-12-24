import { generateRandomId } from '../../helpers';
import { WithId } from 'mongodb';
import { blogsRepository } from '../blogs/blogs.repository';
import { fetchModelPaginated } from '../../helpers/fetchPaginated';
import { QueryParams } from '../../helpers/parseQuery';
import { PostModel, TPostDb, TPostDto } from './posts.entity';
import { CommentModel, TCommentDb } from '../comments/comments.entity';
import { TBlogDb } from '../blogs/blogs.entity';

type TCreateComment = {
  id: string;
  content: string;
  user: {
    id: string;
    login: string;
  }
}

export const postsRepository = {
  create: async (body: TPostDto): Promise<WithId<TPostDb> | null> => {
    let blog = await blogsRepository.getById(body.blogId)

    if (!blog) {
      blog = { name: 'blog name' } as WithId<TBlogDb>
    }

    const createdPost: TPostDb = {
      id: generateRandomId().toString(),
      createdAt: new Date().toISOString() as unknown as Date,
      blogName: blog?.name,
      ...body,
    }

    await PostModel.insertMany([createdPost])

    return createdPost as WithId<TPostDb>;
  },
  delete: async (id: string): Promise<boolean> => {
    const result = await PostModel.deleteOne({ id })

    return result.deletedCount === 1;
  },
  getById: async (id: string): Promise<WithId<TPostDb> | null> => {
    return PostModel.findOne({ id })
  },
  getByBlogId: async (blogId: string): Promise<TPostDb | null> => {
    return PostModel.findOne({ blogId })
  },
  get: async (query: QueryParams) => {
    return fetchModelPaginated(PostModel, query)
  },
  createComment: async ({ id, content, user }: TCreateComment): Promise<WithId<TCommentDb> | null> => {
    const post = await postsRepository.getById(id)

    if (!post) {
      return null
    }

    const commentatorInfo = {
      userId: user.id,
      userLogin: user.login,
    }

    const createdComment: { postId: string } & TCommentDb = {
      id: generateRandomId().toString(),
      createdAt: new Date(),
      content: content,
      postId: post.id,
      commentatorInfo
    }

    await CommentModel.insertMany([createdComment])

    return createdComment as unknown as WithId<TCommentDb>;
  },
  update: async (id: string, body: TPostDto): Promise<boolean> => {
    const result = await PostModel.updateOne({ id }, { $set: body })

    return result.matchedCount === 1;
  }
}
