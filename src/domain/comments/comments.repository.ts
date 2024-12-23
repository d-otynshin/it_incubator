import { CommentModel, TCommentDb, TCommentDto } from './comments.entity';
import { WithId } from 'mongodb';

export interface ICommentsRepository {
  get: (id: string) => Promise<WithId<TCommentDb> | null>;
  update: (data: TCommentDto) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
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
}

export const commentsRepository = new CommentsRepository(CommentModel)
