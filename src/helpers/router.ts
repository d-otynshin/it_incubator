import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { connectToDb } from '../db';

export const router = async (
  _: Request,
  res: Response
) => {
  await connectToDb()

  const mongoStatus = mongoose.connection.readyState
  res.status(200).json({ "connection": mongoStatus })
}
