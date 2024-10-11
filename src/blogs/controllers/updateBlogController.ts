import { Request, Response } from 'express';
import { BlogDBType } from '../../db/blog-db-type';
import { updateBlogRepository } from '../repositories/updateBlogRepository';

type UpdateBlogParams = {
  id: string;
}

export const updateBlogController = (req: Request<UpdateBlogParams, null, BlogDBType>, res: Response) => {
  const { id } = req.params;

  const isBlogUpdated = updateBlogRepository(id, req.body)

  return isBlogUpdated ? res.status(204).send(): res.status(404);
}
