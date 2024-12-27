import { generateRandomId } from '../../infrastructure/helpers';
import { WithId } from 'mongodb';
import { blogsRepository } from '../blogs/blogs.repository';
import { fetchModelPaginated } from '../../infrastructure/helpers/fetchPaginated';
import { QueryParams } from '../../infrastructure/helpers/parseQuery';
import { PostModel, TInteraction, TPostDb, TPostDto } from './posts.entity';
import { CommentModel } from '../comments/comments.entity';
import { TBlogDb } from '../blogs/blogs.entity';
import { TCommentDb, TLikeStatus } from '../comments/comments.types';

export type TPostInteractionDto = {
  postId: string;
  userId: string;
  login: string;
  action: TLikeStatus;
}

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
      interactions: [],
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
    return PostModel.findOne({ id }).lean()
  },
  getByBlogId: async (blogId: string): Promise<TPostDb | null> => {
    return PostModel.findOne({ blogId }).lean()
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

    const createdComment: TCommentDb = {
      id: generateRandomId().toString(),
      createdAt: new Date(),
      content: content,
      postId: post.id,
      commentatorInfo,
      interactions: []
    }

    await CommentModel.insertMany([createdComment])

    return createdComment as unknown as WithId<TCommentDb>;
  },
  update: async (id: string, body: TPostDto): Promise<boolean> => {
    const result = await PostModel.updateOne({ id }, { $set: body })

    return result.matchedCount === 1;
  },
  async getInteractions(id: string) {
    try {
      const post = await PostModel.findOne({ id })
      if (!post) return null;

      const { interactions } = post;

      return interactions
    } catch (error) {
      return null;
    }
  },
  async updateInteraction(
    {
      postId,
      userId,
      action
    }: TPostInteractionDto): Promise<boolean> {
    try {
      await PostModel.findOneAndUpdate(
        { id: postId, 'interactions.userId': userId },
        {
          $set: {
            'interactions.$.addedAt': new Date(),
            'interactions.$.action': action,
          },
        }
      );

      return true;

    } catch (error) {
      return false;
    }
  },
  async createInteraction(
    {
      postId,
      login,
      action,
      userId
    }: TPostInteractionDto
  ): Promise<boolean> {
    try {
      const createdInteraction = {
        userId,
        login,
        action,
        addedAd: new Date()
      }

      await PostModel.updateOne(
        { id: postId },
        { $push: {
            interactions: createdInteraction
          }
        }
      )

      return true
    } catch (error) {
      return false;
    }
  },
  async interact(
    {
      postId,
      userId,
      login,
      action
    }: TPostInteractionDto): Promise<boolean> {
    const interactions: TInteraction[] | null = await postsRepository.getInteractions(postId);
    if (!interactions) return false;

    const findInteraction = (interaction: TInteraction): boolean => {
      return interaction.userId === userId;
    }

    const interaction: TInteraction | undefined = interactions.find(findInteraction);
    if (!interaction) {
      return postsRepository.createInteraction({
        postId,
        userId,
        login,
        action
      });
    }

    if (interaction.action === action) {
      return true;
    }

    return postsRepository.updateInteraction({
      postId,
      login,
      userId,
      action
    });
  }
}
