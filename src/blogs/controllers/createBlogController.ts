import { Response, Request } from 'express'

import { OutputErrorsType } from '../../input-output-types/output-errors-type'

import { createBlogRepository } from '../repositories/createBlogRepository';
import { TBlogInput } from '../types';
import { BlogDBType } from '../../db/blog-db-type';

export const createBlogController = (
  req: Request<any, any, TBlogInput>,
  res: Response<BlogDBType | OutputErrorsType>
) => {
  const createdBlog = createBlogRepository(req.body)

  return res.status(201).json(createdBlog)
}
