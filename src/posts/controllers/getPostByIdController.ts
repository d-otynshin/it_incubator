import { Request, Response } from 'express';
import { postsRepository } from '../postsRepository';

interface FindByIdRequest extends Request {
  params: { id: string };
}

export const getPostByIdController = (req: FindByIdRequest, res: Response) => {
  const { id } = req.params;

  const post = postsRepository.getById(id)

  return post
    ? res.status(200).json(post)
    : res.status(404).json({ message: "User not found" })
}
