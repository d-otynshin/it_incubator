import { Request, Response } from 'express';
import { commentsQueryRepository } from '../comments-query-repository';
import { commentsService } from '../comments.service';

export const deleteCommentsController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const comment = await commentsQueryRepository.getById(id);
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  if (comment.commentatorInfo.userId !== userId) {
    return res.status(403).json({ error: 'Try to update or delete the entity that was created by another user' });
  }

  const isDeleted = await commentsService.delete(id);

  return isDeleted
    ? res.status(204).send()
    : res.status(404).send({ error: 'Comment not found' })
}
