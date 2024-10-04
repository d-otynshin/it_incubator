import { Request, Response } from 'express'
import { getBlogsRepository } from '../repositories/getBlogsRepository';

export const getBlogsController = (_: Request, res: Response) => {
  const blogs = getBlogsRepository()

  res.status(200).json(blogs)
}
