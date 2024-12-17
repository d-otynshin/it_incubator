import { Collection } from 'mongodb';
import { db } from '../../db/monogo-db';
import { CommentDbType } from '../../db/comment-db-type';
import { fetchPaginated } from '../../helpers/fetchPaginated';
import { QueryParams } from '../../helpers/parseQuery';

const commentsCollection: Collection<CommentDbType> = db.collection<CommentDbType>('comments');

export const mapComment = (comment: CommentDbType) => ({
  id: comment.id,
  content: comment.content,
  createdAt: comment.createdAt,
  commentatorInfo: comment.commentatorInfo,
})

export const commentsQueryRepository = {
  get: async (postId: string, query: QueryParams) => {
    try {
      const filter: { postId: string } | {} = { postId };

      const paginatedCommentsDb = await fetchPaginated(commentsCollection, query, filter)

      // @ts-ignore
      paginatedCommentsDb.items = paginatedCommentsDb.items.map(mapComment);

      return paginatedCommentsDb;
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
