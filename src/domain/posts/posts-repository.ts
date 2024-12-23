import { PostDBType } from '../../db/post-db-type';
import { generateRandomId } from '../../helpers';
import { TPostInput } from './types';
import { WithId } from 'mongodb';
import { blogsRepository } from '../blogs/blogs-repository';
import { fetchModelPaginated } from '../../helpers/fetchPaginated';
import { QueryParams } from '../../helpers/parseQuery';
import { BlogDBType } from '../../db/blog-db-type';
import { CommentDbType } from '../../db/comment-db-type';
import { PostModel } from './posts.entity';
import { CommentModel } from '../comments/comments.entity';

type TCreateComment = {
  id: string;
  content: string;
  user: {
    id: string;
    login: string;
  }
}

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

    await PostModel.insertMany([createdPost])

    return createdPost as WithId<PostDBType>;
  },
  delete: async (id: string): Promise<boolean> => {
    const result = await PostModel.deleteOne({ id })

    return result.deletedCount === 1;
  },
  getById: async (id: string): Promise<WithId<PostDBType> | null> => {
    return PostModel.findOne({ id })
  },
  getByBlogId: async (blogId: string): Promise<PostDBType | null> => {
    return PostModel.findOne({ blogId })
  },
  get: async (query: QueryParams) => {
    return fetchModelPaginated(PostModel, query)
  },
  createComment: async ({ id, content, user }: TCreateComment): Promise<WithId<CommentDbType> | null> => {
    const post = await postsRepository.getById(id)

    if (!post) {
      return null
    }

    const commentatorInfo = {
      userId: user.id,
      userLogin: user.login,
    }

    const createdComment: { postId: string } & CommentDbType = {
      id: generateRandomId().toString(),
      createdAt: new Date(),
      content: content,
      postId: post.id,
      commentatorInfo
    }

    await CommentModel.insertMany([createdComment])

    return createdComment as unknown as WithId<CommentDbType>;
  },
  update: async (id: string, body: TPostInput): Promise<boolean> => {
    const result = await PostModel.updateOne({ id }, { $set: body })

    return result.matchedCount === 1;
  }
}
