import { Request, Response } from 'express'
import { postsQueryRepository } from '../posts-query.repository';

export const getPostsController = async (
  req: Request,
  res: Response
) => {
  const { id: userId } = req.user;

  const posts = await postsQueryRepository.get(userId, req.query)

  res.status(200).json(posts)
}
