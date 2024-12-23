import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { WithId } from 'mongodb';
import { BlogSchema, TBlogDb } from '../domain/blogs/blogs.entity';
dotenv.config();

const MONGO_DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

export const BlogModel = mongoose.model<WithId<TBlogDb>>('blogs', BlogSchema)

export const connectToDb = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log('connected to db')
  } catch (e) {
    console.log('db connection error:', e)
    await mongoose.disconnect();
  }
}
