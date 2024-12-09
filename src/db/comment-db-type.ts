export type CommentatorType = {
  userId: string;
  userLogin: string;
}

export type CommentDbType = {
  id: string;
  content: string;
  commentatorInfo: CommentatorType;
  createdAt: Date;
}

export type CommentInputType = {
  content: string
}
