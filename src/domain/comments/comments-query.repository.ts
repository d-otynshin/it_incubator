import { CommentDbType } from '../../db/comment-db-type';
import { fetchModelPaginated } from '../../helpers/fetchPaginated';
import { QueryParams } from '../../helpers/parseQuery';
import { CommentModel, TCommentDb } from './comments.entity';

type PaginatedComments = {
  pagesCount: number,
  page: number,
  pageSize: number,
  totalCount: number,
  items: any[]
}

export const mapComment = (comment: CommentDbType) => ({
  id: comment.id,
  content: comment.content,
  createdAt: comment.createdAt,
  commentatorInfo: comment.commentatorInfo,
})

export interface ICommentsQueryRepository {
  get: (postId: string, query: QueryParams) => Promise<PaginatedComments | null>;
  getById: (id: string) => Promise<TCommentDb | null>;
}

export class CommentsQueryRepository implements ICommentsQueryRepository {
  constructor(private readonly commentModel: typeof CommentModel) {}

  async get(postId: string, query: QueryParams): Promise<PaginatedComments | null> {
    try {
      const filter: { postId: string } | {} = { postId };

      const paginatedCommentsDb: PaginatedComments  = await fetchModelPaginated(this.commentModel.bind(this), query, filter)

      paginatedCommentsDb.items = paginatedCommentsDb.items.map(mapComment);

      return paginatedCommentsDb;
    } catch (error) {
      return null;
    }
  }

  async getById(id: string) {
    try {
      const commentDb = await this.commentModel.findOne({ id })

      if (!commentDb) {
        return null;
      }

      return mapComment(commentDb);
    } catch (error) {
      return null;
    }
  }
}

export const commentsQueryRepository = new CommentsQueryRepository(CommentModel)
