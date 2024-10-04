import { Request, Response } from 'express';
import { deleteBlogRepository } from '../repositories/deleteBlogRepository';

interface FindByIdRequest extends Request {
  params: { id: string };
}

export const deleteBlogController = (req: FindByIdRequest, res: Response) => {
  const { id } = req.params;

  const isDeleted = deleteBlogRepository(id)

  return isDeleted
    ? res.status(204).send()
    : res.status(404).json({ error: 'Video not found' })
}
