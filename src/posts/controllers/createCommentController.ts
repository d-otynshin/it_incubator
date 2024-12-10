import { Response, Request } from 'express'
import { postsRepository } from '../posts-repository';
import { CommentInputType } from '../../db/comment-db-type';
import { mapComment } from '../../comments/comments-query-repository';

export const createCommentController = async (
  req: Request<any, any, CommentInputType>,
  res: Response
) => {
  const createdComment = await postsRepository.createComment({
    //@ts-ignore
    user: req.user,
    content: req.body.content,
    id: req.params.id
  })

  return createdComment
    ? res.status(201).json(mapComment(createdComment))
    : res.status(404).send()
}
