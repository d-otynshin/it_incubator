import { Response, Request } from 'express'

import { blogsRepository } from '../blogs.repository';
import { mapId } from '../../../infrastructure/helpers/mapId';
import { TPostDto, TPostView } from '../../posts/posts.entity';
import { mapPost } from '../../posts/posts-query.repository';

export const createPostByBlogIdController = async (
  req: Request<any, any, TPostDto>,
  res: Response<TPostView>
) => {
  const id = req.params.id;
  const body = req.body;

  const createdPost = await blogsRepository.createPost(id, body)

  return createdPost
    ? res.status(201).json(mapPost(mapId(createdPost)))
    : res.status(404).send()
}
