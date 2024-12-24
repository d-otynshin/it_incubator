import { Request, Response } from 'express';
import { blogsRepository } from '../blogs.repository';
import { TBlogDto } from '../blogs.entity';

export const updateBlogController = async (
  req: Request<{ id: string }, null, TBlogDto>,
  res: Response
) => {
  const { id } = req.params;

  const isBlogUpdated = await blogsRepository.updateById(id, req.body)

  return isBlogUpdated ? res.status(204).send(): res.status(404).send();
}
