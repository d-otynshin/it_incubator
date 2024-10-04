import { Request, Response } from 'express';
import { validateVideo } from '../../helpers/inputValidation';
import { updatePostRepository } from '../repositories/updatePostRepository';
import { PostDBType } from '../../db/post-db-type';

type UpdateBlogParams = {
  id: string;
}

export const updatePostController = (req: Request<UpdateBlogParams, null, PostDBType>, res: Response) => {
  const { id } = req.params;

  // @ts-ignore
  const errors = validateVideo(req.body)

  if (errors.errorsMessages.length) {
    return res.status(400).json(errors)
  }

  const isBlogUpdated = updatePostRepository(id, req.body)

  return isBlogUpdated ? res.status(204).send(): res.status(404);
}
