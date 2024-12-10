import { Collection } from 'mongodb';
import { db } from '../db/monogo-db';
import { CommentDbType } from '../db/comment-db-type';

const commentsCollection: Collection<CommentDbType> = db.collection<CommentDbType>('comments');

const mapComment = (comment: CommentDbType) => ({
  id: comment.id,
  content: comment.content,
  createdAt: comment.createdAt,
  commentatorInfo: comment.commentatorInfo,
})

export const commentsQueryRepository = {
  get: async (postId: string) => {
    try {
      const commentsDb = await commentsCollection.find({ postId }).toArray()

      return commentsDb.map(mapComment);
    } catch (error) {
      return null;
    }
  },
  getById: async (id: string) => {
    try {
      const commentDb = await commentsCollection.findOne({ id })

      if (!commentDb) {
        return null;
      }

      return mapComment(commentDb);
    } catch (error) {
      return null;
    }
  },
}
