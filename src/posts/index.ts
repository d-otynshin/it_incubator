import { Router } from 'express'
import { getPostsController } from './controllers/getPostsController';
import { createPostController } from './controllers/createPostController';
import { deletePostController } from './controllers/deletePostController';
import { updatePostController } from './controllers/updatePostController';
import { getPostByIdController } from './controllers/getPostByIdController';
import { authMiddleware } from '../middlewares/auth';

export const postsRouters = Router()

postsRouters.get('/', getPostsController)
postsRouters.post('/', authMiddleware, createPostController)
postsRouters.get('/:id', getPostByIdController)
postsRouters.put('/:id', authMiddleware, updatePostController)
postsRouters.delete('/:id', deletePostController)
