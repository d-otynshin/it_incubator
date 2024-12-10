import { Request, Response } from 'express';
import { commentsQueryRepository } from '../comments-query-repository';

export const getCommentByIdController = async (
  req: Request,
  res: Response,
) => {
  const { postId } = req.params;
  const comment = await commentsQueryRepository.get(postId);

  return comment
    ? res.status(200).json(comment)
    : res.status(404).send({ message: "Post not found" })
}
