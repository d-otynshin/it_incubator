import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const router = (
  _: Request,
  res: Response
) => {
  const mongoStatus = mongoose.connection.readyState
  res.status(200).json({ "connection": mongoStatus })
}
