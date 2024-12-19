import { body } from 'express-validator'

export const passwordValidator = body('password')
.isString().withMessage('not a string')
.trim().isLength({ min: 6, max: 20 }).withMessage('more than 20 or less than 6')

export const loginValidator = body('login')
.isString().withMessage('not a string')
.trim().isLength({ min: 3, max: 10 }).withMessage('more than 10 or less than 3')

export const emailValidator = body('email')
.isString().withMessage('not a string')
.isEmail().withMessage('not email')
