import { Request, Response } from 'express'
import { postsRepository } from '../posts-repository';

export const getPostsController = async (
  req: Request,
  res: Response
) => {
  const { query } = req;
  const posts = await postsRepository.get(query)

  res.status(200).json(posts)
}
