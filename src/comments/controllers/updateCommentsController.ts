import { Request, Response } from 'express';
import { commentsService } from '../comments-service';

export const updateCommentsController = async (
  req: Request,
  res: Response
) => {
  const { content } = req.body;
  const { id } = req.params;

  const isUpdated = await commentsService.update({ id, content });

  return isUpdated ? res.status(204).send() : res.status(400).json();
}
