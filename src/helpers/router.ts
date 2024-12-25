import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const router = async (
  _: Request,
  res: Response
) => {
  console.log('ENV', process.env)

  const mongoStatus = mongoose.connection.readyState
  res.status(200).json({ "connection": mongoStatus })
}
