import { Response, Request } from 'express'

import { OutputErrorsType } from '../../input-output-types/output-errors-type'

import { TBlogInput } from '../types';
import { BlogDBType } from '../../db/blog-db-type';
import { blogsRepository } from '../blogsRepository';

export const createBlogController = async (
  req: Request<any, any, TBlogInput>,
  res: Response<BlogDBType | OutputErrorsType>
) => {
  const createdBlog = await blogsRepository.create(req.body)

  return res.status(201).json(createdBlog)
}
