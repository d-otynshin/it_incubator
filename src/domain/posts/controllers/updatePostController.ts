import { Request, Response } from 'express';
import { PostDBType } from '../../../db/post-db-type';
import { postsRepository } from '../posts-repository';

type UpdateBlogParams = {
  id: string;
}

export const updatePostController = async (
  req: Request<UpdateBlogParams, null, PostDBType>,
  res: Response
) => {
  const { id } = req.params;
  const isBlogUpdated = await postsRepository.update(id, req.body)

  return isBlogUpdated
    ? res.status(204).send()
    : res.status(404).send();
}
