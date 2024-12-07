import { Router } from 'express';
import { createUserController } from './controllers/createUserController';
import { getUsersController } from './controllers/getUsersController';
import { deleteUsersController } from './controllers/deleteUsersController';

export const usersRouter = Router();

usersRouter.get('/', getUsersController)
usersRouter.post('/', createUserController)
usersRouter.delete('/:id', deleteUsersController)
