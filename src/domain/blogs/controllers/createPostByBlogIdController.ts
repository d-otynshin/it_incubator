import { Response, Request } from 'express'

import { blogsRepository } from '../blogs.repository';
import { mapId } from '../../../helpers/mapId';
import { TPostDb, TPostDto } from '../../posts/posts.entity';

export const createPostByBlogIdController = async (
  req: Request<any, any, TPostDto>,
  res: Response<TPostDb>
) => {
  const id = req.params.id;
  const body = req.body;

  const createdPost = await blogsRepository.createPost(id, body)

  return createdPost
    ? res.status(201).json(mapId(createdPost))
    : res.status(404).send()
}
