import { Response, Request } from 'express'

import { blogsRepository } from '../blogs-repository';
import { mapId } from '../../../helpers/mapId';
import { TBlogDb, TBlogDto } from '../blogs.entity';

export const createBlogController = async (
  req: Request<any, any, TBlogDto>,
  res: Response<TBlogDb>
) => {
  const createdBlog = await blogsRepository.create(req.body)

  return res.status(201).json(mapId(createdBlog))
}
