import { getBlogByIdRepository } from '../blogs/repositories/getBlogByIdRepository';
import { PostDBType } from '../db/post-db-type';
import { generateRandomId } from '../helpers';
import { db, setDB } from '../db/db';
import { TPostInput } from './types';

export const postsRepository = {
  create: (body: TPostInput): PostDBType | null => {
    const blog = getBlogByIdRepository(body.blogId)

    if (!blog) return null;

    const createdPost: PostDBType = {
      id: generateRandomId().toString(),
      blogName: blog?.name,
      ...body,
    }

    db.posts = [...db.posts, createdPost]

    return createdPost
  },
  delete: (id: string): boolean => {
    const { posts } = db;

    const index = posts.findIndex(post => post.id === id);

    if (index === -1) {
      return false;
    }

    posts.splice(index, 1);
    setDB({ posts });

    return true;
  },
  getById: (id: string): PostDBType | undefined => {
    const { posts } = db;

    return posts.find(p => p.id === id);
  },
  getByBlogId: (blogId: string): PostDBType | undefined => {
    const { posts } = db;

    return posts.find(p => p.blogId === blogId);
  },
  get: () => {
    const { posts } = db

    return posts
  },
  update: (id: string, body: TPostInput) => {
    const { posts } = db;
    const postIndex = posts.findIndex(post => post.id === id);

    if (postIndex === -1) {
      return false;
    }

    posts[postIndex] = { ...posts[postIndex], ...body }

    setDB({ posts });

    return true;
  }
}
