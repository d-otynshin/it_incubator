import { body } from 'express-validator'

export const contentValidator = body('content')
.isString().withMessage('not a string')
.trim().isLength({ min: 20, max: 300 }).withMessage('more than 300 or less than 20')
