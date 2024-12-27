import { Request, Response } from 'express';
import { postsRepository } from '../posts-repository';

export const updatePostsLikeController = async (
  req: Request,
  res: Response
) => {
  const { likeStatus } = req.body;
  const { id: postId } = req.params;
  const { id: userId, login } = req.user;

  const post = await postsRepository.getById(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const isInteracted = await postsRepository.interact(
    {
      postId,
      userId,
      login,
      action: likeStatus
    }
  );

  return isInteracted
    ? res.status(204).send()
    : res.status(400).json({ message: 'Interaction was not updated' });
}
