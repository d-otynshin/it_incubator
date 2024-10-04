import { Response, Request } from 'express'

import { OutputErrorsType } from '../../input-output-types/output-errors-type'
import { validateVideo } from '../../helpers/inputValidation';

import { createBlogRepository } from '../repositories/createBlogRepository';
import { TBlogInput } from '../types';
import { BlogDBType } from '../../db/blog-db-type';

export const createBlogController = (req: Request<any, any, TBlogInput>, res: Response<BlogDBType | OutputErrorsType>) => {
  //@ts-ignore
  const errors = validateVideo(req.body)

  if (errors.errorsMessages.length) {
    return res.status(400).json(errors)
  }

  const createdBlog = createBlogRepository(req.body)

  return res.status(201).json(createdBlog)
}
