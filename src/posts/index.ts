import { Router } from 'express'
import { getPostsController } from './controllers/getPostsController';
import { createPostController } from './controllers/createPostController';
import { deletePostController } from './controllers/deletePostController';
import { updatePostController } from './controllers/updatePostController';
import { getPostByIdController } from './controllers/getPostByIdController';
import { authMiddleware } from '../middlewares/auth';
import {
  findBlogByIdValidator,
  findByBlogIdValidator,
  findPostValidator,
  postsValidators
} from './middlewares/postsValidators';
import { errorsHandlerMiddleware } from '../middlewares/errorHandler';
import { contentValidator } from '../comments/middlewares/validation';
import { createCommentController } from './controllers/createCommentController';
import { getCommentByIdController } from '../comments/controllers/getCommentsController';

export const postsRouters = Router()

postsRouters.get('/', getPostsController)

postsRouters.post('/',
  authMiddleware,
  ...postsValidators,
  findBlogByIdValidator,
  errorsHandlerMiddleware(),
  createPostController
)

postsRouters.get('/:id', getPostByIdController)

postsRouters.put(
  '/:id',
  authMiddleware,
  findPostValidator,
  ...postsValidators,
  findByBlogIdValidator,
  errorsHandlerMiddleware(),
  updatePostController
)

postsRouters.delete('/:id', authMiddleware, deletePostController)

postsRouters.post(
  '/:id/comments',
  authMiddleware,
  findPostValidator,
  contentValidator,
  errorsHandlerMiddleware(),
  createCommentController
)

postsRouters.get(
  '/:postId/comments',
  getCommentByIdController
)

postsRouters.post(
  '/:postId/comments',
  authMiddleware,
  findPostValidator,
  contentValidator,
  errorsHandlerMiddleware(),
  createCommentController
)
