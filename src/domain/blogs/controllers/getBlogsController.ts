import { Request, Response } from 'express'
import { blogsRepository } from '../blogs.repository';

export const getBlogsController = async (
  req: Request,
  res: Response
) => {
  const { query } = req;
  const blogs = await blogsRepository.get(query);

  res.status(200).json(blogs)
}
