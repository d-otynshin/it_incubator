import { Router } from 'express'
import { getPostsController } from './controllers/getPostsController';
import { createPostController } from './controllers/createPostController';
import { deletePostController } from './controllers/deletePostController';
import { updatePostController } from './controllers/updatePostController';
import { getPostByIdController } from './controllers/getPostByIdController';

export const postsRouters = Router()

postsRouters.get('/', getPostsController)
postsRouters.post('/', createPostController)
postsRouters.get('/:id', getPostByIdController)
postsRouters.put('/:id', updatePostController)
postsRouters.delete('/:id', deletePostController)
