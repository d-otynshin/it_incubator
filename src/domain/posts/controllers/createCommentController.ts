import { Response, Request } from 'express'
import { postsRepository } from '../posts-repository';
import { mapComment } from '../../comments/comments-query.repository';
import { TCommentView } from '../../comments/comments.types';

export const createCommentController = async (
  req: Request<any, any, TCommentView>,
  res: Response
) => {
  const { user } = req;
  const { id } = req.params;
  const { content } = req.body;

  const createdComment = await postsRepository.createComment({
    id,
    user,
    content,
  })

  return createdComment
    ? res.status(201).json(mapComment(createdComment, user.id))
    : res.status(404).send()
}
