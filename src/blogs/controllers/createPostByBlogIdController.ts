import { Response, Request } from 'express'

import { OutputErrorsType } from '../../input-output-types/output-errors-type'

import { TBlogInput } from '../types';
import { BlogDBType } from '../../db/blog-db-type';
import { blogsRepository } from '../blogsRepository';
import { mapId } from '../../helpers/mapId';

export const createPostByBlogIdController = async (
  req: Request<any, any, TBlogInput>,
  res: Response<BlogDBType>
) => {
  const id = req.params.id;
  const body = req.body;

  const createdBlog = await blogsRepository.createPost(id, body)

  return res.status(201).json(mapId(createdBlog))
}
