import { Request, Response } from 'express';
import { postsRepository } from '../posts-repository';
import { TPostDb } from '../posts.entity';

export const updatePostController = async (
  req: Request<{ id: string }, null, TPostDb>,
  res: Response
) => {
  const { id } = req.params;
  const isBlogUpdated = await postsRepository.update(id, req.body)

  return isBlogUpdated
    ? res.status(204).send()
    : res.status(404).send();
}
