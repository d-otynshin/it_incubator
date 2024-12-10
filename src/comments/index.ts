import { Router } from 'express';
import { updateCommentsController } from './controllers/updateCommentsController';
import { getCommentByIdController } from './controllers/getCommentsController';
import { deleteCommentsController } from './controllers/deleteCommentsController';
import { errorsHandlerMiddleware } from '../middlewares/errorHandler';
import { contentValidator } from './middlewares/validation';
import { accessTokenGuardMiddleware } from '../auth/middlewares/accessTokenGuardMiddleware';

export const commentsRouter = Router();

commentsRouter.post('/', (_, res) => {
  return res.status(200).json({ message: 'new method' });
})

commentsRouter.get('/:id', getCommentByIdController)

commentsRouter.put(
  '/:id',
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
