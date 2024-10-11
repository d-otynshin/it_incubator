import { body } from 'express-validator'
import { errorsHandlerMiddleware } from '../../middlewares/errorHandler';
import { Request, Response, NextFunction } from 'express';
import { getBlogByIdRepository } from '../repositories/getBlogByIdRepository';

const nameValidator = body('name')
  .isString().withMessage('not a string')
  .trim().isLength({ min: 1, max: 15 }).withMessage('more than 15 or 0')

const descriptionValidator = body('description')
  .isString().withMessage('not a string')
  .trim().isLength({ min: 1, max: 500 }).withMessage('more than 500 or 0')

const websiteUrlValidator = body('websiteUrl')
  .isString().withMessage('not a string')
  .trim().isURL().withMessage('not url')
  .isLength({ min: 1, max: 100 }).withMessage('more than 100 or 0')

export const findBlogValidator = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const post = getBlogByIdRepository(req.params.id);

  if (!post) {
    res.status(404).json({})

    return
  }

  next()
}

export const blogValidators = [
  nameValidator,
  descriptionValidator,
  websiteUrlValidator,
  errorsHandlerMiddleware
]
