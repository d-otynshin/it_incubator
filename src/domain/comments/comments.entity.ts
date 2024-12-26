import mongoose from 'mongoose';
import { WithId } from 'mongodb';
import { TCommentator, TCommentDb, TInteraction } from './comments.types';

const InteractionSchema = new mongoose.Schema<TInteraction>({
  id: { type: String, require: true },
  updatedAt: { type: Date, require: true },
  action: { type: String, require: true },
})

const CommentatorSchema = new mongoose.Schema<TCommentator>({
  userLogin: String,
  userId: String,
})

export const CommentSchema = new mongoose.Schema<WithId<TCommentDb>>({
  id: { type: String, require: true },
  content: { type: String, require: true },
  createdAt: { type: Date, require: true },
  commentatorInfo: { type: CommentatorSchema, required: true },
  interactions: { type: [InteractionSchema], require: true },
})

export const CommentModel = mongoose.model<WithId<TCommentDb>>('comments', CommentSchema)
