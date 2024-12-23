import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { WithId } from 'mongodb';
import { BlogSchema, TBlogDb } from '../domain/blogs/blogs.entity';
import { LimiterSchema, TLimiterDb } from '../rate-limiter/limiter.enitiry';
import { PostSchema, TPostDb } from '../domain/posts/posts.entity';
import { SessionSchema, TSessionDb } from '../domain/security/sessions.entity';
import { TUserDb } from '../domain/users/type';
import { UserSchema } from '../domain/users/users.entity';
dotenv.config();

const MONGO_DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

export const BlogModel = mongoose.model<WithId<TBlogDb>>('blogs', BlogSchema)
export const LimiterModel = mongoose.model<WithId<TLimiterDb>>('limiters', LimiterSchema)
export const PostModel = mongoose.model<WithId<TPostDb>>('posts', PostSchema)
export const SessionModel = mongoose.model<WithId<TSessionDb>>('sessions', SessionSchema)
export const UserModel = mongoose.model<WithId<TUserDb>>('users', UserSchema)

export const connectToDb = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log('connected to db')
  } catch (e) {
    console.log('db connection error:', e)
    await mongoose.disconnect();
  }
}
