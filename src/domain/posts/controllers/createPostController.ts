import { Response, Request } from 'express'

import { postsRepository } from '../posts-repository';
import { mapId } from '../../../infrastructure/helpers/mapId';
import { TPostDb, TPostDto } from '../posts.entity';

export const createPostController = async (
  req: Request<any, any, TPostDto>,
  res: Response<TPostDb>
) => {
  const createdPost = await postsRepository.create(req.body)

  return createdPost
    ? res.status(201).json(mapId(createdPost))
    : res.status(404).send()
}
