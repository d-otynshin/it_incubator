import { Response, Request } from 'express'

import { OutputErrorsType } from '../../input-output-types/output-errors-type'

import { TBlogInput } from '../types';
import { BlogDBType } from '../../db/blog-db-type';
import { blogsRepository } from '../blogs-repository';
import { mapId } from '../../helpers/mapId';

export const createBlogController = async (
  req: Request<any, any, TBlogInput>,
  res: Response<BlogDBType>
) => {
  const createdBlog = await blogsRepository.create(req.body)

  return res.status(201).json(mapId(createdBlog))
}
