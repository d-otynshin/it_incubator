import mongoose from 'mongoose';
import { WithId } from 'mongodb';

export type TPostDto = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}

export type TPostDb = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date;
}


export const PostSchema = new mongoose.Schema<WithId<TPostDb>>({
  id: { type: String, require: true },
  title: { type: String, require: true },
  shortDescription: { type: String, require: true },
  content: { type: String, require: true },
  blogId: { type: String, require: true },
  blogName: { type: String, require: true },
  createdAt: { type: Date, require: true },
})

export const PostModel = mongoose.model<WithId<TPostDb>>('posts', PostSchema)
