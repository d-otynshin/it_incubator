import { Request, Response } from 'express';
import { commentsQueryRepository } from '../comments-query-repository';

export const getCommentByIdController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const comments = await commentsQueryRepository.get(id);

  return Array.isArray(comments)
    ? res.status(200).json(comments)
    : res.status(404).send({ message: "Comment not found" })
}
