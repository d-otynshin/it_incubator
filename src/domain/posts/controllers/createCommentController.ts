import { Response, Request } from 'express'
import { postsRepository } from '../posts-repository';
import { mapComment } from '../../comments/comments-query.repository';
import { TCommentDto } from '../../comments/comments.entity';

export const createCommentController = async (
  req: Request<any, any, TCommentDto>,
  res: Response
) => {
  const createdComment = await postsRepository.createComment({
    user: req.user,
    content: req.body.content,
    id: req.params.id
  })

  return createdComment
    ? res.status(201).json(mapComment(createdComment))
    : res.status(404).send()
}
