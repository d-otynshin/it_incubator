export enum LikeStatus {
  None = 'None',
  Like = 'Like',
  Dislike = 'Dislike',
}

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
  action: 'Like' | 'Dislike';
  updatedAt: Date;
}

export type TCommentDb = {
  id: string;
  content: string;
  commentatorInfo: TCommentator;
  interactions: TInteraction[];
  createdAt: Date;
}

export type TCommentDto = Pick<TCommentDb, 'id' | 'content'>
