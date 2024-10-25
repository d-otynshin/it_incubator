import { body } from 'express-validator';
import { postsRepository } from '../postsRepository';

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
  .trim()
  .isString().withMessage('not string')

export const findByBlogIdValidator = body('blogId')
  .trim()
  .custom((blogId: string) => {
    if (!blogId) return true

    const post = postsRepository.getByBlogId(blogId)

    return Boolean(post)
  }).withMessage('no such post')

export const postsValidators = [
  titleValidator,
  shortDescriptionValidator,
  contentValidator,
  blogIdValidator,
]
