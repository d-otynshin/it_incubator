import mongoose from 'mongoose';
import { WithId } from 'mongodb';
import { LikeStatus } from '../shared/types';

export type TPostDto = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}

export type TExtendedLikeInfo = {
  likesCount: number;
  dislikesCount: number;
  myStatus: LikeStatus;
  newestLikes: TInteraction[],
}

export type TInteraction = {
  userId: string;
  login: string;
  action: LikeStatus.Like | LikeStatus.Dislike;
  addedAt: Date;
}

export type TPostDb = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date;
  interactions: TInteraction[];
}

export type TPostView = Omit<TPostDb, 'interactions'> & {
  extendedLikesInfo: TExtendedLikeInfo
}

const InteractionSchema = new mongoose.Schema<TInteraction>({
  userId: { type: String, require: true },
  login: { type: String, require: true },
  addedAt: { type: Date, require: true },
  action: { type: String, require: true },
})

export const PostSchema = new mongoose.Schema<WithId<TPostDb>>({
  id: { type: String, require: true },
  title: { type: String, require: true },
  shortDescription: { type: String, require: true },
  content: { type: String, require: true },
  blogId: { type: String, require: true },
  blogName: { type: String, require: true },
  createdAt: { type: Date, require: true },
  interactions: { type: [InteractionSchema], required: true },
})

export const PostModel = mongoose.model<WithId<TPostDb>>('posts', PostSchema)
