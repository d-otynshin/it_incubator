import { Request, Response } from 'express';
import { commentsQueryRepository } from '../comments-query.repository';

export const getCommentByIdController = async (
  req: Request,
  res: Response,
) => {
  const { id: commentId } = req.params;
  const { id: userId } = req.user;
  const comment = await commentsQueryRepository.getById(commentId, userId);

  return comment
    ? res.status(200).json(comment)
    : res.status(404).send({ message: "Comment not found" })
}
