import { Request, Response } from 'express'
import { blogsRepository } from '../blogs.repository';

export const getPostsController = async (
  req: Request,
  res: Response
) => {
  const { query, params } = req;
  const { blogId } = params

  const blog = await blogsRepository.getById(blogId)
  if (!blog) return res.status(404).json({ message: "Blog not found" })

  const blogs = await blogsRepository.getPosts(blogId, query);

  return res.status(200).json(blogs)
}
