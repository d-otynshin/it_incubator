import { Request, Response } from 'express'
import { blogsRepository } from '../blogsRepository';
import { mapId } from '../../helpers/mapId';

export const getBlogsController = async (_: Request, res: Response) => {
  const blogs = await blogsRepository.get();

  res.status(200).json(blogs.map(mapId))
}
