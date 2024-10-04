import { Request, Response } from 'express'
import { getBlogsRepository } from '../repositories/getBlogsRepository';

export const getBlogsController = (_: Request, res: Response) => {
  const videos = getBlogsRepository()

  res.status(200).json(videos)
}
