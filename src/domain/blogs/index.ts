import { Router } from 'express'
import { getBlogsController } from './controllers/getBlogsController'
import { createBlogController } from './controllers/createBlogController';
import { deleteBlogController } from './controllers/deleteBlogController';
import { updateBlogController } from './controllers/updateBlogController';
import { getBlogByIdController } from './controllers/getBlogByIdController';
import { authMiddleware, errorsHandlerMiddleware } from '../../infrastructure/middlewares';
import { blogValidators } from './middlewares/blogValidators'
import { getPostsController } from './controllers/getPostsController';
import { createPostByBlogIdController } from './controllers/createPostByBlogIdController';
import { postsValidators } from '../posts/middlewares/postsValidators';

export const blogsRouters = Router()

blogsRouters.get('/', getBlogsController)
blogsRouters.post('/',
  authMiddleware,
  ...blogValidators,
  errorsHandlerMiddleware(),
  createBlogController
)
blogsRouters.post('/:id/posts',
  authMiddleware,
  ...postsValidators,
  errorsHandlerMiddleware(),
  createPostByBlogIdController
)
blogsRouters.get('/:id', getBlogByIdController)
blogsRouters.get('/:blogId/posts', getPostsController)
blogsRouters.put('/:id', authMiddleware, ...blogValidators, errorsHandlerMiddleware(), updateBlogController)
blogsRouters.delete('/:id', authMiddleware, deleteBlogController)
