import { Request, Response } from 'express';

export const router = (
  _: Request,
  res: Response
) => {
  const mongoURI = process.env.MONGODB_URI
  res.status(200).json({ mongoURI })
}
