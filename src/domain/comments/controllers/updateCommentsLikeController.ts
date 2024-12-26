import { Request, Response } from 'express';
import { commentsQueryRepository } from '../comments-query.repository';
import { commentsService } from '../comments.service';

export const updateCommentsLikeController = async (
  req: Request,
  res: Response
) => {
  const { likeStatus } = req.body;
  const { id } = req.params;
  const { id: userId } = req.user;

  const comment = await commentsQueryRepository.getById(id);

  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  const isUpdated = await commentsService.interact(
    {
      commentId: id,
      userId,
      action: likeStatus
    }
  );

  return isUpdated
    ? res.status(204).send()
    : res.status(400).json({ message: 'Interaction was not updated' });
}
