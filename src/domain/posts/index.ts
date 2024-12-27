import { Router } from 'express'
import { getPostsController } from './controllers/getPostsController';
import { createPostController } from './controllers/createPostController';
import { deletePostController } from './controllers/deletePostController';
import { updatePostController } from './controllers/updatePostController';
import { getPostByIdController } from './controllers/getPostByIdController';
import { authMiddleware } from '../../infrastructure/middlewares';
import {
  findBlogByIdValidator,
  findByBlogIdValidator,
  findPostValidator,
  postsValidators
} from './middlewares/postsValidators';
import { errorsHandlerMiddleware } from '../../infrastructure/middlewares';
import { contentValidator } from '../comments/middlewares/validation';
import { createCommentController } from './controllers/createCommentController';
import { accessTokenGuard } from '../auth/middlewares/accessTokenGuard';
import { getCommentsController } from './controllers/getCommentsController';
import { accessTokenProvider } from '../auth/middlewares/accessTokenProvider';
import { updatePostsLikeController } from './controllers/updatePostsLikeController';

export const postsRouters = Router()

postsRouters.get(
  '/',
  accessTokenProvider,
  getPostsController
)

postsRouters.post('/',
  authMiddleware,
  ...postsValidators,
  findBlogByIdValidator,
  errorsHandlerMiddleware(),
  createPostController
)

postsRouters.get(
  '/:id',
  accessTokenProvider,
  getPostByIdController
)

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

postsRouters.get(
  '/:id/comments',
  accessTokenGuard,
  getCommentsController
)

postsRouters.post(
  '/:id/comments',
  accessTokenGuard,
  findPostValidator,
  contentValidator,
  errorsHandlerMiddleware(),
  createCommentController
)

postsRouters.put(
  '/:id/like-status',
  accessTokenGuard,
  updatePostsLikeController
)
