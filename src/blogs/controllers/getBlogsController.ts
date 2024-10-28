import { Request, Response } from 'express'
import { getBlogsRepository } from '../repositories/getBlogsRepository';

export const getBlogsController = async (_: Request, res: Response) => {
  const blogs = await getBlogsRepository()

  res.status(200).json(blogs)
}
