import { Router } from 'express'
import { getBlogsController } from './controllers/getBlogsController'
import { createBlogController } from './controllers/createBlogController';
import { deleteBlogController } from './controllers/deleteBlogController';
import { updateBlogController } from './controllers/updateBlogController';
import { getBlogByIdController } from './controllers/getBlogByIdController';

export const blogsRouters = Router()

blogsRouters.get('/', getBlogsController)
blogsRouters.post('/', createBlogController)
blogsRouters.get('/:id', getBlogByIdController)
blogsRouters.put('/:id', updateBlogController)
blogsRouters.delete('/:id', deleteBlogController)
