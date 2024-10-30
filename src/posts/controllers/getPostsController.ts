import { Request, Response } from 'express'
import { postsRepository } from '../postsRepository';
import { mapId } from '../../helpers/mapId';

export const getPostsController = async (
  _: Request,
  res: Response
) => {
  const posts = await postsRepository.get()

  res.status(200).json(posts.map(mapId))
}
