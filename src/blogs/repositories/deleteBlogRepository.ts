import { db, setDB } from '../../db/db';

export const deleteBlogRepository = (id: string): boolean => {
  const { blogs } = db;

  const index = blogs.findIndex(blog => blog.id === id);

  if (index === -1) {
    return false;
  }

  blogs.splice(index, 1);
  setDB({ blogs });

  return true;
}
