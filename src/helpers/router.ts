import { Request, Response } from 'express';

export const router = (
  _: Request,
  res: Response
) => {
  const mongoStatus = process.env.MONGODB_URI ? "connected" : "disconnected"
  res.status(200).json({ "connection": mongoStatus })
}
