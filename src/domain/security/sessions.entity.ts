import mongoose from 'mongoose';
import { WithId } from 'mongodb';

export type TSessionDb = {
  userId: string;
  deviceId: string;
  name: string;
  ip: string;
  exp: number;
  iat: number;
}

export const SessionSchema = new mongoose.Schema<WithId<TSessionDb>>({
  userId: { type: String, require: true },
  deviceId: { type: String, require: true },
  name: { type: String, require: true },
  ip: { type: String, require: true },
  exp: { type: Number, require: true },
  iat: { type: Number, require: true },
})
