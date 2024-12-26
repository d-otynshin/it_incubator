import { fetchModelPaginated } from '../../infrastructure/helpers/fetchPaginated';
import { QueryParams } from '../../infrastructure/helpers/parseQuery';
import { CommentModel } from './comments.entity';
import { LikeStatus, TCommentator, TCommentDb, TCommentView } from './comments.types';
import { mapId } from '../../infrastructure/helpers/mapId';
import { WithId } from 'mongodb';

type PaginatedComments = {
  pagesCount: number,
  page: number,
  pageSize: number,
  totalCount: number,
  items: any[]
}

export const mapComment = (
  comment: TCommentDb,
  userId: string
): TCommentView => {
  const { interactions } = comment;
  const likesCount = interactions.filter(interaction => interaction.action === LikeStatus.Like).length;
  const dislikesCount = interactions.filter(interaction => interaction.action === LikeStatus.Like).length;

  const myInteraction = interactions.find((interaction) => interaction.id === userId)
  const myStatus = myInteraction?.action || LikeStatus.None;

  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    commentatorInfo: mapId(comment.commentatorInfo as WithId<TCommentator>),
    likesInfo: { likesCount, dislikesCount, myStatus }
  }
}

export interface ICommentsQueryRepository {
  get: (userId: string, postId: string, query: QueryParams) => Promise<PaginatedComments | null>;
  getById: (commentId: string, userId: string) => Promise<TCommentView | null>;
}

export class CommentsQueryRepository implements ICommentsQueryRepository {
  constructor(private readonly commentModel: typeof CommentModel) {}

  async get(userId: string, postId: string, query: QueryParams): Promise<PaginatedComments | null> {
    try {
      const filter: { postId: string } | {} = { postId };

      const paginatedCommentsDb: PaginatedComments  = await fetchModelPaginated(this.commentModel, query, filter)

      paginatedCommentsDb.items = paginatedCommentsDb.items.map((commentDb) => mapComment(commentDb, userId));

      return paginatedCommentsDb;
    } catch (error) {
      return null;
    }
  }

  async getById(commentId: string, userId: string) {
    try {
      const commentDb = await this.commentModel.findOne({ id: commentId })

      if (!commentDb) {
        return null;
      }

      return mapComment(commentDb, userId);
    } catch (error) {
      return null;
    }
  }
}

export const commentsQueryRepository = new CommentsQueryRepository(CommentModel)
