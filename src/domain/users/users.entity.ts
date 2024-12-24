import mongoose from 'mongoose'
import { WithId } from 'mongodb'
import { TUserDb, TEmailConfirmation } from './type';

const EmailConfirmationSchema = new mongoose.Schema<TEmailConfirmation>({
  code: String,
  isConfirmed: Boolean,
  expirationDate: Date,
})

export const UserSchema = new mongoose.Schema<WithId<TUserDb>>({
  id: { type: String, require: true },
  login: { type: String, require: true },
  salt: { type: String, require: true },
  passwordHash: { type: String, require: true },
  email: { type: String, require: true },
  createdAt: { type: Date, require: true },
  emailConfirmation: EmailConfirmationSchema,
})

export const UserModel = mongoose.model<WithId<TUserDb>>('users', UserSchema)
