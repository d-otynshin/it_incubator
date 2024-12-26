import { Request, Response } from 'express'
import { postsRepository } from '../posts-repository';
import { commentsQueryRepository } from '../../comments/comments-query.repository';

export const getCommentsController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { user } = req;

  const post = await postsRepository.getById(id)
  if (!post) return res.status(404).json({ message: 'Post not found' })

  const comments = await commentsQueryRepository.get(user.id, id, req.query);

  return comments ? res.status(200).json(comments) : res.status(404).json({ message: 'comments are not found' });
}
