import { body } from 'express-validator';
import { postsRepository } from '../postsRepository';
import { NextFunction, Request, Response } from 'express';
import { blogsRepository } from '../../blogs/blogsRepository';

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

export const findBlogByIdValidator = body('blogId')
.trim()
.custom(async (blogId: string) => {
  if (!blogId) return true

  const blog = await blogsRepository.getById(blogId)

  return Boolean(blog)
}).withMessage('no such post')

export const findByBlogIdValidator = body('blogId')
  .trim()
  .custom((blogId: string) => {
    if (!blogId) return true

    const post = postsRepository.getByBlogId(blogId)

    return Boolean(post)
  }).withMessage('no such post')

export const findPostValidator = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const post = postsRepository.getById(req.params.id);

  if (!post) {
    res.status(404).json({})

    return
  }

  next()
}

export const postsValidators = [
  titleValidator,
  shortDescriptionValidator,
  contentValidator,
  blogIdValidator,
]
