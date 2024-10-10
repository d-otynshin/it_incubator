import { Response, Request } from 'express'

import { OutputErrorsType } from '../../input-output-types/output-errors-type'
import { validateVideo } from '../../helpers/inputValidation';

import { TPostInput } from '../types';
import { PostDBType } from '../../db/post-db-type';
import { postsRepository } from '../postsRepository';

export const createPostController = (req: Request<any, any, TPostInput>, res: Response<PostDBType | OutputErrorsType>) => {
  //@ts-ignore
  const errors = validateVideo(req.body)

  if (errors.errorsMessages.length) {
    return res.status(400).json(errors)
  }

  const createdPost = postsRepository.create(req.body)

  return createdPost ? res.status(201).json(createdPost) : res.status(404)
}
