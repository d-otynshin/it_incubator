import { Request, Response } from 'express'
import { blogsRepository } from '../blogsRepository';

export const getPostsController = async (
  req: Request,
  res: Response
) => {
  const { query } = req;
  const blogs = await blogsRepository.get(query);

  res.status(200).json(blogs)
}
