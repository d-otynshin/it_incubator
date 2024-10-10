import { Router } from 'express'
import { getBlogsController } from './controllers/getBlogsController'
import { createBlogController } from './controllers/createBlogController';
import { deleteBlogController } from './controllers/deleteBlogController';
import { updateBlogController } from './controllers/updateBlogController';
import { getBlogByIdController } from './controllers/getBlogByIdController';
import { authMiddleware } from '../middlewares/auth';
import { blogValidators } from './middlewares/blogValidators'

export const blogsRouters = Router()

blogsRouters.get('/', getBlogsController)
blogsRouters.post('/', ...blogValidators, authMiddleware, createBlogController)
blogsRouters.get('/:id', getBlogByIdController)
blogsRouters.put('/:id', ...blogValidators, authMiddleware, updateBlogController)
blogsRouters.delete('/:id', authMiddleware, deleteBlogController)
