import { Request, Response } from 'express';
import { commentsService } from '../comments-service';

export const deleteCommentsController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const isDeleted = await commentsService.delete(id);

  return isDeleted
    ? res.status(204).send()
    : res.status(404).send({ error: 'Post not found' })
}
