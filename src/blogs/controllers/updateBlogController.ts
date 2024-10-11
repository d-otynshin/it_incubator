import { Request, Response } from 'express';
import { BlogDBType } from '../../db/blog-db-type';
import { updateBlogRepository } from '../repositories/updateBlogRepository';

export const updateBlogController = (
  req: Request<{ id: string }, null, BlogDBType>,
  res: Response
) => {
  const { id } = req.params;

  const isBlogUpdated = updateBlogRepository(id, req.body)

  return isBlogUpdated ? res.status(204).send(): res.status(404);
}
