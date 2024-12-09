import { Request, Response } from 'express';
import { BlogDBType } from '../../db/blog-db-type';
import { blogsRepository } from '../blogs-repository';

export const updateBlogController = async (
  req: Request<{ id: string }, null, BlogDBType>,
  res: Response
) => {
  const { id } = req.params;

  const isBlogUpdated = await blogsRepository.updateById(id, req.body)

  return isBlogUpdated ? res.status(204).send(): res.status(404).send();
}
