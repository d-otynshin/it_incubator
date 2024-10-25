import { Router } from 'express'
import { getPostsController } from './controllers/getPostsController';
import { createPostController } from './controllers/createPostController';
import { deletePostController } from './controllers/deletePostController';
import { updatePostController } from './controllers/updatePostController';
import { getPostByIdController } from './controllers/getPostByIdController';
import { authMiddleware } from '../middlewares/auth';
import { findByBlogIdValidator, postsValidators } from './middlewares/postsValidators';
import { errorsHandlerMiddleware } from '../middlewares/errorHandler';

export const postsRouters = Router()

postsRouters.get('/', getPostsController)

postsRouters.post('/',
  authMiddleware,
  ...postsValidators,
  // findByBlogIdValidator,
  errorsHandlerMiddleware,
  createPostController
)

postsRouters.get('/:id', getPostByIdController)

postsRouters.put(
  '/:id',
  authMiddleware,
  ...postsValidators,
  findByBlogIdValidator,
  errorsHandlerMiddleware,
  updatePostController
)

postsRouters.delete('/:id', authMiddleware, deletePostController)
