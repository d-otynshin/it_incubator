import { Router } from 'express';
import { updateCommentsController } from './controllers/updateCommentsController';
import { getCommentByIdController } from './controllers/getCommentsController';
import { deleteCommentsController } from './controllers/deleteCommentsController';
import { errorsHandlerMiddleware } from '../middlewares/errorHandler';
import { authMiddleware } from '../middlewares/auth';
import { contentValidator } from './middlewares/validation';

export const commentsRouter = Router();

commentsRouter.get('/', getCommentByIdController)

commentsRouter.put(
  '/',
  authMiddleware,
  contentValidator,
  errorsHandlerMiddleware(),
  updateCommentsController
)

commentsRouter.delete(
  '/:id',
  authMiddleware,
  deleteCommentsController
)
