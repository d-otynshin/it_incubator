import { db } from '../../db/db';
import { generateRandomId } from '../../helpers';
import { TPostInput } from '../types';
import { PostDBType } from '../../db/post-db-type';
import { getBlogByIdRepository } from '../../blogs/repositories/getBlogByIdRepository';

export const createPostRepository = (body: TPostInput) => {
  const blog = getBlogByIdRepository(body.blogId)

  if (!blog) return null;

  const createdPost: PostDBType = {
    id: generateRandomId().toString(),
    blogName: blog?.name,
    ...body,
  }

  db.posts = [...db.posts, createdPost]

  return createdPost
}
