import { Router } from 'express';
import { createUserController } from './controllers/createUserController';
import { getUsersController } from './controllers/getUsersController';
import { deleteUsersController } from './controllers/deleteUsersController';
import { userValidators } from './validationMiddlewares';
import { errorsHandlerMiddleware } from '../middlewares/errorHandler';

export const usersRouter = Router();

usersRouter.get('/', getUsersController)
usersRouter.post('/', ...userValidators, errorsHandlerMiddleware, createUserController)
usersRouter.delete('/:id', deleteUsersController)
