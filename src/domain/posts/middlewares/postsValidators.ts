import { body } from 'express-validator';
import { postsRepository } from '../posts-repository';
import { NextFunction, Request, Response } from 'express';
import { blogsRepository } from '../../blogs/blogs.repository';

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

  return Boolean(blog) ? true : Promise.reject()
}).withMessage('no such post')

export const findByBlogIdValidator = body('blogId')
  .trim()
  .custom(async (blogId: string) => {
    if (!blogId) return true

    const post = await postsRepository.getByBlogId(blogId)

    return Boolean(post) ? true : Promise.reject()
  }).withMessage('no such post')

export const findPostValidator = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const post = await postsRepository.getById(req.params.id);

  if (!post) {
    res.status(404).json({})

    return
  }

  next()
}

export const likeStatusValidator = body('likeStatus')
.isString().withMessage('not a string')
.isIn(['Like', 'Dislike', 'None']).withMessage('wrong value')
.trim().isLength({ min: 1 }).withMessage('required')

export const postsValidators = [
  titleValidator,
  shortDescriptionValidator,
  contentValidator,
  blogIdValidator,
]
