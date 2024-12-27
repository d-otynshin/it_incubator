import { PostModel, TInteraction, TPostDb, TPostView } from './posts.entity';
import { LikeStatus } from '../shared/types';
import { isBefore } from 'date-fns';
import { mapId } from '../../infrastructure/helpers/mapId';
import { QueryParams } from '../../infrastructure/helpers/parseQuery';
import { fetchModelPaginated } from '../../infrastructure/helpers/fetchPaginated';

const countInteractions = (interactions: TInteraction[], status: string) => {
  return interactions.filter(interaction => interaction.action === status).length;
}

export const mapPost = (
  post: TPostDb,
  userId?: string
): TPostView => {
  const { interactions } = post;
  const likesCount = countInteractions(interactions, LikeStatus.Like);
  const dislikesCount = countInteractions(interactions, LikeStatus.Dislike);

  let myStatus = LikeStatus.None;

  if (userId) {
    const myInteraction = interactions.find((interaction) => interaction.userId === userId)
    myStatus = myInteraction?.action || LikeStatus.None;
  }

  const newestLikes = interactions
    .filter(interaction => interaction.action === LikeStatus.Like)
    .sort((likeA, likeB) => (isBefore(likeA.addedAt, likeB.addedAt) ? 1 : -1))
    .slice(0, 3)
    .map((like) => ({
      userId: like.userId,
      login: like.login,
      addedAt: like.addedAt,
    }))

  return  {
    id: post.id,
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt,
    extendedLikesInfo: {
      likesCount,
      dislikesCount,
      myStatus,
      newestLikes
    }
  }
}

export class PostsQueryRepository {
  constructor(private readonly postModel: typeof PostModel) {}

  async getById(postId: string, userId?: string) {
    const post = await this.postModel.findOne({ id: postId }).lean();
    if (!post) return null;

    return mapPost(mapId(post), userId);
  }

  async get(userId: string, query: QueryParams) {
    try {
      const filter = {};

      const paginatedPostsDb = await fetchModelPaginated(this.postModel, query, filter)

      paginatedPostsDb.items = paginatedPostsDb.items.map((postDb: any) => mapPost(postDb, userId));

      return paginatedPostsDb;
    } catch (error) {
      return null;
    }
  }
}

export const postsQueryRepository = new PostsQueryRepository(PostModel)
