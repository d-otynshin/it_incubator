import { Request, Response } from 'express';
import { deletePostRepository } from '../repositories/deletePostRepository';

interface FindByIdRequest extends Request {
  params: { id: string };
}

export const deletePostController = (req: FindByIdRequest, res: Response) => {
  const { id } = req.params;

  const isDeleted = deletePostRepository(id)

  return isDeleted
    ? res.status(204).send()
    : res.status(404).json({ error: 'Video not found' })
}
