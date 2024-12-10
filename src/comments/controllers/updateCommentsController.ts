import { Request, Response } from 'express';
import { commentsService } from '../comments-service';
import { commentsQueryRepository } from '../comments-query-repository';

export const updateCommentsController = async (
  req: Request,
  res: Response
) => {
  const { content } = req.body;
  const { id } = req.params;

  //@ts-ignore
  const { id: userId } = req.user;

  const comment = await commentsQueryRepository.getById(id);

  if (!comment) {
    return res.status(404).send({ error: 'Comment not found' });
  }

  if (comment.commentatorInfo.userId !== userId) {
    return res.status(403).send({ error: 'Comment update is forbidden' });
  }

  const isUpdated = await commentsService.update({ id, content });

  return isUpdated ? res.status(204).send() : res.status(400).json({ message: 'Comment was not updated' });
}
