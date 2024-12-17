import { db } from '../../db/monogo-db';
import { CommentDbType } from '../../db/comment-db-type';
import { UpdateResult } from 'mongodb';
import type { TCommentInput } from './type';

const commentsCollection = db.collection<CommentDbType>('comments');

export const commentsRepository = {
  get: async (id: string) => {
    try {
      return commentsCollection.findOne({ id })
    } catch (error) {
      return null;
    }
  },
  update: async ({ id, content }: TCommentInput) => {
    try {
      const updateResult: UpdateResult<CommentDbType> = await commentsCollection.updateOne({ id }, { $set: { content } })

      return updateResult.matchedCount === 1;
    } catch (error) {
      return false;
    }
  },
  delete: async (id: string) => {
    try {
      const result = await commentsCollection.deleteOne({ id })

      return result.deletedCount === 1;
    } catch (error) {
      return false;
    }
  }
}
