import { Request, Response } from 'express';
import { blogsRepository } from '../blogs.repository';

interface FindByIdRequest extends Request {
  params: { id: string };
}

export const deleteBlogController = async (req: FindByIdRequest, res: Response) => {
  const { id } = req.params;

  const isDeleted = await blogsRepository.delete(id)

  return isDeleted
    ? res.status(204).send()
    : res.status(404).json({ error: 'Blog not found' })
}
