import { db, setDB } from '../../db/db';
import { TPostInput } from '../types';

export const updatePostRepository = (id: string, body: TPostInput) => {
  const { posts } = db;
  const postIndex = posts.findIndex(post => post.id === id);

  if (postIndex === -1) {
    return false;
  }

  posts[postIndex] = { ...posts[postIndex], ...body }

  setDB({ posts });

  return true;
}
