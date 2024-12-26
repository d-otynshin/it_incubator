import { body } from 'express-validator'

export const contentValidator = body('content')
  .isString().withMessage('not a string')
  .trim().isLength({ min: 20, max: 300 }).withMessage('more than 300 or less than 20')

export const likeStatusValidator = body('likeStatus')
.isString().withMessage('not a string')
.isIn(['Like', 'Dislike', 'None']).withMessage('wrong value')
.trim().isLength({ min: 1 }).withMessage('required')
