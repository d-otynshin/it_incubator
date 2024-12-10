import { Request, Response } from 'express';
import { commentsRepository } from '../comments-repository';

export const getCommentByIdController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const comment = await commentsRepository.get(id);

  return comment
    ? res.status(200).json(comment)
    : res.status(404).send({ message: "comment not found" })
}
