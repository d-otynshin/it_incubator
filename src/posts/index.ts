import { Router } from 'express'
import { getPostsController } from './controllers/getPostsController';
import { createPostController } from './controllers/createPostController';
import { deletePostController } from './controllers/deletePostController';
import { updatePostController } from './controllers/updatePostController';
import { getPostByIdController } from './controllers/getPostByIdController';
import { authMiddleware } from '../middlewares/auth';
import { postsValidators } from './middlewares/postsValidators';
import { findBlogValidator } from '../blogs/middlewares/blogValidators';

export const postsRouters = Router()

postsRouters.get('/', getPostsController)
postsRouters.post('/', authMiddleware, ...postsValidators, createPostController)
postsRouters.get('/:id', getPostByIdController)
postsRouters.put(
  '/:id',
  authMiddleware,
  findBlogValidator,
  ...postsValidators,
  updatePostController
)
postsRouters.delete('/:id', authMiddleware, deletePostController)
