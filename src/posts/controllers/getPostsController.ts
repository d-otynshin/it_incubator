import { Request, Response } from 'express'
import { postsRepository } from '../postsRepository';

export const getPostsController = async (
  _: Request,
  res: Response
) => {
  const posts = await postsRepository.get()

  res.status(200).json(posts)
}
