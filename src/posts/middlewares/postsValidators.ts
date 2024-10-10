import { body } from 'express-validator';
import { postsRepository } from '../postsRepository';
import { errorsHandlerMiddleware } from '../../middlewares/errorHandler';

const contentValidator = body('content')
  .notEmpty().withMessage('required')
  .trim()
  .isString().withMessage('not a string')
  .isLength({ min: 1, max: 1000 }).withMessage('more than 1000 or 0')

const shortDescriptionValidator = body('shortDescription')
  .notEmpty().withMessage('required')
  .trim()
  .isString().withMessage('not a string')
  .isLength({ min: 1, max: 100 }).withMessage('more than 100 or 0')

const titleValidator = body('title')
  .notEmpty().withMessage('required')
  .trim()
  .isString().withMessage('not a string')
  .isLength({ min: 1, max: 30 }).withMessage('more than 30 or 0')

const blogIdValidator = body('blogId')
  .notEmpty().withMessage('required')
  .trim()
  .isString().withMessage('not a string')

const postIdValidator = body('blogId')
  .isString().withMessage('not string')
  .trim().custom((postId: string) => {
    const post = postsRepository.getById(postId)

    return Boolean(post)
  }).withMessage('no such post')

export const postsValidators = [
  titleValidator,
  shortDescriptionValidator,
  contentValidator,
  blogIdValidator,
  // postIdValidator,
  errorsHandlerMiddleware
]
