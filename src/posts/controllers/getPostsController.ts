import { Request, Response } from 'express'
import { postsRepository } from '../postsRepository';

export const getPostsController = async (
  req: Request,
  res: Response
) => {
  const { query } = req;
  const posts = await postsRepository.get(query)

  res.status(200).json(posts)
}
