import mongoose from 'mongoose';
import { WithId } from 'mongodb';

export type TBlogDto = {
  name: string;
  description: string;
  websiteUrl: string;
}

export type TBlogDb = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: Date;
  isMembership: boolean;
}

export const BlogSchema = new mongoose.Schema<WithId<TBlogDb>>({
  id: { type: String, require: true },
  name: { type: String, require: true },
  description: { type: String, require: true },
  websiteUrl: { type: String, require: true },
  createdAt: { type: Date, require: true },
  isMembership: { type: Boolean, require: true },
})
