import { Router } from 'express'
import { getBlogsController } from './controllers/getBlogsController'
import { createBlogController } from './controllers/createBlogController';
import { deleteBlogController } from './controllers/deleteBlogController';
import { updateBlogController } from './controllers/updateBlogController';
import { getBlogByIdController } from './controllers/getBlogByIdController';

export const videosRouter = Router()

videosRouter.get('/', getBlogsController)
videosRouter.post('/', createBlogController)
videosRouter.get('/:id', getBlogByIdController)
videosRouter.put('/:id', updateBlogController)
videosRouter.delete('/:id', deleteBlogController)
