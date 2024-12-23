import mongoose from 'mongoose';
import { WithId } from 'mongodb';

export type TLimiterDb = {
  id: string;
  url: string;
  createdAt: Date;
}

export const CommentSchema = new mongoose.Schema<WithId<TLimiterDb>>({
  id: { type: String, require: true },
  url: { type: String, require: true },
  createdAt: Date,
})

export const LimiterModel = mongoose.model<WithId<TLimiterDb>>('limiters', CommentSchema)
