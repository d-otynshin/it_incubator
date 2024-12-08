import { Request, Response } from 'express'
import { postsRepository } from '../posts-repository';

export const getCommentsController = async (
  req: Request,
  res: Response
) => {
  const { query, params } = req;
  const { postId } = params

  const post = await postsRepository.getById(postId)
  if (!post) return res.status(404).json({ message: "Post not found" })

  const blogs = await postsRepository.getComments(postId, query);

  return res.status(200).json(blogs)
}
