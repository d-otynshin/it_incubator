import mongoose from 'mongoose';
import { WithId } from 'mongodb';

type TCommentator = {
  userId: string;
  userLogin: string;
}

export type TCommentDb = {
  id: string;
  content: string;
  commentatorInfo: TCommentator;
  createdAt: Date;
}

export type TCommentDto = Pick<TCommentDb, 'id' | 'content'>

const CommentatorSchema = new mongoose.Schema<TCommentator>({
  userLogin: String,
  userId: String,
})

export const CommentSchema = new mongoose.Schema<WithId<TCommentDb>>({
  id: { type: String, require: true },
  content: { type: String, require: true },
  createdAt: { type: Date },
  commentatorInfo: CommentatorSchema,
})

export const CommentModel = mongoose.model<WithId<TCommentDb>>('comments', CommentSchema)
