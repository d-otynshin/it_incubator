import { Request, Response } from 'express'
import { postsRepository } from '../postsRepository';

export const getPostsController = (_: Request, res: Response) => {
  const posts = postsRepository.get()

  res.status(200).json(posts)
}
