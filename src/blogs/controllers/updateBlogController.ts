import { Request, Response } from 'express';
import { validateVideo } from '../../helpers/inputValidation';
import { BlogDBType } from '../../db/blog-db-type';
import { updateBlogRepository } from '../repositories/updateBlogRepository';

type UpdateBlogParams = {
  id: string;
}

export const updateBlogController = (req: Request<UpdateBlogParams, null, BlogDBType>, res: Response) => {
  const { id } = req.params;

  // @ts-ignore
  const errors = validateVideo(req.body)

  if (errors.errorsMessages.length) {
    return res.status(400).json(errors)
  }

  const isBlogUpdated = updateBlogRepository(id, req.body)

  return isBlogUpdated ? res.status(204).send(): res.status(404);
}
