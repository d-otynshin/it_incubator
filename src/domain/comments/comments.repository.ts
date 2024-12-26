import { CommentModel } from './comments.entity';
import { WithId } from 'mongodb';

import {
  TCommentDb,
  TCommentDto,
  TInteraction,
  TCommentInteractionDto,
  TRemoveCommentInteractionDto
} from './comments.types';

export interface ICommentsRepository {
  get: (id: string) => Promise<WithId<TCommentDb> | null>;
  update: (data: TCommentDto) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;

  createInteraction: (interactionDto: TCommentInteractionDto) => Promise<boolean>;
  removeInteraction: (removeDto: TRemoveCommentInteractionDto) => Promise<boolean>;
  getInteractions: (id: string) => Promise<TInteraction[] | null>;
  updateInteraction: (interactionDto: TCommentInteractionDto) => Promise<boolean>;
}

export class CommentsRepository implements ICommentsRepository {
  constructor(private readonly commentModel: typeof CommentModel) {}

  async get(id: string) {
    try {
      return this.commentModel.findOne({ id })
    } catch (error) {
      return null;
    }
  }

  async update({ id, content }: TCommentDto) {
    try {
      const updateResult = await this.commentModel.updateOne({ id }, { $set: { content } })

      return updateResult.matchedCount === 1;
    } catch (error) {
      return false;
    }
  }

  async delete(id: string) {
    try {
      const result = await this.commentModel.deleteOne({ id })

      return result.deletedCount === 1;
    } catch (error) {
      return false;
    }
  }

  async createInteraction(
    {
      commentId,
      action,
      userId
    }: TCommentInteractionDto
  ): Promise<boolean> {
    try {
      const createdInteraction = {
        id: userId,
        action,
        updatedAt: new Date()
      }

      await this.commentModel.updateOne(
        { id: commentId },
        { $push: {
            interactions: createdInteraction
          }
        }
      )

      return true
    } catch (error) {
      return false;
    }
  }

  async removeInteraction(
    {
      commentId,
      userId
    }: TRemoveCommentInteractionDto
  ): Promise<boolean> {
    try {
      const result = await this.commentModel.deleteOne(
        { id: commentId }, {
        $pull: {
          interactions: { id: userId },
        },
      })

      return result.deletedCount === 1
    } catch (error) {
      return false;
    }
  }

  async getInteractions(id: string) {
    try {
      const comment = await this.commentModel.findOne({ id })
      if (!comment) return null;

      const { interactions } = comment;

      return interactions
    } catch (error) {
      return null;
    }
  }

  async updateInteraction(
    {
      commentId,
      userId,
      action
    }: TCommentInteractionDto): Promise<boolean> {
    try {
      await this.commentModel.findOneAndUpdate(
        { id: commentId, 'interactions.id': userId },
        {
          $set: {
            'interactions.$.updatedAt': new Date(),
            'interactions.$.action': action,
          },
        }
      );

      return true;

    } catch (error) {
      return false;
    }
  }
}

export const commentsRepository = new CommentsRepository(CommentModel)
