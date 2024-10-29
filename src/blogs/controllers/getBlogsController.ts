import { Request, Response } from 'express'
import { blogsRepository } from '../blogsRepository';

export const getBlogsController = async (_: Request, res: Response) => {
  const blogs = await blogsRepository.get();

  res.status(200).json(blogs)
}
