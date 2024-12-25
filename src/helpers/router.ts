import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { connectToDb } from '../db';
import { SETTINGS } from '../settings';

export const router = async (
  _: Request,
  res: Response
) => {
  await connectToDb()

  console.log('settings port', SETTINGS.PORT)

  const mongoStatus = mongoose.connection.readyState
  res.status(200).json({ "connection": mongoStatus })
}
