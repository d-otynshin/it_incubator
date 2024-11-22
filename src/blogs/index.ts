import { Router } from 'express'
import { getBlogsController } from './controllers/getBlogsController'
import { createBlogController } from './controllers/createBlogController';
import { deleteBlogController } from './controllers/deleteBlogController';
import { updateBlogController } from './controllers/updateBlogController';
import { getBlogByIdController } from './controllers/getBlogByIdController';
import { authMiddleware } from '../middlewares/auth';
import { blogValidators } from './middlewares/blogValidators'
import { errorsHandlerMiddleware } from '../middlewares/errorHandler';

export const blogsRouters = Router()

blogsRouters.get('/', getBlogsController)
blogsRouters.post('/', authMiddleware, ...blogValidators, errorsHandlerMiddleware, createBlogController)
blogsRouters.get('/:id', getBlogByIdController)
blogsRouters.get('/:id/posts', getBlogByIdController)
blogsRouters.put('/:id', authMiddleware, ...blogValidators, errorsHandlerMiddleware, updateBlogController)
blogsRouters.delete('/:id', authMiddleware, deleteBlogController)
