import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const router = async (
  _: Request,
  res: Response
) => {
  const connection = await mongoose.connect(process.env.MONGODB_URI as string);
  const mongoStatus = mongoose.connection.readyState
  res.status(200).json({ "connection": mongoStatus, "response": connection })
}
