import { Request, Response } from 'express';
import { commentsQueryRepository } from '../comments-query.repository';
import { commentsService } from '../comments.service';

export const updateCommentsController = async (
  req: Request,
  res: Response
) => {
  const { content } = req.body;
  const { id: commentId } = req.params;
  const { id: userId } = req.user;

  const comment = await commentsQueryRepository.getById(commentId, userId);

  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  if (comment.commentatorInfo.userId !== userId) {
    return res.status(403).json({ error: 'Try to update or delete the entity that was created by another user' });
  }

  const isUpdated = await commentsService.update({ id: commentId, content });

  return isUpdated ? res.status(204).send() : res.status(400).json({ message: 'Comment was not updated' });
}
