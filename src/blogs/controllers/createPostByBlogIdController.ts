import { Response, Request } from 'express'

import { blogsRepository } from '../blogsRepository';
import { mapId } from '../../helpers/mapId';
import { TPostInput } from '../../posts/types';
import { PostDBType } from '../../db/post-db-type';

export const createPostByBlogIdController = async (
  req: Request<any, any, TPostInput>,
  res: Response<PostDBType>
) => {
  const id = req.params.id;
  const body = req.body;

  const createdPost = await blogsRepository.createPost(id, body)

  return createdPost
    ? res.status(201).json(mapId(createdPost))
    : res.status(404).send()
}
