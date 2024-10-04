import { Request, Response } from 'express'
import { getPostsRepository } from '../repositories/getPostsRepository';

export const getPostsController = (_: Request, res: Response) => {
  const posts = getPostsRepository()

  res.status(200).json(posts)
}
