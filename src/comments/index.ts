import { Router } from 'express';
import { updateCommentsController } from './controllers/updateCommentsController';
import { getCommentByIdController } from './controllers/getCommentsController';
import { deleteCommentsController } from './controllers/deleteCommentsController';
import { errorsHandlerMiddleware } from '../middlewares/errorHandler';
import { contentValidator } from './middlewares/validation';
import { accessTokenGuardMiddleware } from '../auth/middlewares/accessTokenGuardMiddleware';

export const commentsRouter = Router();

commentsRouter.get('/', getCommentByIdController)

commentsRouter.put(
  '/',
  accessTokenGuardMiddleware,
  contentValidator,
  errorsHandlerMiddleware(),
  updateCommentsController
)

commentsRouter.delete(
  '/:id',
  accessTokenGuardMiddleware,
  deleteCommentsController
)
