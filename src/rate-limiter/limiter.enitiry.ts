import mongoose from 'mongoose';
import { WithId } from 'mongodb';

export type TLimiterDb = {
  id: string;
  url: string;
  logs: number;
  createdAt: Date;
}

export const LimiterSchema = new mongoose.Schema<WithId<TLimiterDb>>({
  id: { type: String, require: true },
  url: { type: String, require: true },
  logs: { type: Number, require: true },
  createdAt: Date,
})
