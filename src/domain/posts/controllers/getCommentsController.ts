import { Request, Response } from 'express'
import { postsRepository } from '../posts-repository';
import { commentsQueryRepository } from '../../comments/comments-query.repository';

export const getCommentsController = async (
  req: Request,
  res: Response
) => {
  const { query, params } = req;
  const { id } = params

  const post = await postsRepository.getById(id)
  if (!post) return res.status(404).json({ message: "Post not found" })

  const blogs = await commentsQueryRepository.get(id, query);

  return res.status(200).json(blogs)
}
