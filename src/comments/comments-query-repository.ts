import { Collection } from 'mongodb';
import { db } from '../db/monogo-db';
import { CommentDbType } from '../db/comment-db-type';

const commentsCollection: Collection<CommentDbType> = db.collection<CommentDbType>('comments');

export const commentsQueryRepository = {
  get: async (id: string) => {
    try {
      return commentsCollection.findOne({ id })
    } catch (error) {
      return null;
    }
  },
}
