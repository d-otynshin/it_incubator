import { Response, Request } from 'express'

import type { TBlogDb, TBlogDto } from '../blogs.entity';
import { mapId } from '../../../helpers/mapId';
import { blogsRepository } from '../blogs.repository';

export const createBlogController = async (
  req: Request<any, any, TBlogDto>,
  res: Response<TBlogDb>
) => {
  const createdBlog = await blogsRepository.create(req.body)

  return res.status(201).json(mapId(createdBlog))
}
