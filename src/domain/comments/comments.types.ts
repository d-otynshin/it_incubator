import { LikeStatus } from '../shared/types';

export type TLikeStatus = 'None' | 'Like' | 'Dislike';

export type TLikeInfo = {
  likesCount: number;
  dislikesCount: number;
  myStatus: LikeStatus;
}

export type TCommentInteractionDto = {
  commentId: string;
  userId: string;
  action: TLikeStatus;
}

export type TRemoveCommentInteractionDto = Omit<TCommentInteractionDto, 'action'>;

export type TCommentator = {
  userId: string;
  userLogin: string;
}

export type TInteraction = {
  id: string;
  action: LikeStatus.Like | LikeStatus.Dislike;
  updatedAt: Date;
}

export type TCommentDb = {
  id: string;
  content: string;
  commentatorInfo: TCommentator;
  interactions: TInteraction[];
  postId: string;
  createdAt: Date;
}

export type TCommentView = Omit<TCommentDb, 'postId' | 'interactions'> & {
  likesInfo: TLikeInfo
}

export type TCommentDto = Pick<TCommentDb, 'id' | 'content'>
