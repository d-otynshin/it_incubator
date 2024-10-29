import { body } from 'express-validator'
import { Request, Response, NextFunction } from 'express';
import { blogsRepository } from '../blogsRepository';

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

export const findBlogValidator = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const blog = await blogsRepository.getById(req.params.id);

  if (!blog) {
    res.status(404).json({})

    return
  }

  next()
}

export const blogValidators = [
  nameValidator,
  descriptionValidator,
  websiteUrlValidator,
]
