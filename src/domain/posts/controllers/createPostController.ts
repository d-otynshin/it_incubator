import { Response, Request } from 'express'

import { postsRepository } from '../posts-repository';
import { mapId } from '../../../infrastructure/helpers/mapId';
import { TPostDb, TPostDto, TPostView } from '../posts.entity';
import { mapPost } from '../posts-query.repository';

export const createPostController = async (
  req: Request<any, any, TPostDto>,
  res: Response<TPostView>
) => {
  const createdPost = await postsRepository.create(req.body)

  return createdPost
    ? res.status(201).json(mapPost(mapId(createdPost)))
    : res.status(404).send()
}
