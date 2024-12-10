import { Response, Request } from 'express'
import { postsRepository } from '../posts-repository';
import { mapId } from '../../helpers/mapId';
import { CommentInputType } from '../../db/comment-db-type';

export const createCommentController = async (
  req: Request<any, any, CommentInputType>,
  res: Response
) => {
  const createdComment = await postsRepository.createComment({
    content: req.body.content,
    id: req.params.id,
    //@ts-ignore
    user: req.user
  })

  return createdComment
    ? res.status(201).json(mapId(createdComment))
    : res.status(404).send()
}
