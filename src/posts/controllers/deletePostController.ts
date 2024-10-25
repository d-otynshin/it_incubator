import { Request, Response } from 'express';
import { postsRepository } from '../postsRepository';

interface FindByIdRequest extends Request {
  params: { id: string };
}

export const deletePostController = (req: FindByIdRequest, res: Response) => {
  const { id } = req.params;

  const isDeleted = postsRepository.delete(id)

  return isDeleted
    ? res.status(204).send()
    : res.status(404).send({ error: 'Post not found' })
}
