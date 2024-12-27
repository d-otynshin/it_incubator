import { Request, Response } from 'express'
import { blogsRepository } from '../blogs.repository';
import { mapPost } from '../../posts/posts-query.repository';

export const getPostsController = async (
  req: Request,
  res: Response
) => {
  const { blogId } = req.params
  const userId = req.user?.id

  const blog = await blogsRepository.getById(blogId)
  if (!blog) return res.status(404).json({ message: "Blog not found" })

  const paginatedPostsDb = await blogsRepository.getPosts(blogId, req.query);

  paginatedPostsDb.items = paginatedPostsDb.items.map((postDb: any) => mapPost(postDb, userId));

  return res.status(200).json(paginatedPostsDb)
}
