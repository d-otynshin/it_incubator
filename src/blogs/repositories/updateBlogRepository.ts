import { db, setDB } from '../../db/db';
import { TBlogInput } from '../types';

export const updateBlogRepository = (id: string, body: TBlogInput) => {
  const { blogs } = db;
  const blogIndex = blogs.findIndex(blog => blog.id === id);

  if (blogIndex === -1) {
    return false;
  }

  blogs[blogIndex] = { ...blogs[blogIndex], ...body }

  setDB({ blogs });

  return true;
}
