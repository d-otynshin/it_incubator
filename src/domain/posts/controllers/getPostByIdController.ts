import { Request, Response } from 'express';
import { postsQueryRepository } from '../posts-query.repository';

interface FindByIdRequest extends Request {
  params: { id: string };
}

export const getPostByIdController = async (
  req: FindByIdRequest,
  res: Response
) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  const post = await postsQueryRepository.getById(postId, userId);

  return post
    ? res.status(200).json(post)
    : res.status(404).json({ message: "Post not found" })
}
