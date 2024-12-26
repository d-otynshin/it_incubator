import { Request, Response } from 'express';
import { postsRepository } from '../posts-repository';
import { mapId } from '../../../infrastructure/helpers/mapId';

interface FindByIdRequest extends Request {
  params: { id: string };
}

export const getPostByIdController = async (
  req: FindByIdRequest,
  res: Response
) => {
  const { id } = req.params;

  const post = await postsRepository.getById(id)

  return post
    ? res.status(200).json(mapId(post))
    : res.status(404).json({ message: "Post not found" })
}
