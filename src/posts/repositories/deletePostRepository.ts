import { db, setDB } from '../../db/db';

export const deletePostRepository = (id: string): boolean => {
  const { posts } = db;

  const index = posts.findIndex(post => post.id === id);

  if (index === -1) {
    return false;
  }

  posts.splice(index, 1);
  setDB({ posts });

  return true;
}
