import { Request, Response } from 'express'
import { blogsRepository } from '../blogsRepository';

export const getPostsController = async (
  req: Request,
  res: Response
) => {
  const { query, params } = req;
  const { blogId } = params

  const blogs = await blogsRepository.getPosts(blogId, query);

  res.status(200).json(blogs)
}
