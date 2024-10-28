import { Response, Request } from 'express'

import { OutputErrorsType } from '../../input-output-types/output-errors-type'

import { TPostInput } from '../types';
import { PostDBType } from '../../db/post-db-type';
import { postsRepository } from '../postsRepository';

export const createPostController = async (
  req: Request<any, any, TPostInput>,
  res: Response<PostDBType | OutputErrorsType>
) => {
  const createdPost = await postsRepository.create(req.body)

  return createdPost ? res.status(201).json(createdPost) : res.status(404).send()
}
