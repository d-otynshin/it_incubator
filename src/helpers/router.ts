import { Request, Response } from 'express';

export const router = (
  _: Request,
  res: Response
) => {
  res.status(200).json({ version: '1.0' })
}
